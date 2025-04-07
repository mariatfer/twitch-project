<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { TwitchAPI } from '@/utils/TwitchAPI'
import getToken from '@/utils/TwitchAuth'
import type { ApiResponse, Stream } from '@/types/types'
import CollapseIcon from '@/components/icons/CollapseIcon.vue'

const route = useRoute()
const twitchApi = new TwitchAPI()
const streamData = ref<Stream>()
const accessToken = ref<string | null>(null)
const isCollapsed = ref(false)

function toggleAside() {
  isCollapsed.value = !isCollapsed.value
}

function handleResize() {
  if (window.innerWidth <= 980) {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
  }
}

onMounted(async () => {
  const userName = route.params.stream as string
  try {
    const tokenResponse = await getToken()
    accessToken.value = tokenResponse.access_token

    const streams: ApiResponse<Stream> = await twitchApi.getLiveStreams(
      tokenResponse.access_token,
    )
    streamData.value =
      streams.data.find((stream) => stream.user_name === userName)
  } catch (error) {
    console.error('Error fetching stream data or token:', error)
  }
  handleResize()
  window.addEventListener('resize', handleResize)
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
  <div class="main__content">
    <article class="streamer">
      <iframe
        v-if="streamData"
        :src="`https://player.twitch.tv/?channel=${streamData?.user_name}&parent=localhost`"
        height="826"
        width="100%"
        allowfullscreen
        frameborder="0"
        class="streamer__video"
      />
      <StreamData v-if="streamData" v-bind="streamData" />
    </article>
    <aside :class="['chat', { 'chat--collapsed': isCollapsed }]">
      <TheButton :style="iconButton" class="chat__button" @click="toggleAside"
        ><CollapseIcon
      /></TheButton>
      <iframe
        v-if="streamData"
        :src="`https://www.twitch.tv/embed/${streamData?.user_name}/chat?parent=localhost&darkpopout=true&language=en`"
        height="100%"
        width="350"
        frameborder="0"
        class="chat__iframe"
      />
      <!-- <TheChat
        v-if="streamData && accessToken"
        :token="accessToken"
        :username="streamData.user_name"
      /> -->
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.main__content {
  @include flex(row, space-between, flex-start, nowrap, 0, 1);
  width: 100%;
  .streamer {
    width: 100%;
    &__video {
      @media screen and (max-width: 1600px) {
        height: 31.25rem;
      }
    }
  }
  .chat {
    position: relative;
    height: 100%;

    &__button {
      position: absolute;
      z-index: 10;
      transform: rotate(180deg);
      top: 0.625rem;
      left: 0.625rem;
    }
    &__iframe {
      position: relative;
      z-index: 1;
      max-height: 51.625rem;
    }
    &--collapsed {
      width: 3rem;
      height: 100%;
      overflow: hidden;

      .chat__iframe {
        display: none;
      }

      .chat__button {
        transform: rotate(0deg);
      }
      @media screen and (max-width: 980px) {
        & {
          display: none;
        }
      }
    }
  }
}
</style>
