<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'

const searchButton = {
  backgroundColor: '#53535f61',
  border: 'none',
  cursor: 'pointer',
  width: '2.125rem',
  height: '2.5rem',
  borderTopRightRadius: '0.3125rem',
  borderBottomRightRadius: '0.3125rem',
}
</script>

<template>
  <section class="search">
    <input
      type="search"
      name="search"
      id="search"
      class="search__input"
      placeholder="Search"
    />
    <TheButton v-bind:style="searchButton"><SearchIcon></SearchIcon></TheButton>
  </section>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;

.search {
  @include flex(row, flex-start, center, wrap, 0);

  &__input {
    border: 0.0625rem solid rgba(255, 255, 255, 70%);
    border-top-left-radius: 0.3125rem;
    border-bottom-left-radius: 0.3125rem;
    padding: 0.65rem;
    height: 2.5rem;
    background: transparent;
    &:focus {
      outline: none;
    }
  }
}
</style>
