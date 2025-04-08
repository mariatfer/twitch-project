<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'

const searchButton = {
  background: 'var(--c-transparentgrey)',
  borderTopLeftRadius: '0',
  borderBottomLeftRadius: '0',
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

.search {
  @include flex(row, center, center, wrap, 0);
  width: 100%;
  max-width: 30em;
  &__input {
    border: 0.0625rem solid var(--c-regulargrey);
    border-top-left-radius: 0.3125rem;
    border-bottom-left-radius: 0.3125rem;
    padding: 0.65rem;
    flex-grow: 1;
    min-width: 8rem;
    background: transparent;
    transition: all 0.2s ease-in-out;
    &:focus {
      outline: none;
      border-color: var(--c-blue);
    }
    &:hover {
      border-color: var(--c-blue);
    }
    &::placeholder {
      transition: all 0.2s ease-in-out;
    }
    &:hover::placeholder {
      color: var(--c-semilightgrey);
    }

    @media screen and (max-width: 37.5rem) {
      flex-grow: 0;
      min-width: 4.8rem;
      max-width: 5rem;
    }
    &__button {
      padding: 0;
      border: 0.0625rem solid var(--c-semigrey);
      transition: all 0.2s ease-in-out;
      max-width: 2.125rem;
      width: 2.125rem;
      &:hover {
        border: 0.0625rem solid var(--c-blue);
      }
    }
  }
  @media screen and (max-width: 60.5rem) {
    display: inline-flex;
    width: auto;
  }
}
</style>
