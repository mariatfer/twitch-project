<script setup lang="ts">
import type { Stream } from '@/types/types'
import { formatViewerCount } from '@/utils/formatters'

const props = defineProps<Stream>()
</script>

<template>
  <NuxtLink :to="`/${props.user_name}`" class="channel">
    <img :src="$props.profile_image_url" :alt="`${$props.user_name} profile image`" class="channel__logo" >
    <section class="channel__info">
      <h3 class="channel__info--title">{{ $props.user_name }}</h3>
      <p class="channel__info--description">{{ $props.game_name }}</p>
    </section>
    <div class="channel__live">
      <div class="channel__live--point" />
      <span class="channel__live--followers">{{
        formatViewerCount($props.viewer_count)
      }}</span>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.channel {
  @include flex(row, space-between, center, nowrap, 8px);
  padding: 0.3125rem 0.625rem;
  &:hover {
    background-color: var(--c-graphite);
    transition: all 0.2s ease-in-out;
    & .channel__info--title {
      color: var(--c-blue);
      transition: all 0.2s ease-in-out;
    }
  }
  &__logo {
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 50%;
    object-fit: cover;
  }
  &__info {
    @include flex(column);
    width: 8.75rem;
    &--title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--c-white);
    }
    &--description {
      font-size: 0.8125rem;
      color: var(--c-lightgrey);
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  &__live {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: flex-start;
    gap: 0.125rem;
    width: 2.6875rem;
    &--point {
      width: 0.5rem;
      height: 0.5rem;
      background-color: var(--c-red);
      border-radius: 50%;
    }
    &--followers {
      font-size: 0.7813rem;
    }
  }

  @media screen and (max-width: 48rem) {
    &__info,
    &__live {
      display: none;
    }
    &:hover {
      background-color: transparent;
    }
    &__logo:hover {
      border: 0.125rem solid var(--c-blue);
    }
  }

  .aside--collapsed &__info,
  .aside--collapsed &__live {
    display: none;
  }
}
</style>
