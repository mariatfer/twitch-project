<script setup lang="ts">
import { onMounted } from 'vue'
import { TwitchAPI } from '@/utils/TwitchAPI'

const twitchApi = new TwitchAPI()

async function handleTwitchCallback() {
  const queryParams = new URLSearchParams(window.location.search)
  const code = queryParams.get('code')

  if (code) {
    try {
      const tokenResponse = await twitchApi.exchangeCodeForToken(code)
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
</script>

<template>
  <div class="container">
    <header class="container__header">
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </header>
    <main class="container__main">
      <TheAside />
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @include flex(column);
  &__header {
    height: 3.125rem;
    background-color: var(--c-midgrey);
    padding: 0 1.25rem;
    @include flex(row, space-between, center);
  }
  &__main {
    @include flex(row, flex-start, flex-start, nowrap);
    width: 100%;
    padding: 1.25rem;
    @media screen and (max-width: 48rem) {
      @include flex(column, flex-start, center, nowrap, .5rem);
    }
  }
}
</style>
