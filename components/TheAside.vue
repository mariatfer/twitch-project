<script setup lang="ts">
import CollapseIcon from '@/components/icons/CollapseIcon.vue'
import { ref, onMounted } from 'vue'
import type { Stream, ApiResponse } from '@/types/types'
import { TwitchAPI } from '@/utils/TwitchAPI'
import getToken from '@/utils/TwitchAuth'

const twitchApi = new TwitchAPI()
const recommendedChannels = ref<Stream[]>([])

async function fetchRecommendedChannels() {
  try {
    const accessToken = await getToken()
    const response: ApiResponse<Stream> = await twitchApi.getLiveStreams(
      accessToken.access_token,
      7,
    )
    recommendedChannels.value = response.data
  } catch (error) {
    console.error('Error fetching recommended channels:', error)
  }
}

const isCollapsed = ref(false)
const isMovil = ref(false)

function toggleAside() {
  isCollapsed.value = !isCollapsed.value
}

function handleResize() {
  if (window.innerWidth <= 768) {
    isMovil.value = true
  } else {
    isMovil.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  fetchRecommendedChannels()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const iconButton = {
  background: 'transparent',
  padding: 0,
}
</script>

<template>
  <aside :class="['aside', { 'aside--collapsed': isCollapsed && !isMovil}]">
    <div class="aside__header">
      <h2 v-if="!isCollapsed" class="aside__header--title">Recommended channels</h2>
      <TheButton :style="iconButton" class="aside__header--button" @click="toggleAside"
        ><CollapseIcon
      /></TheButton>
    </div>
    <div class="aside__content">
      <TheChannel
        v-for="channel in recommendedChannels"
        :key="channel.id"
        v-bind="channel"
      />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  @include flex(column, flex-start, center, wrap);
  width: 16.25rem;
  min-width: 16.25rem;
  padding-right: 0.625rem;
  &__header {
    @include flex(row, space-between, center, wrap);
    width: 100%;
    padding: 0.625rem 0.3125rem;
    &--title {
      @include flex(row, center, center, wrap);
      text-transform: uppercase;
      font-weight: 500;
      font-size: 0.8125rem;
    }
    &--button {
      &:hover {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
      }
    }
  }
  @media screen and (max-width: 48rem) {
    @include flex(row, flex-start, center, nowrap);
    width: 100%;
    max-height: 3.125rem;
    overflow: hidden;
    padding: 0;

    &__header {
      display: none;
    }

    &__content {
      @include flex(row, center, center, nowrap, 0.3125rem);
      width: 100%;
    }
  }
}
.aside--collapsed {
  width: 3.125rem;
  min-width: 3.125rem;

  .aside__header {
    @include flex(row, flex-end, center, wrap);
    &--title {
      display: none;
    }
    &--button {
      transform: rotate(180deg);
    }
    @media screen and (max-width: 48rem) {
      display: none;
    }
  }

  &__content {
    align-items: center;
  }
}
</style>
