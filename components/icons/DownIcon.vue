<script setup lang="ts">
defineProps({
  color: { type: String, default: '#189AFC' },
});
</script>

<template>
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8.5L5.22727 6.5L12.5 13.5L19.7727 6.5L22 8.5L12.5 17.5L3 8.5Z"
      :fill="color" 
    />
  </svg>
</template>