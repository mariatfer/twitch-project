<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Stream, ApiResponse } from '@/types/types'
import { TwitchAPI } from '@/utils/TwitchAPI'
import getToken from '@/utils/TwitchAuth'

const twitchApi = new TwitchAPI()
const streams = ref<Stream[]>([])
const isExpanded = ref(false)

async function fetchLiveStreams() {
  try {
    const accessToken = await getToken()
    const response: ApiResponse<Stream> = await twitchApi.getLiveStreams(
      accessToken.access_token,
      8,
    )
    streams.value = response.data.map((stream) => ({
      ...stream,
      thumbnail_url: stream.thumbnail_url
        .replace('{width}', '686')
        .replace('{height}', '386'),
    }))
  } catch (error) {
    throw new FetchError('Error fetching live streams: ' + error)
  }
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  fetchLiveStreams()
})
</script>

<template>
  <article class="live-recommendation">
    <h2 class="live-recommendation__title">
      <span class="live-recommendation__title--blue">Live channels</span>&nbsp;we think
      you'll like
    </h2>
    <div
      class="live-recommendation__content"
      :class="{ 'live-recommendation__content--expanded': isExpanded }"
    >
      <StreamCard
        v-for="stream in streams"
        :id="stream.id"
        :key="stream.id"
        :user_id="stream.user_id"
        :user_name="stream.user_name"
        :game_id="stream.game_id"
        :game_name="stream.game_name"
        :title="stream.title"
        :viewer_count="stream.viewer_count"
        :thumbnail_url="stream.thumbnail_url"
        :profile_image_url="stream.profile_image_url"
        :tag_ids="stream.tag_ids || []"
        :tags="stream.tags || []"
        :started_at="stream.started_at"
        :language="stream.language"
      />
    </div>
    <ShowMore :is-expanded="isExpanded" @toggle-expand="toggleExpand" />
  </article>
</template>

<style lang="scss" scoped>

.live-recommendation {
  @include flex(column, flex-start, flex-start, nowrap, 0.625rem);
  width: 100%;
  &__title {
    color: var(--c-semilightgrey);
    &--blue {
      color: var(--c-blue);
    }
  }
  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20.3125rem, 1fr));
    gap: 2.3125rem;
    width: 100%;
    height: 19.875rem;
    color: var(--c-semilightgrey);
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    @media screen and (max-width: 62.5rem) {
      grid-template-columns: repeat(auto-fill, minmax(20.3125rem, 23.875rem));
    }
    &--expanded {
      height: auto;
    }
  }
  @media screen and (min-width: 120rem) {
    max-width: 95.5rem;
  }
}
</style>
