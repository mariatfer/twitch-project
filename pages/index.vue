<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchAPI } from '@/utils/TwitchAPI'
import getToken from '@/utils/TwitchAuth'

const twitchApi = new TwitchAPI()
const authUrl = ref<string>('')

onMounted(async () => {
  try {
    authUrl.value = await twitchApi.getAuthorizationUrl()
  } catch (error) {
    console.error('Error obtaining Twitch authorization URL:', error)
  }
})

async function handleTwitchCallback() {
  const queryParams = new URLSearchParams(window.location.search)
  const code = queryParams.get('code')

  if (code) {
    try {
      const tokenResponse = await twitchApi.exchangeCodeForToken(code)
      console.log('Access Token:', tokenResponse)

      const users = await twitchApi.getUserData(tokenResponse.access_token)
      console.log('Users:', users)
    } catch (error) {
      console.error('Error handling Twitch callback:', error)
    }
  } else {
    console.error('The authorization code was not found in the URL.')
  }
}

async function fetchLiveStreams() {
  try {
    const accessToken = await getToken()
    const streams = await twitchApi.getLiveStreams(accessToken.access_token, 12)
    console.log('Streamings:', streams)
  } catch (error) {
    console.error('Error obtaining live streams:', error)
  }
}

onMounted(() => {
  if (window.location.search.includes('code=')) {
    handleTwitchCallback()
    fetchLiveStreams()
  }
})
</script>

<template>
  <div>
    <TheHeader />
    <h2>home</h2>
  </div>
</template>
