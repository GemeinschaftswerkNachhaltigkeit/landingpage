<template>
  <div class="dropdown-menu" v-click-outside="handleOutsideClick">
    <div class="menu-toggle" @click="openMenu">
      <MenuEntry :isNew="isNew" :url="'/about'" button :isActive="open || isActive" hideUnderlineAlways>{{ title }}
      </MenuEntry>
      <div class="icon" :class="{ open: open }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_3602_13984" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
            height="24">
            <rect y="24" width="24" height="24" transform="rotate(-90 0 24)" fill="#D9D9D9" />
          </mask>
          <g>
            <path
              d="M22.3516 8.03516L12.3516 18.0352L2.35156 8.03516L4.12656 6.26016L12.3516 14.4852L20.5766 6.26016L22.3516 8.03516Z"
              fill="#19486A" />
          </g>
        </svg>
      </div>
    </div>

    <div v-if="open" class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="js">
import Expander from "../Expander.vue";
import MenuEntry from "./MenuEntry.vue";
export default {
  components: { Expander, MenuEntry },
  props: {
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
  },

  methods: {
    handleOutsideClick() {
      this.$emit("closeMenu")
    },
    openMenu() {
      this.$emit("openMenu")
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  position: relative;

  .menu-toggle {
    display: flex;
    align-items: center;
    gap: .5rem;

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
    position: absolute;
    z-index: 0;
    left: 0;
    padding: 0 16px;
    box-shadow: 0 5px 5px -3px #0003, 0 8px 10px 1px #00000024,
      0 3px 14px 2px #0000001f;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>