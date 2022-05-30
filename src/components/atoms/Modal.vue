<template>
  <div class="modal" @click.self="close">
    <div class="modal__body">
      <div class="modal__content">
        <div class="modal__title">
          <slot name="title" />
        </div>
        <div class="modal__text">
          <slot name="text" />
        </div>
      </div>
      <div class="modal__action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup>
//injects
const emit = defineEmits(['close'])

// methods
const close = () => {
  emit('close', false)
}
</script>

<style lang="scss" scoped>
.modal {
  @apply fixed flex items-center justify-center top-0 left-0 transition-all duration-300 w-full h-full overflow-hidden z-99 bg-black bg-opacity-50 px-6;
  &__body {
    @apply w-full max-w-160 bg-white rounded-md text-center;
  }
  &__content {
    @apply p-6;
  }
  &__title {
    @apply text-xl font-medium text-gray-900;
  }
  &__text {
    @apply text-sm text-gray-500 mt-2;
  }
  &__action {
    @apply bg-gray-50 rounded-b-md px-4 py-3 sm:px-6;
  }
}
</style>
