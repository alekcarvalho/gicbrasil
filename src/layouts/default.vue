<template>
  <main>
    <Header />
    <div class="content">
      <router-view />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.content {
  @apply mt-12;
}
</style>
