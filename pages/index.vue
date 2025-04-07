<script setup lang="ts">
import { TwitchAPI } from '@/utils/TwitchAPI'
import { categoryLabels } from '@/mocks/categoryLabels'
import { hideElementsInSecondRow } from '@/utils/domUtils'

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

const buttonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '13.75rem',
  height: '2.8125rem',
  fontSize: '1.125rem',
  fontWeight: 600,
}

onMounted(() => {
  if (window.location.search.includes('code=')) {
    handleTwitchCallback()
  }
  nextTick(() => {
    hideElementsInSecondRow('.main__content--align', 'category-button')
  })

  window.addEventListener('resize', () =>
    hideElementsInSecondRow('.main__content--align', 'category-button'),
  )
})

onUnmounted(() => {
  window.removeEventListener('resize', () =>
    hideElementsInSecondRow('.main__content--align', 'category-button'),
  )
})
</script>

<template>
  <div class="main__content">
    <LiveRecommendation />
    <LiveRecommendation />
    <TopCategories />
    <section class="main__content--align">
      <TheButton
        v-for="button in categoryLabels"
        :key="button.id"
        :style="buttonStyle"
        class="category-button"
      >
        {{ button.text }}
        <component :is="button.icon" class="icon" />
      </TheButton>
    </section>
    <LiveRecommendation />
    <LiveRecommendation />
  </div>
</template>

<style lang="scss" scoped>
.main__content {
  @include flex(column, flex-start, center, wrap, 1.25rem);
  width: 100%;
  &--align {
    @include flex(row, space-between, center, wrap, 1.25rem);
    padding: 0 0.625rem;
    .category-button {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: auto;
    }
    .icon {
      position: relative;
    }
    @media screen and (max-width: 768px) {
      justify-content: center;
    }
  }
}
</style>
