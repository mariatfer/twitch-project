<script setup lang="ts">
import UserIcon from '@/components/icons/UserIcon.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import { ref, onMounted } from 'vue'
import { TwitchAPI } from '@/utils/TwitchAPI'

const twitchApi = new TwitchAPI()
const authUrl = ref<string>('')

onMounted(async () => {
  try {
    authUrl.value = await twitchApi.getAuthorizationUrl()
  } catch (error) {
    console.error('Error obtaining Twitch authorization URL:', error)
  }
})

function redirectToAuthUrl() {
  if (authUrl.value) {
    window.location.href = authUrl.value
  } else {
    console.error('Authorization URL is not available.')
  }
}

const primaryButton = {
  background: 'var(--c-blue)',
}

const secundaryButton = {
  background: 'var(--c-transparentgrey)',
}

const iconButton = {
  background: 'transparent',
}

const notificationButton = {
  background: 'transparent',
  display: 'flex',
  alignSelf: 'flex-end',
}
</script>

<template>
  <section class="buttons">
    <div class="buttons__notification buttons--translate">
      <span class="buttons__notification--badge">63</span>
      <TheButton :style="notificationButton"><NotificationIcon /></TheButton>
    </div>
    <TheButton
      :style="secundaryButton"
      class="buttons--translate"
      @click="redirectToAuthUrl"
      >Log In</TheButton
    >
    <TheButton :style="primaryButton" class="buttons--translate">Sign Up</TheButton>
    <TheButton :style="iconButton" class="buttons--translate"><UserIcon /></TheButton>
  </section>
  <TheButton :style="iconButton" class="buttons--translate menu-button"
    ><MenuIcon
  /></TheButton>
</template>

<style lang="scss" scoped>
.buttons {
  @include flex(row, space-between, center, wrap, 0.5em);

  &__notification {
    position: relative;
    @include flex(row);
    transition: all 0.2s ease-in-out;

    &--badge {
      position: absolute;
      top: -0.35rem;
      right: -0.15rem;
      width: fit-content;
      background-color: var(--c-red);
      border: 0.1875rem solid var(--c-midgrey);
      padding: 0.1rem 0.4rem;
      border-radius: 0.9375rem;
      font-size: 0.65rem;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  &--translate {
    font-weight: 600;
    &:hover {
      transform: translateY(-0.1rem);
    }
  }
}
.menu-button {
  display: none;
}
@media (max-width: 64rem) {
  .menu-button {
    display: block;
  }
  .buttons {
    display: none;
  }
}
</style>
