<script setup lang="ts">
import type { Stream } from '@/types/types'
import { formatViewerCount } from '@/utils/formatters'
defineProps<Stream>()
</script>

<template>
  <section class="streamer__data">
    <div class="streamer__data--thumbnail">
      <img
        :src="$props.profile_image_url"
        alt="Streamer Thumbnail"
        class="thumbnail__image"
      >
      <span class="thumbnail__badge">LIVE</span>
    </div>
    <div class="data__info">
      <div class="data__info--align">
        <h3>{{ $props.user_name }}</h3>
        <div class="data__info--align--buttons">
          <TheButton>Follow</TheButton>
          <TheButton>Suscribe</TheButton>
        </div>
      </div>
      <p>{{ $props.title }}</p>
      <p>Viewers: {{ formatViewerCount($props.viewer_count) }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.streamer__data {
  @include flex(row, flex-start, flex-start, nowrap, 0.625rem);
  width: 100%;
  //   padding: 0 .625rem;;

  &--thumbnail {
    @include flex(row, center, center);

    position: relative;
    .thumbnail {
      &__image {
        width: 4rem;
        height: auto;
        border-radius: 50%;
        object-fit: cover;
      }
      &__badge {
        position: absolute;
        bottom: -0.6em;
        left: 50%;
        transform: translateX(-50%);
        background-color: red;
        font-weight: 600;
        padding: 0.25em 0.5em;
        border-radius: 0.25rem;
      }
    }
  }
  .data__info {
    width: 100%;
    &--align {
      @include flex(row, space-between, center, nowrap, 0.625rem);
      width: 100%;
      &--buttons {
        @include flex(row, space-between, center, nowrap, 0.625rem);
        
        
      }	
      
    }
  }
}
</style>
