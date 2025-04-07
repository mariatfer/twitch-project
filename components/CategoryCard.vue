<script setup lang="ts">
import type { Category } from '@/types/types'
import { formatViewerCount } from '~/utils/formatters'
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
      <li v-for="tag in tags.slice(0, 2)" :key="tag.tag_id" class="list__item">
        {{ tag.tag_name }}
      </li>
    </ul>
  </NuxtLink>
</template>

<style scoped lang="scss">
.category-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3125rem;
  box-sizing: border-box;
  border-radius: 0.3125rem;
  color: #dbdbdb;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  min-height: 21rem;
  width: calc(100% / 7 - 1.7rem);
  min-width: 12rem;
  @media screen and (max-width: 996px) {
    width: calc(100% / 3 - 1.7rem);
    min-width: unset;
    min-height: unset;
  }
  
  &__img {
    &:hover {
      transform: translate(0.0625rem, -0.0625rem);
      transition: all 0.2s ease-in-out;
      border-bottom: 0.1875rem solid #189afc;
      border-left: 0.1875rem solid #189afc;
    }
  }
  &__title--nowrap {
    font-size: 0.875rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 11.3125rem;
    &:hover {
      color: #189afc;
      transition: all 0.2s ease-in-out;
    }
  }
  &__viewers--color {
    color: #a6a6b1;
    display: flex;
    align-items: center;
    gap: 0.125rem;
    font-size: 0.8125rem;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__list {
    display: flex;
    gap: 0.625rem;
    margin-top: 0.125rem;

    .list__item {
      padding: 0.1875rem 0.4375rem;
      border-radius: 0.9375rem;
      background-color: #2f2f35;
      font-size: 0.75rem;
      font-weight: 700;
      color: #adadb8;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: #189afc;
        transition: all 0.2s ease-in-out;
        color: #fff;
      }
      @media screen and (max-width: 768px) {
        &:nth-child(2) {
          visibility: hidden;
        }
        
      }
    }
  }
}
</style>
