<script setup lang="ts">

</script>

<template>
  <header class="header">
    <HeaderLeft/>
    <HeaderCenter/>
    <HeaderRight/>
  </header>
</template>
    
<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;

.header {
  height: 3.125rem;
  background-color: #18181b;
  padding: 0 1.25rem;

  @include flex(row, space-between, center);
  
}
</style>
