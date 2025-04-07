<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { TwitchAPI } from '@/utils/TwitchAPI'
import getToken from '@/utils/TwitchAuth'
import type { ApiResponse, Stream } from '@/types/types'

definePageMeta({
  layout: false,
})

const route = useRoute()
const twitchApi = new TwitchAPI()
const streamData = ref<Stream>()
const accessToken = ref<string | null>(null)

onMounted(async () => {
  const userName = route.params.stream as string
  try {
    const tokenResponse = await getToken()
    accessToken.value = tokenResponse.access_token

    const streams: ApiResponse<Stream> = await twitchApi.getLiveStreams(
      tokenResponse.access_token,
    )
    streamData.value = streams.data.find((stream) => stream.user_name === userName)
  } catch (error) {
    console.error('Error fetching stream data or token:', error)
  }
})
</script>

<template>
  <NuxtLayout name="stream-layout">
    <div class="main__content">
      <article class="streamer">
        <iframe
          v-if="streamData"
          :src="`https://player.twitch.tv/?channel=${streamData?.user_name}&parent=localhost`"
          height="715"
          width="100%"
          allowfullscreen
          frameborder="0"
          class="streamer__video"
        />
        <StreamData v-if="streamData" v-bind="streamData" />
      </article>
      <TheChat v-if="streamData" v-bind="streamData" />
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.main__content {
  @include flex(row, space-between, flex-start, nowrap, 0, 1);
  width: 100%;
  margin-bottom: 5em;
  .streamer {
    @include flex(column, flex-start, flex-start, nowrap, 1.25rem);
    width: 100%;
    &__video {
      @media screen and (max-width: 1600px) {
        height: 31.25rem;
      }
    }
  }
}
</style>
