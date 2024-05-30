<template>
  <div class="info-popup-html popup-content" v-html="content"></div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.popup-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
}
</style>
