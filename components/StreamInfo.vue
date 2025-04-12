<script setup lang="ts">
import FavIcon from '@/components/icons/FavIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import DownIcon from '@/components/icons/DownIcon.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'
import MoreIcon from '@/components/icons/MoreIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import type { Stream } from '@/types/types'
import { inject } from 'vue'

const stream = inject<Stream>('stream')

const buttonFollow = {
  display: 'flex',
  alignItems: 'center',
}
const buttonSub = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgb(95, 83, 89, 38%)',
}
const iconButton = {
  background: 'transparent',
}
</script>

<template>
  <article class="stream-data">
    <div class="stream-data--align">
      <h3 class="stream-data__user">{{ stream.user_name }}</h3>
      <div class="stream-data__buttons">
        <TheButton :style="buttonFollow" class="stream-data__button"
          ><FavIcon />Follow</TheButton
        >
        <TheButton :style="buttonSub" class="stream-data__button"
          ><StarIcon />Suscribe<DownIcon color="#FFF"
        /></TheButton>
      </div>
    </div>
    <section class="stream-data--align">
      <h4 class="stream-data__title">{{ stream.title }}</h4>
      <div class="stream-data__info">
        <div class="info">
          <UserIcon color="#FF8280" />
          <span class="info__span span--viewer">{{ stream.viewer_count }}</span>
          <span class="info__span">3:23:05</span>
        </div>
        <div class="info">
          <TheButton :style="iconButton" class="info__button"><DownloadIcon /></TheButton>
          <TheButton :style="iconButton" class="info__button"><MoreIcon /></TheButton>
        </div>
      </div>
    </section>
    <p class="stream-data__category">{{ stream.game_name }}</p>
    <ul class="tags__list">
      <TheTag v-for="tag in tags" :key="tag.tag_id">
        {{ tag }}
      </TheTag>
    </ul>
  </article>
</template>

<style lang="scss" scoped>
.stream-data {
  @include flex(column, flex-start, flex-start, nowrap, 0.3125rem);

  width: 100%;
  &--align {
    @include flex(row, space-between, flex-start, nowrap, 0.625rem);
    width: 100%;
  }
  &__user,
  &__title {
    @include flex(row, flex-start, center, wrap);
    user-select: none;
  }

  &__buttons {
    @include flex(row, flex-end, center, wrap, 0.625rem);
  }
  &__info {
    @include flex(row, flex-end, flex-start, wrap, 0.625rem);
    .info {
      @include flex(row, flex-end, center, nowrap, 0.625rem);
      width: auto;
      max-height: 1.6563rem;
      &__span {
        margin: auto 0;
      }
    }
  }
  .span--viewer {
    color: var(--c-pink);
  }
  &__category {
    color: var(--c-blue);
    font-weight: 600;
  }
  &__button {
    font-weight: 600;
    gap: 0.5rem;
    padding: 0.25em 0.5em;
    &:hover {
      transform: translateY(-0.0625rem);
    }
  }
}
</style>
