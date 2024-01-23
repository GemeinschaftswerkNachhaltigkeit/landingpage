<template>
  <span class="badge" :class="{ yellow: yellow }">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  yellow: {
    type: Boolean,
    default: false,
  },

})


</script>

<style scoped lang="scss">
.badge {
  background: var(--gw-magenta);
  color: white;
  font-size: 10px;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: .5rem;
  margin-right: 4px;
  padding: 0 6px;
  font-weight: 500;
  text-transform: uppercase;

  &.yellow {
    background: var(--gw-yellow);
    color: var(--gw-blue-dark);
  }
}
</style>