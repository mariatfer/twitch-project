<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import DownIcon from '@/components/icons/DownIcon.vue'
defineProps<{
  isExpanded: boolean
}>()

const emit = defineEmits(['toggle-expand'])

function handleClick() {
  emit('toggle-expand')
}

const ShowButton = {
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  gap: '0.125rem',
  color: '#189AFC',
  fontWeight: 600,
}
</script>

<template>
  <div class="show-more">
    <div class="show-more__line" />
    <TheButton :style="ShowButton" class="show-more__button" @click="handleClick"
      >{{ isExpanded ? 'Show Less' : 'Show More' }} <DownIcon :class="{ 'rotated': isExpanded }"/></TheButton>
    <div class="show-more__line" />
  </div>
</template>

<style scoped lang="scss">
.show-more {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.625rem;
  &__line {
    width: calc(50% - 3.95rem);
    height: 0.0625rem;
    background-color: #5d5d61;
    margin: 0.625rem 0;
  }
  &__button:hover {
    border: .0625rem solid #189afc;
  }
  .rotated {
    transform: rotate(180deg); /* Rota el ícono 180 grados */
    transition: transform 0.3s ease-in-out; /* Transición suave */
  }
}
</style>
