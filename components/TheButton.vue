<script setup lang="ts">
const props = defineProps({
  background: {type: String, default: 'var(--c-blue)'},
  display: {type: String, default: 'inline-block'},
  alignSelf: {type: String, default: 'auto'}
})
defineEmits(['click']);
</script>

<template>
  <button type="button" class="button" :style="props" @click="$emit('click')"><slot/></button>
</template>

<style lang="scss" scoped>
.button {
  padding: 0.2em 0.6em;
  color: var(--c-white);
  font-size: 0.8125rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
</style>
