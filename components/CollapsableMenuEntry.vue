<template>
  <div class="accordion-entry">
    <div class="header" @click="toggle">
      <MenuEntry :isNew="isNew" button :isActive="show || isActive" hideUnderlineAlways>{{ title }}</MenuEntry>
      <div class="icon" :class="{ open: show }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

          <path
            d="M22.3516 8.03516L12.3516 18.0352L2.35156 8.03516L4.12656 6.26016L12.3516 14.4852L20.5766 6.26016L22.3516 8.03516Z"
            fill="#19486A" />
        </svg>
      </div>
    </div>

    <expander :show="show">
      <div class="content">
        <slot />
      </div>
    </expander>
  </div>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isNew: {
    type: Boolean,
    default: false
  }
});

const show = ref(props.open);

function toggle() {
  show.value = !show.value;
}
</script>

<style lang="scss" scoped>
.accordion-entry {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.12) inset;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(0deg) scale(0.8);
      transform-origin: center;
      transition: transform 300ms;

      &.open {
        transform: rotate(-180deg) scale(0.8);
      }
    }
  }

  .content {
    background: white;
    margin-left: 32px;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>