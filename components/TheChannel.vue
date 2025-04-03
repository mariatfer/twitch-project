<script setup lang="ts"></script>

<template>
  <NuxtLink to="/" class="channel">
    <img src="/assets/midutch-logo.svg" alt="" class="channel__logo">
    <section class="channel__info">
      <h3 class="channel__info--title">Miduncy</h3>
      <p class="channel__info--description">Coding Live</p>
    </section>
    <div class="channel__live">
      <div class="channel__live--point" />
      <span class="channel__live--followers">2.3K</span>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;
.channel {
    @include flex(row, space-between, center);
  padding: 0.3125rem 0.625rem;
  &:hover {
    background-color: #1e1e1e;
    transition: all 0.2s ease-in-out;
    & .channel__info--title {
        color: #189AFC;
        transition: all 0.3s ease-in-out;
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
      font-size: .875rem;
      font-weight: 500;
      color: #fff;
    }
    &--description {
      font-size: 0.8125rem;
      color: #b8b8b8;
    }
  }
  &__live {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: flex-start;
    width: 2.5rem;
    &--point {
      width: 0.5rem;
      height: 0.5rem;
      background-color: #ff0000;
      border-radius: 50%;
    }
    &--followers {
      font-size: 0.8125rem;
    }
  }
}
</style>
