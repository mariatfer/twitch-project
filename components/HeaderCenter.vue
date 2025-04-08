<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'
const isMovile = ref(false)

const searchButtonStyles = computed(() => {
  return isMovile.value
    ? {
        background: 'var(--c-transparentgrey)',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
      }
    : {
        background: 'transparent',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
      }
})

function handleResize() {
  if (window.innerWidth >= 768) {
    isMovile.value = true
  } else {
    isMovile.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
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
    <TheButton :style="searchButtonStyles" class="search__button"
      ><SearchIcon
    /></TheButton>
  </section>
</template>

<style lang="scss" scoped>
.search {
  @include flex(row, center, center, wrap, 0);
  width: 100%;
  max-width: 30em;
  &__input {
    border: 0.0625rem solid var(--c-regulargrey);
    color: var(--c-white);
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
  @media screen and (max-width: 60.5rem) {
    display: inline-flex;
    width: auto;
    &__input {
      display: none;
    }
    &__button {
      border: none;
      &:hover {
        border: none;
        transform: translateY(-0.125rem);
      }
    }
  }
}
</style>
