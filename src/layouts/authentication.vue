<template>
  <main>
    <div class="content">
      <div class="container">
        <div class="authentication">
          <div class="authentication__wrapper">
            <logo class="authentication__logo" />
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.authentication {
  @apply w-full flex flex-col justify-center items-center mb-6;
  &__logo {
    @apply mt-12 mb-8;
  }
  &__wrapper {
    @apply max-w-110 w-full;
  }
  &__title {
    @apply font-bold text-4xl mb-6 text-center;
  }
  &__text {
    @apply font-bold text-gray-500 mb-8 text-center;
  }
  form {
    @apply w-full;
  }
}
</style>
