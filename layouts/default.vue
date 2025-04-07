<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { TwitchAPI } from '@/utils/TwitchAPI';

const twitchApi = new TwitchAPI();

async function handleTwitchCallback() {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  const state = queryParams.get('state');
  const authStore = useAuthStore();

  if (code) {
    try {
      const tokenResponse = await twitchApi.exchangeCodeForToken(code);
      const userData = await twitchApi.getUserData(tokenResponse.access_token);

      authStore.setAuth(tokenResponse.access_token, userData.data[0].login);

      if (state) {
        window.location.href = decodeURIComponent(state);
      }
    } catch (error) {
      console.error('Error handling Twitch callback:', error);
    }
  } else {
    console.error('The authorization code was not found in the URL.');
  }
}

onMounted(() => {
  if (window.location.search.includes('code=')) {
    handleTwitchCallback();
  }
});
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
    background-color: #18181b;
    padding: 0 1.25rem;
    @include flex(row, space-between, center);
  }
  &__main {
    @include flex(row, flex-start, flex-start, nowrap, 0.625rem);
    width: 100%;
  }
}
</style>
