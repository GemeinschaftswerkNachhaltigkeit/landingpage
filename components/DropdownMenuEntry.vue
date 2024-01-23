<template>
  <div class="dropdown-menu" v-click-outside="handleOutsideClick">
    <div class="menu-toggle" @click="openMenu">
      <MenuEntry :isNew="isNew" :url="'/about'" button :isActive="open || isActive" hideUnderlineAlways>{{ title }}
      </MenuEntry>
      <div class="icon" :class="{ open: open }">

        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24">
          <path d="M480 711 240 471l56-56 184 184 184-184 56 56-240 240Z" fill="currentColor" />
        </svg>
      </div>
    </div>

    <div v-if="open" class="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useClickOutside } from '../composables/clickoutside'
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

const vClickOutside = useClickOutside();

const emit = defineEmits(['closeMenu', 'openMenu']);

function handleOutsideClick() {
  emit('closeMenu');
}
function openMenu() {
  emit('openMenu');
}
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
      transform: rotate(0deg);
      transform-origin: center;
      transition: transform 300ms;

      &.open {
        transform: rotate(-180deg);
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