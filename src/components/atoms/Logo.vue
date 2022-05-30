<template>
  <router-link class="logo" to="/">
    <img src="https://www.gicbrasil.com/img/logo.png" alt="Logo" />
  </router-link>
</template>

<style lang="scss" scoped>
.logo {
  @apply flex flex-col justify-center items-center text-center rounded-md bg-transparent p-0;
  img {
    @apply block w-full max-w-35;
    filter: invert(70%) sepia(100%) hue-rotate(-140deg) saturate(3);
  }
}
</style>
