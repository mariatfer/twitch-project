<script setup lang="ts">
import FavIcon from '@/components/icons/FavIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import DownIcon from '@/components/icons/DownIcon.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'
import MoreIcon from '@/components/icons/MoreIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import type { Stream } from '@/types/types'

defineProps<Stream>()

const buttonFollow = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontWeight: '600',
  padding: '0.25em 0.5em',
}
const buttonSub = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontWeight: '600',
  backgroundColor: 'rgb(95, 83, 89, 38%)',
  padding: '0.25em 0.5em',
}
const iconButton = {
  background: 'transparent',
}
</script>

<template>
  <section class="stream-thumbnail">
    <div class="stream-thumbnail--align">
      <img
        :src="$props.profile_image_url"
        alt="Streamer Thumbnail"
        class="stream-thumbnail__image"
      >
      <span class="stream-thumbnail__badge">LIVE</span>
    </div>
    <div class="stream-data">
      <div class="stream-data--align">
        <h3 class="stream-data__user">{{ $props.user_name }}</h3>
        <div class="stream-data__buttons--align">
          <TheButton :style="buttonFollow"><FavIcon />Follow</TheButton>
          <TheButton :style="buttonSub"
            ><StarIcon />Suscribe<DownIcon color="#FFF"
          /></TheButton>
        </div>
      </div>
      <section class="stream-data--align">
        <h4 class="stream-data__title">{{ $props.title }}</h4>
        <div class="stream-data__buttons--align">
          <div class="stream-data__buttons--align">
            <UserIcon color="#FF8280" />
            <span class="stream-data__span span--viewer">{{ $props.viewer_count }}</span>
            <span class="stream-data__span">3:23:05</span>
          </div>
          <div class="stream-data__buttons--align">
            <TheButton :style="iconButton"><DownloadIcon /></TheButton>
            <TheButton :style="iconButton"><MoreIcon /></TheButton>
          </div>
        </div>
      </section>
      <p class="stream-data--blue">{{ $props.game_name }}</p>
      <ul class="tags__list">
        <TheTag v-for="tag in tags" :key="tag.tag_id">
          {{ tag }}
        </TheTag>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stream-thumbnail {
  @include flex(row, flex-start, flex-start, nowrap, 0.625rem);
  width: 100%;
  &--align {
    @include flex(row, center, center);
    position: relative;
    max-height: 4rem;
  }
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
.stream-data {
  @include flex(column, flex-start, flex-start, nowrap, 0.3125rem);

  width: 100%;
  &--align {
    @include flex(row, space-between, flex-start, nowrap, 0.625rem);
    width: 100%;
  }
  &__user, &__title {
    @include flex(row, flex-start, center, wrap);
    user-select: none;
  }
  &__buttons {
    @include flex(row, space-between, center, nowrap, 0.625rem);
    &--align {
      @include flex(row, space-between, center, nowrap, 0.625rem);
      width: auto;
      max-height: 1.6563rem;
    }
  }
  &__span {
    margin: auto 0;
    
  }
  .span--viewer {
    color: #FF8280;
  }
  &--blue {
    color: #189AFC;
  }
}
.tags {
  &__list {
    @include flex(row, flex-start, flex-start, wrap, 0.625rem);
    margin-top: 0.125rem;
  }
}
</style>
