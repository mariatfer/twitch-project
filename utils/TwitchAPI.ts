import FetchError from '@/utils/FetchError'
import { tags } from '@/mocks/tags'
import type { Stream, TokenResponse, UserData, ApiResponse, Category, Tag, User } from '@/types/types'

export class TwitchAPI {
  private clientId: string
  private clientSecret: string
  private redirectUri: string

  constructor() {
    this.clientId = import.meta.env.VITE_TWITCH_CLIENT_ID
    this.clientSecret = import.meta.env.VITE_TWITCH_CLIENT_SECRET
    this.redirectUri = import.meta.env.VITE_TWITCH_REDIRECT_URI
  }

  public async getAuthorizationUrl(): Promise<string> {
    const scope = 'user:read:email'
    const state = this.generateState()
    const url = new URL('https://id.twitch.tv/oauth2/authorize')
    url.searchParams.append('client_id', this.clientId)
    url.searchParams.append('redirect_uri', this.redirectUri)
    url.searchParams.append('response_type', 'code')
    url.searchParams.append('scope', scope)
    url.searchParams.append('state', state)

    return url.toString()
  }

  public async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const url = 'https://id.twitch.tv/oauth2/token'
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: this.redirectUri,
    })

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      const errorData = await response.json()
      throw new FetchError('Error obtaining token:' + errorData.message)
    }

    const tokenData: TokenResponse = await response.json()
    return tokenData
  }

  public async getUserData(accessToken: string): Promise<UserData> {
    const url = 'https://api.twitch.tv/helix/users'

    const options = {
      method: 'GET',
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      throw new FetchError('Error obtaining user data')
    }

    return await response.json()
  }

  public async getLiveStreams(
    accessToken: string,
    limit: number = 12,
  ): Promise<ApiResponse<Stream>> {
    const url = `https://api.twitch.tv/helix/streams?first=${limit}&language=es`

    const options = {
      method: 'GET',
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      const errorData = await response.json()
      throw new FetchError('Error obtaining live streams: ' + errorData.message)
    }

    const data: ApiResponse<Stream> = await response.json()

    const streamsWithProfileImages = await Promise.all(
      data.data.map(async (stream) => {
        const userUrl = `https://api.twitch.tv/helix/users?id=${stream.user_id}`
        const userResponse = await fetch(userUrl, {
          method: 'GET',
          headers: {
            'Client-ID': this.clientId,
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!userResponse.ok) {
          const userError = await userResponse.json()
          throw new FetchError('Error obtaining user data: ' + userError.message)
        }

        const userData = await userResponse.json()
        const profileImageUrl = userData.data[0].profile_image_url

        return {
          ...stream,
          profile_image_url: profileImageUrl,
        }
      }),
    )

    return {
      ...data,
      data: streamsWithProfileImages,
    }
  }
  
  public async getCategoriesWithViewersAndTags(
    accessToken: string,
    limit: number = 7,
  ): Promise<Category[]> {
    const url = `https://api.twitch.tv/helix/games/top?first=${limit}`;
    const options = {
      method: 'GET',
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new FetchError('Error fetching categories: ' + errorData.message);
    }
  
    const data: ApiResponse<Category> = await response.json();

    const categoriesWithDetails = await Promise.all(
      data.data.map(async (category) => {
        const viewerCount = await this.getViewerCountForCategory(category.id, accessToken);
        const randomTags = this.getRandomTags();
  
        return {
          ...category,
          box_art_url: category.box_art_url
            .replace('{width}', '285')
            .replace('{height}', '380'),
          viewer_count: viewerCount,
          tags: randomTags,
        };
      }),
    );
  
    return categoriesWithDetails;
  }
  
  private async getViewerCountForCategory(categoryId: string, accessToken: string): Promise<number> {
    const url = `https://api.twitch.tv/helix/streams?game_id=${categoryId}`;
    const options = {
      method: 'GET',
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new FetchError('Error fetching streams for category:' + errorData.message);
    }
  
    const data = await response.json();
  
    return data.data.reduce((total: number, stream: Stream) => total + stream.viewer_count, 0);
  }

  private getRandomTags(): Tag[] {

    const shuffledTags = [...tags].sort(() => 0.5 - Math.random());
    return shuffledTags.slice(0, 2);
  }

  private generateState(): string {
    return Math.random().toString(36).substring(7)
  }

  public async getUserInfo(accessToken: string, userId: string): Promise<User> {
    const url = `https://api.twitch.tv/helix/users?id=${userId}`;
    const options = {
      method: 'GET',
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new FetchError('Error fetching user info:' + errorData.message);
    }

    const data: ApiResponse<User> = await response.json();
    return data.data[0];
  }

}
