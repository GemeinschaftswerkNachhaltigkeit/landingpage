<template>
  <div class="tab" :class="{ active: active }">
    <slot />
    <button v-if="info" class="icon-button" @click.stop="$emit('showInfo')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path
          d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  active: {
    type: Boolean,
  },
  info: {
    type: Boolean,
  },
});
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
  display: flex;
  align-items: center;

  &.active {
    font-weight: bold;
    box-shadow: 0 -2px 0 0 var(--gw-magenta) inset;

    &:hover {
      box-shadow: 0 -2px 0 0 var(--gw-magenta) inset;
    }
  }

  button.icon-button {
    background-color: transparent;
    height: auto;
    padding-inline: 6px;
    display: flex;
    align-items: center;
    color: inherit;
  }
}
</style>
