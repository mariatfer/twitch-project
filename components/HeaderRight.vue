<script setup lang="ts">
import UserIcon from '@/components/icons/UserIcon.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'

const primaryButton = {
  background: '#189AFC',
}

const secundaryButton = {
  background: 'rgba(83, 83, 95, 0.38)',
}

const iconButton = {
  background: 'transparent',
}

const notificationButton = {
  background: 'transparent',
  display: 'flex',
  alignSelf: 'flex-end'
}
</script>

<template>
  <section class="buttons">
    <div class="buttons__notification buttons--translate">
      <span class="buttons__notification--badge">63</span>
      <TheButton :style="notificationButton"><NotificationIcon /></TheButton>
    </div>
    <TheButton :style="secundaryButton" class="buttons--translate">Log In</TheButton>
    <TheButton :style="primaryButton" class="buttons--translate">Sign Up</TheButton>
    <TheButton :style="iconButton" class="buttons--translate"><UserIcon /></TheButton>
  </section>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;

.buttons {
  @include flex(row, space-between, center, wrap, 0.5em);

  &__notification {
    position: relative;
    display: flex;
    transition: all 0.2s ease-in-out;

    &--badge {
      position: absolute;
      top: -0.35rem;
      right: -0.15rem;
      width: fit-content;
      background-color: red;
      border: 0.1875rem solid #18181b;
      padding: 0.1rem 0.4rem;
      border-radius: 0.9375rem;
      font-size: 0.65rem;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  &--translate:hover {
    transform: translateY(-0.1rem);
  }
}
</style>
