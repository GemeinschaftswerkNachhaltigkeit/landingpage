<template>
  <div class="accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.accordion {
  display: grid;
  gap: 14px;
  width: 100%;
}
</style>