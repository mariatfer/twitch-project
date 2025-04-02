<script setup lang="ts">
import MoreIcon from '@/components/icons/MoreIcon.vue'
import TheButton from './TheButton.vue'

const iconButton = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer'
}

</script>

<template>
  <section class="home">
    <NuxtLink to="/" class="home__title">
      <img src="/assets/midutch-logo.svg" alt="Midutch logo" width="28" height="28" />
      <h1>MIDUTCH</h1>
    </NuxtLink>
    <TheButton v-bind:style="iconButton"><MoreIcon></MoreIcon></TheButton>
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
  }
}
</style>
