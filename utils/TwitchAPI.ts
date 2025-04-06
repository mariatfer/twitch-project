import FetchError from '@/utils/FetchError'
import type { Stream, TokenResponse, UserData, ApiResponse } from '@/types/types'

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
      console.error('Error obtaining token:', errorData)
      throw new FetchError('Error obtaining token')
    }

    const tokenData: TokenResponse = await response.json()
    console.log('Token obtenido:', tokenData)
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
      console.error('Error obtaining live streams:', errorData)
      throw new FetchError('Error obtaining live streams')
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
          console.error('Error obtaining user data:', userError)
          throw new FetchError('Error obtaining user data')
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
  
    
  private generateState(): string {
    return Math.random().toString(36).substring(7)
  }
}
