<script setup lang="ts">
import CollapseIcon from '@/components/icons/CollapseIcon.vue'
const iconButton = {
  background: 'transparent',
  padding: 0,
}
</script>

<template>
  <aside class="aside">
    <div class="aside__header">
      <h2 class="aside__header--title">Recommended channels</h2>
      <TheButton :style="iconButton" class="aside__header--button"
        ><CollapseIcon
      /></TheButton>
    </div>
    <div class="aside__content">
      <TheChannel/>
      <TheChannel/>
      <TheChannel/>
      <TheChannel/>
      <TheChannel/>
      <TheChannel/>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;
.aside {
  @include flex(column, space-between);
  width: 16.25rem;
  &__header {
    @include flex(row, space-between);
    padding: 0.625rem 0.3125rem;
    &--title {
      @include flex(row, center, center, wrap);
      text-transform: uppercase;
      font-weight: 500;
      height: auto;
      font-size: .8125rem;
    }
    &--button {

      &:hover {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>
