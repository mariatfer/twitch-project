import type { TokenResponse } from '@/types/types'
import FetchError from '@/utils/FetchError'

export default async function getToken(): Promise<TokenResponse> {
  const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID
  const clientSecret = import.meta.env.VITE_TWITCH_CLIENT_SECRET

  const authUrl = 'https://id.twitch.tv/oauth2/token'

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('grant_type', 'client_credentials')

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    }
    const response = await fetch(authUrl, options)

    if (!response.ok) {
      throw new FetchError(`Error ${response.status}: ${await response.text()}`)
    }

    const data = await response.json()
    console.log('Token de cliente obtenido:', data.accessToken)
    return data
  } catch (error) {
    throw new FetchError('Failed to fetch Twitch token:'+ error)
  }
}
