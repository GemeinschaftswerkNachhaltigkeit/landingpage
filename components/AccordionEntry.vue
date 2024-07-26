<template>
  <div class="accordion-entry">
    <div class="header accent-font" :class="color" @click="toggle">
      <div>
        <span class="title">{{ title }}</span>
        <span v-if="subtitle"> - {{ subtitle }}</span>
      </div>
      <div class="icon" :class="{ open: show }">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.3516 8.03516L12.3516 18.0352L2.35156 8.03516L4.12656 6.26016L12.3516 14.4852L20.5766 6.26016L22.3516 8.03516Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>

    <expander :show="show">
      <div class="content" :class="color">
        <div class="html" v-html="content"></div>
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
  color: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
});

const show = ref(props.open);

function toggle() {
  show.value = !show.value;
}
</script>

<style lang="scss" scoped>
.accordion-entry {
  width: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 72px;
    padding: 20px 34px;
    background: var(--gw-blue-light);

    &.yellow {
      background: var(--gw-yellow);
    }

    &.orange {
      background: var(--gw-orange);
      color: white;
    }

    .title {
      font-weight: bold;
      text-transform: uppercase;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(0deg);
      transform-origin: center;
      transition: transform 300ms;

      &.open {
        transform: rotate(-180deg);
      }
    }
  }

  .content {
    padding: 0 34px 12px 34px;

    border: 2px solid var(--gw-blue-light);
    background: white;

    .html {
      padding-top: 24px;
      display: flow-root;
    }

    &.yellow {
      border: 2px solid var(--gw-yellow);
    }

    &.orange {
      border: 2px solid var(--gw-orange);
    }
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
