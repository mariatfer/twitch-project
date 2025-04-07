<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Stream } from '@/types/types'
import CollapseIcon from '@/components/icons/CollapseIcon.vue'
defineProps<Stream>()
definePageMeta({
  layout: false,
})

const isCollapsed = ref(false)

function toggleAside() {
  isCollapsed.value = !isCollapsed.value
}

function handleResize() {
  if (window.innerWidth <= 980) {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const iconButton = {
  background: 'transparent',
  padding: 0,
}
</script>

<template>
  <aside :class="['chat', { 'chat--collapsed': isCollapsed }]">
    <TheButton :style="iconButton" class="chat__button" @click="toggleAside"
      ><CollapseIcon
    /></TheButton>
    <iframe
      v-if="$props"
      :src="`https://www.twitch.tv/embed/${$props.user_name}/chat?parent=localhost&darkpopout=true&language=en`"
      height="100%"
      width="350"
      frameborder="0"
      class="chat__iframe"
    />
  </aside>
</template>

<style lang="scss" scoped>
.chat {
  position: relative;
  height: 100%;

  &__button {
    position: absolute;
    z-index: 10;
    transform: rotate(180deg);
    top: 0.625rem;
    left: 0.625rem;
  }
  &__iframe {
    position: relative;
    z-index: 1;
    max-height: 54.3125rem;
  }
  &--collapsed {
    width: 3rem;
    height: 100%;
    overflow: hidden;

    .chat__iframe {
      display: none;
    }

    .chat__button {
      transform: rotate(0deg);
    }
    @media screen and (max-width: 980px) {
      & {
        display: none;
      }
    }
  }
}
</style>
