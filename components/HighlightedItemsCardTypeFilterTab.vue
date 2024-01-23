<template>
  <div class="tab" :class="{ active: active }">
    <slot />
  </div>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  active: {
    type: Boolean
  }
})

</script>

<style lang="scss" scoped>
.tab {
  font-size: 16px;
  line-height: 22px;
  border: none;
  color: var(--gw-blue-dark);
  background-color: transparent;
  padding: 12px 24px;
  box-shadow: 0 -2px 0 0 var(--light-gray2);
  cursor: pointer;
  font-weight: normal;

  &.active {
    font-weight: bold;
    box-shadow: 0 -2px 0 0 var(--gw-magenta) inset;

    &:hover {
      box-shadow: 0 -2px 0 0 var(--gw-magenta) inset;
    }
  }
}
</style>