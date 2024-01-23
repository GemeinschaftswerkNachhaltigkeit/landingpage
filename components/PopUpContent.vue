<template>
  <div class="popup-content">
    <header class="header">
      <h2 class="popup-title">{{ title }}</h2>
      <div class="content" v-if="content" v-html="content"></div>
    </header>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }

})
</script>

<style scoped lang="scss">
.popup-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 4rem 3rem 3rem 3rem;

  .header {
    background: transparent;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    color: var(--gw-blue-dark);

    .popup-title {
      text-align: center;
      margin-bottom: 1rem;
    }

    .content {
      text-align: center;
    }
  }

  .body {
    width: 100%;
  }
}
</style>