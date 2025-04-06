<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchAPI } from '@/utils/TwitchAPI'
import getToken from '@/utils/TwitchAuth'
import type { Category } from '~/types/types'

const twitchApi = new TwitchAPI()
const categories = ref<Category[]>([])

async function fetchCategories() {
  try {
    const accessToken = await getToken()
    const results = await twitchApi.getCategoriesWithViewersAndTags(
      accessToken.access_token,
      7,
    )
    categories.value = results
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <article class="top-categories">
    <h2 class="top-categories__title">
      <span class="top-categories__title--blue">Categories</span>&nbsp;we think you'll
      like
    </h2>
    <div class="top-categories__content">
      <CategoryCard
        v-for="category in categories"
        :id="category.id"
        :key="category.id"
        :name="category.name"
        :viewer_count="category.viewer_count"
        :tag_ids="category.tag_ids || []"
        :tags="category.tags || []"
        :box_art_url="category.box_art_url"
      />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.top-categories {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.625rem;
  &__title {
    color: #dbdbdb;
    &--blue {
      color: #189afc;
    }
  }
  &__content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 1.9rem;
    width: 100%;
    color: #dbdbdb;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    
    @media screen and (max-width: 1000px) {
      justify-self: flex-start;
    }
    @media screen and (max-width: 492px) {
      overflow: hidden;
      height: 13rem;
    }
  }
  @media screen and (min-width: 1920px) {
    max-width: 95.5rem;
  }
}
</style>
