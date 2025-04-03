<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'

const searchButton = {
  background: 'rgba(83, 83, 95, 0.38)',
}
</script>

<template>
  <section class="search">
    <input
      id="search"
      type="search"
      name="search"
      class="search__input"
      placeholder="Search"
    >
    <TheButton :style="searchButton" class="search__button"
      ><SearchIcon
    /></TheButton>
  </section>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;

.search {
  @include flex(row, flex-start, center, wrap, 0);

  &__input {
    border: 0.0625rem solid rgb(255 255 255 / 70%);
    border-top-left-radius: 0.3125rem;
    border-bottom-left-radius: 0.3125rem;
    padding: 0.65rem;
    width: 24.375rem;
    background: transparent;
    transition: all 0.2s ease-in-out;
    &:focus {
      outline: none;
      border-color: #189afc;
    }
    &:hover {
      border-color: #189afc;
    }
    &::placeholder {
      transition: all 0.2s ease-in-out;
    }
    &:hover::placeholder {
      color: #dbdbdb;
    }
  }
  &__button {
    border: 0.0625rem solid rgb(83 83 95 / 38%);
    transition: all 0.2s ease-in-out;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:hover {
      border: 0.0625rem solid #189afc;
    }
  }
}
</style>
