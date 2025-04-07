<script setup lang="ts">

</script>

<template>
    <li class="tags">
      <slot/>
    </li>
</template>

<style lang="scss" scoped>
.tags {
    padding: 0.1875rem 0.4375rem;
    border-radius: 0.9375rem;
    background-color: #2f2f35;
    font-size: 0.75rem;
    font-weight: 700;
    color: #adadb8;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    width: auto;
    user-select: none;
    cursor: pointer;
    &:hover {
      background-color: #189afc;
      transition: all 0.2s ease-in-out;
      color: #fff;
    }
  
}
</style>
