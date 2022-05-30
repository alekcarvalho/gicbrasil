<template>
  <header class="header">
    <div class="container">
      <Logo class="header__logo" />
      <button class="button button--secondary button--sm" @click="logout()">
        Sair
      </button>
    </div>
  </header>
</template>

<script setup>
import { userStore } from '~/stores/user'

// injects
const router = useRouter()
const user = userStore()

//methods
const logout = () => {
  user.delete()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.header {
  @apply py-2 border-b border-solid border-gray-200;
  .container {
    @apply flex justify-between;
  }
  &__logo {
    @apply w-28;
  }
}
</style>
