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
      6,
    )
    recommendedChannels.value = response.data
  } catch (error) {
    console.error('Error fetching recommended channels:', error)
  }
}

const isCollapsed = ref(false)

function toggleAside() {
  isCollapsed.value = !isCollapsed.value
}

onMounted(() => {
  fetchRecommendedChannels()
})

const iconButton = {
  background: 'transparent',
  padding: 0,
}
</script>

<template>
  <aside :class="['aside', { 'aside--collapsed': isCollapsed }]">
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
  @include flex(column, flex-start);
  width: 16.25rem;
  min-width: 16.25rem;
  padding-right: 0.625rem;
  &__header {
    @include flex(row, space-between);
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
      @include flex(row, flex-start, center, wrap, .3125rem);
      width: 100%;
    }
  }
}
.aside--collapsed {
  width: 3.125rem;
  min-width: 3.125rem;

  &__header--title {
    display: none;
  }

  &__content {
    align-items: center;
  }

  .aside__header {
    justify-content: center;
    &--button {
      transform: rotate(180deg);
    }
  }
  @media screen and (max-width: 48rem) {
    .aside__header {
      display: none;
    }
  }
}
</style>
