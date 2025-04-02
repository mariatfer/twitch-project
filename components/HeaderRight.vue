<script setup lang="ts">
import UserIcon from '@/components/icons/UserIcon.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'

const primaryButton = {
  backgroundColor: '#189AFC',
  color: '#FFF',
  padding: '0.5rem',
  fontFamily: '',
  height: '1.80rem',
  fontSize: '0.8125rem',
  borderRadius: '0.25rem',
  border: 'none',
  cursor: 'pointer',
}

const secundaryButton = {
  backgroundColor: '#53535f61',
  color: '#FFF',
  padding: '0.5rem',
  fontFamily: '',
  fontSize: '0.8125rem',
  borderRadius: '0.25rem',
  border: 'none',
  cursor: 'pointer',
}

const iconButton = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
}
const NotificationButton = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignSelf: 'flex-end'
}
</script>

<template>
  <section class="buttons">
    <div class="buttons__notification">
      <span class="notification">63</span>
      <TheButton v-bind:style="NotificationButton"><NotificationIcon></NotificationIcon></TheButton>
    </div>
    <TheButton v-bind:style="secundaryButton">Log In</TheButton>
    <TheButton v-bind:style="primaryButton">Sign Up</TheButton>
    <TheButton v-bind:style="iconButton"><UserIcon></UserIcon></TheButton>
  </section>
</template>

<style lang="scss" scoped>
@use '/assets/styles/mixins.scss' as *;

.buttons {
  @include flex(row, space-between, center, wrap, 0.5em);
}
.buttons__notification {
  position: relative;
  display: flex;
  width: 1.875rem;
}
.notification {
  position: absolute;
  top: -0.3600rem; 
  right: -0.3000rem;
  width: fit-content;
  background-color: red;
  border: .1875rem solid #18181b;
  padding: .10rem .400rem;
  border-radius: .9375rem;
  font-size: .65rem;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
