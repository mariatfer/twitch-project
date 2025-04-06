<script setup lang="ts">
import { TwitchAPI } from '@/utils/TwitchAPI'
import getToken from '@/utils/TwitchAuth'
import TopCategories from '@/components/TopCategories.vue'

const twitchApi = new TwitchAPI()

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

onMounted(() => {
  if (window.location.search.includes('code=')) {
    handleTwitchCallback()
  }
})

async function fetchLiveStreams() {
  try {
    const accessToken = await getToken()
    const streams = await twitchApi.getLiveStreams(accessToken.access_token, 12)
    console.log('Streamings:', streams)
  } catch (error) {
    console.error('Error obtaining live streams:', error)
  }
}

fetchLiveStreams()
</script>

<template>
  <div class="container">
    <TheHeader />
    <main class="container__main">
      <TheAside />
      <div class="main__content">
        <LiveRecommendation />
        <TopCategories />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;
.container {
  @include flex(column);

  &__main {
    @include flex(row, flex-start, flex-start, nowrap, 0.625rem);
    width: 100%;
  }
}
.main__content {
  @include flex(column, flex-start, center, wrap, 1.25rem);
  width: 100%;     
}
</style>