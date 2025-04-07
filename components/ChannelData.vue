<script setup lang="ts">
import YoutubeIcon from '@/components/icons/YoutubeIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import TwitterIcon from '@/components/icons/TwitterIcon.vue'
import TiktokIcon from '@/components/icons/TiktokIcon.vue'
import { ref, onMounted } from 'vue'
import { TwitchAPI } from '@/utils/TwitchAPI'
import getToken from '@/utils/TwitchAuth'
import type { Stream } from '@/types/types'

const props = defineProps<Stream>()
const twitchApi = new TwitchAPI()
const description = ref('')
const userId = props.user_id

async function fetchChannelData() {
  try {
    const accessToken = await getToken()
    const userInfo = await twitchApi.getUserInfo(accessToken.access_token, userId)
    description.value = userInfo.description
  } catch (error) {
    throw new FetchError('Error fetching channel data:' + error)
  }
}

onMounted(() => {
  fetchChannelData()
})
</script>

<template>
  <article class="channel-data">
    <p class="channel-data__stat">
      <span class="channel-data__stat--followers">184M</span> followers
    </p>
    <p class="channel-data__description">{{ description }}</p>

    <div class="channel-data__line" />
    <section class="channel-data__socials">
      <a
        href="https://www.youtube.com/"
        target="_blank"
        class="channel-data__socials--link"
      >
        <YoutubeIcon />Youtube
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        class="channel-data__socials--link"
      >
        <InstagramIcon />Instagram
      </a>
      <a href="https://www.x.com/" target="_blank" class="channel-data__socials--link">
        <TwitterIcon />Twitter
      </a>
      <a
        href="https://www.tiktok.com/"
        target="_blank"
        class="channel-data__socials--link"
      >
        <TiktokIcon />Tiktok
      </a>
    </section>
  </article>
</template>

<style scoped lang="scss">
.channel-data {
  @include flex(column, flex-start, flex-start, nowrap, 0.625rem);
  width: 100%;
  background-color: #18181b;
  padding: 1.25rem;
  &__stat {
    @include flex(row, flex-start, flex-end, nowrap, 0.625rem);
    width: 100%;
    font-weight: 600;
    color: #dbdbdb;
    &--followers {
      color: #fff;
      font-size: 1.125rem;
    }
  }
  &__description {
    color: #fff;
  }
  &__line {
    width: 100%;
    height: 0.0625rem;
    background-color: rgb(66, 66, 66);
    margin: 1.25rem 0;
  }
  &__socials {
    @include flex(row, flex-start, flex-start, nowrap, 0.625rem);
    width: 100%;

    &--link {
      @include flex(row, flex-start, center, wrap, 0.3125rem);
      font-size: 1rem;
      color: #dbdbdb;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
