<template>
  <router-view />
</template>

<script setup>
import { userStore } from '~/stores/user'
import config from '~/config/config.json'

//head
useHead({
  title: config.title,
  meta: [{ name: 'description', content: config.description }],
})

//injects
const router = useRouter()

//data
const user = userStore()

// before each route
router.beforeEach((to, from) => {
  if (!user.get && to.name !== 'login' && to.name !== 'signup') {
    return { name: 'login' }
  }
})
</script>
