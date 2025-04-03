<script setup lang="ts">
import MoreIcon from '@/components/icons/MoreIcon.vue'
import TheButton from './TheButton.vue'

const iconButton = {
  background: 'transparent',
}
</script>

<template>
  <section class="home">
    <NuxtLink to="/" class="home__title">
      <img src="/assets/midutch-logo.svg" alt="Midutch logo" width="28" height="28" >
      <h1>MIDUTCH</h1>
    </NuxtLink>
    <TheButton :style="iconButton" class="home__button--scale"><MoreIcon /></TheButton>
  </section>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;

.home {
  @include flex(row, flex-start, center, wrap, 0.5em);
  &__title {
    @include flex(row, space-between, center, wrap, 0.5em);

    display: flex;
    align-items: center;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 0.8125rem;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: translateY(-0.1rem);
    }
  }
  &__button--scale:hover {
    transform: scale(1.07);
    transition: all 0.2s ease-in-out;
  }
}
</style>
