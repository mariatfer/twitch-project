<script setup lang="ts">
import CollapseIcon from '@/components/icons/CollapseIcon.vue';
</script>

<template>
  <aside class="aside">
    <div class="aside__header">
      <h2>Recommended channels</h2>
      <TheButton><CollapseIcon/></TheButton>
    </div>
    <div class="aside__content">
      <slot/>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
    display: flex;
    flex-direction: column;
    width: 16.25rem;
}

</style>
