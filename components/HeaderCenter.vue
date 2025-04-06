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
      aria-label="Search"
      aria-describedby="search"
    >
    <TheButton :style="searchButton" class="search__button"><SearchIcon /></TheButton>
  </section>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;

.search {
  @include flex(row, center, center, wrap, 0);
  width: 100%;
  max-width: 30em;
  &__input {
    border: 0.0625rem solid #5d5d61;
    border-top-left-radius: 0.3125rem;
    border-bottom-left-radius: 0.3125rem;
    padding: 0.65rem;
    flex-grow: 1;
    min-width: 8rem;
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

    @media screen and (max-width: 600px) {
      flex-grow: 0;
      min-width: 4.8rem;
      max-width: 5rem;
    }
    &__button {
      padding: 0;
      border: 0.0625rem solid #2f2f35;
      transition: all 0.2s ease-in-out;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      max-width: 2.125rem;
      width: 2.125rem;
      &:hover {
        border: 0.0625rem solid #189afc;
      }
    }
  }
  @media screen and (max-width: 968px) {
    display: inline-flex;
    width: auto;
  }
}
</style>
