<script setup lang="ts"></script>

<template>
  <div class="container">
    <TheHeader />
    <main class="container__main">
      <TheAside />
      <div class="main__content">
        <LiveRecommendation />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;
.container {
  @include flex(column);
  width: 100vw;

  &__main {
    @include flex(row, flex-start, flex-start, wrap, 0.625rem);
  }
}
.main__content {
  @include flex(column, flex-start, flex-start, wrap, 1.25rem);
  width: calc(100% - 16.8738rem);
}
</style>
