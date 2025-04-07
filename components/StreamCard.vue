<script setup lang="ts">
import VerfiedIcon from '@/components/icons/VerifiedIcon.vue'
import type { Stream } from '@/types/types'
defineProps<Stream>()
</script>

<template>
  <NuxtLink :to="`/${$props.user_name}`" class="live-recommendation__card">
    <img :src="$props.thumbnail_url" alt="Stream thumbnail" class="card__img" >
    <section class="card__info">
      <img :src="$props.profile_image_url" alt="Profile image" class="info__img" >
      <div class="info__content">
        <h3 class="info__content--nowrap">
          {{ $props.title }}
        </h3>
        <h4 class="info__content--color">{{ $props.user_name }}<VerfiedIcon /></h4>
        <p class="info__content--color">{{ $props.game_name }}</p>
        <ul class="tags__list">
          <li v-for="tag in tags.slice(0, 2)" :key="tag.tag_id" class="tags__item">
            {{ tag }}
          </li>
        </ul>
      </div>
    </section>
  </NuxtLink>
</template>

<style scoped lang="scss">
.live-recommendation__card {
  @include flex(column, flex-start, flex-start, nowrap, 0.625rem);
  box-sizing: border-box;
  border-radius: 0.3125rem;
  color: #dbdbdb;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  height: fit-content;

  @media screen and (max-width: 768px) {
    flex-basis: 100%;
  }
}

.card {
  &__img {
    &:hover {
      transform: translate(0.0625rem, -0.0625rem);
      transition: all 0.2s ease-in-out;
      border-bottom: 0.1875rem solid #189afc;
      border-left: 0.1875rem solid #189afc;
    }
  }
  &__info {
    @include flex(row, flex-start, flex-start, nowrap, 0.75rem);
  }
}
.info {
  &__img {
    width: 2.6875rem;
    height: 2.6875rem;
    border-radius: 50%;
    object-fit: cover;
  }
  &__content {
    @include flex(column, flex-start, flex-start, nowrap, 0.3125rem);

    &--nowrap {
      font-size: 0.875rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 17.3125rem;
      &:hover {
        color: #189afc;
        transition: all 0.2s ease-in-out;
      }
    }
    &--color {
      @include flex(row, flex-start, center, nowrap, 0.125rem);
      color: #a6a6b1;
      font-size: 0.8125rem;
      font-weight: 500;
    }
  }
}

.tags {
  &__list {
    @include flex(row, flex-start, flex-start, nowrap, 0.625rem);
    margin-top: 0.125rem;
  }
  &__item {
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
  }
}
</style>
