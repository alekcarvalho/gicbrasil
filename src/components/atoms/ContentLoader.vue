<template>
  <div class="vue-content-placeholders">
    <div v-if="image" class="vue-content-placeholders__image"></div>
    <div v-if="header" class="vue-content-placeholders__heading">
      <div v-if="avatar" class="vue-content-placeholders__avatar" />
      <div class="vue-content-placeholders__content">
        <div class="vue-content-placeholders__title" />
        <div class="vue-content-placeholders__subtitle" />
      </div>
    </div>
    <div v-if="text" class="vue-content-placeholders__text">
      <div
        v-for="index in lines"
        :key="index"
        class="vue-content-placeholders__line"
      />
    </div>
  </div>
</template>

<script setup>
//props
const props = defineProps({
  lines: {
    type: Number,
    default: 4,
  },
  image: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: Boolean,
    default: true,
  },
  header: {
    type: Boolean,
    default: true,
  },
  text: {
    type: Boolean,
    default: true,
  },
})

const { lines, image, avatar, header, text } = toRefs(props)
</script>

<style lang="scss" scoped>
.table-loader {
  * {
    @apply m-0;
  }
}
</style>
