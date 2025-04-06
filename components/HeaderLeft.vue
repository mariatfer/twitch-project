<script setup lang="ts">
import MoreIcon from '@/components/icons/MoreIcon.vue'
import TheButton from './TheButton.vue'

const iconButton = {
  background: 'transparent',
}
</script>

<template>
  <section class="home">
    <NuxtLink to="/" class="home__logo">
      <img src="/assets/midutch-logo.svg" alt="Midutch logo" width="28" height="28" >
      <h1 class="home__logo--title">MIDUTCH</h1>
    </NuxtLink>
    <TheButton :style="iconButton" class="home__button--scale"><MoreIcon /></TheButton>
  </section>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;

.home {
  @include flex(row, flex-start, center, wrap, 0.5em);
  &__logo {
    @include flex(row, space-between, center, wrap, 0.5em);
    font-size: 0.8125rem;
    font-weight: 500;
    &:hover {
      transform: translateY(-0.1rem);
      transition: transform 0.4s ease-in-out;
    }
    &:hover .home__logo--title {
      color: #189afc;
      transition: color 0.3s ease-in-out;
    }
    &--title {
      @include flex(row, center, center, wrap, 0.5em);
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
  &__button--scale:hover {
    transform: scale(1.07);
    transition: all 0.2s ease-in-out;
  }
}
</style>
