<template>
  <div :class="['alert', `alert--${data.type}`]">
    <div class="alert__body">
      <div v-if="data.title" class="alert__title">
        {{ data.title }}
      </div>
      <div v-if="data.message" class="alert__message">
        {{ data.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
//props
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const { data } = toRefs(props)
</script>

<style lang="scss" scoped>
.alert {
  @apply fixed top-0 left-0 flex flex-col items-center justify-center w-full px-6;
  animation: slideDown 1.5s ease forwards;
  &__body {
    @apply flex flex-col items-center justify-center w-full max-w-160 p-3 rounded;
  }
  &__title {
    @apply font-bold text-2xl mb-2;
  }
  &__message {
    @apply font-medium text-sm;
  }
}
.alert--success {
  .alert__body {
    @apply bg-green-100 text-green-600;
  }
}

.alert--error {
  .alert__body {
    @apply bg-red-100 text-red-600;
  }
}

@keyframes slideDown {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    transform: translateY(3rem);
    opacity: 1;
  }
}
</style>
