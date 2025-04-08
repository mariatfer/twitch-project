<script setup lang="ts">
import { categoryLabels } from '@/mocks/categoryLabels'
import { hideElementsInSecondRow } from '@/utils/domUtils'

const buttonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '13.75rem',
  height: '2.8125rem',
  fontSize: '1.125rem',
  fontWeight: 600,
}

onMounted(() => {
  nextTick(() => {
    hideElementsInSecondRow('.main__content--align', 'category-button')
  })

  window.addEventListener('resize', () =>
    hideElementsInSecondRow('.main__content--align', 'category-button'),
  )
})

onUnmounted(() => {
  window.removeEventListener('resize', () =>
    hideElementsInSecondRow('.main__content--align', 'category-button'),
  )
})
</script>

<template>
  <div class="main__content">
    <LiveRecommendation />
    <LiveRecommendation />
    <TopCategories />
    <section class="main__content--align">
      <TheButton
        v-for="button in categoryLabels"
        :key="button.id"
        :style="buttonStyle"
        class="category-button"
      >
        {{ button.text }}
        <component :is="button.icon" class="icon" />
      </TheButton>
    </section>
    <LiveRecommendation />
    <LiveRecommendation />
  </div>
</template>

<style lang="scss" scoped>
.main__content {
  @include flex(column, flex-start, center, wrap, 1.25rem);
  width: 100%;
  &--align {
    @include flex(row, space-between, center, wrap, 1.25rem);
    padding: 0 0.625rem;
    .category-button {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: auto;
      &:hover {
        transform: scale(1.025);
        transition: all 0.2s ease-in-out;
      }
    }
    .icon {
      position: relative;
    }
    @media screen and (max-width: 48rem) {
      justify-content: center;
    }
  }
}
</style>
