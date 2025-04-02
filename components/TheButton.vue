<script setup lang="ts">
const props = defineProps({
  backgroundColor: String,
  color: String,
  padding: String,
  fontFamily: String,
  fontSize: String,
  border: String,
  cursor: String,
  width: String,
  height: String,
  borderTopRightRadius: String,
  borderBottomRightRadius: String,
  borderRadius: String,
  display: String,
  alignSelf: String
})
</script>

<template>
  <button type="button" v-bind:style="props"><slot></slot></button>
</template>

<style lang="scss" scoped>

</style>
