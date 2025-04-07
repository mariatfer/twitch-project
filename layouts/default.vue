<script setup lang="ts"></script>

<template>
  <div class="container">
    <header class="container__header">
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </header>
    <main class="container__main">
      <TheAside />
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @include flex(column);
  &__header {
    height: 3.125rem;
    background-color: #18181b;
    padding: 0 1.25rem;
    @include flex(row, space-between, center);
  }
  &__main {
    @include flex(row, flex-start, flex-start, nowrap, 0.625rem);
    width: 100%;
  }
}
</style>
