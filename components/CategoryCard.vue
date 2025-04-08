<script setup lang="ts">
import type { Category } from '@/types/types'
import { formatViewerCount } from '@/utils/formatters'
const MAX_TAGS = 2;
defineProps<Category>()
</script>

<template>
  <NuxtLink to="/" class="category-card">
    <img :src="$props.box_art_url" alt="Category thumbnail" class="category-card__img" >
    <h3 class="category-card__title--nowrap">
      {{ $props.name }}
    </h3>
    <p class="category-card__viewers--color">
      {{ formatViewerCount($props.viewer_count) }} viewers
    </p>
    <ul class="category-card__list">
      <TheTag v-for="tag in tags.slice(0, MAX_TAGS)" :key="tag.tag_id" class="list__item">
        {{ tag.tag_name }}
      </TheTag>
    </ul>
  </NuxtLink>
</template>

<style scoped lang="scss">


.category-card {
  @include flex(column, space-between);
  box-sizing: border-box;
  border-radius: 0.3125rem;
  color: var(--c-semilightgrey);
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  min-height: 21rem;
  width: calc(100% / 7 - 1.7rem);
  min-width: 12rem;
  @media screen and (max-width: 62.25rem) {
    width: calc(100% / 3 - 1.7rem);
    min-width: unset;
    min-height: unset;
  }
  
  &__img {
    &:hover {
      transform: translate(0.0625rem, -0.0625rem);
      transition: all 0.2s ease-in-out;
      border-bottom: 0.1875rem solid var(--c-blue);
      border-left: 0.1875rem solid var(--c-blue);
    }
  }
  &__title--nowrap {
    font-size: 0.875rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 11.3125rem;
    &:hover {
      color: var(--c-blue);
      transition: all 0.2s ease-in-out;
    }
  }
  &__viewers--color {
    @include flex(row, flex-start, center, nowrap, 0.125rem);
    color: var(--c-semilightgrey);
    font-size: 0.8125rem;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__list {
    @include flex(row, flex-start, center, nowrap, 0.625rem);
    margin-top: 0.125rem;
    .list__item {
      @media screen and (max-width: 48rem) {
        &:nth-child(2) {
          visibility: hidden;
        }
        
      }
    }
  }
}
</style>
