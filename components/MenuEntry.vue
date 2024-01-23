<template>
  <div class="menu-entry-wrapper accent-font" :class="{
    enforceUnderlineAlways: enforceUnderlineAlways,
    groupLine: groupLine,
    hideUnderlineAlways: hideUnderlineAlways,
    last: last,
    inFooter: inFooter
  }" @click="menuClicked">
    <Badge v-if="isNew">{{ $t('labels.new') }}</Badge>
    <a class="menu-entry" :class="{ isActive: isActive, blue: blue }" v-if="button">
      <slot />
    </a>
    <template v-else>
      <a v-if="external" class="menu-entry" :class="{ blue: blue }" :href="url">
        <slot />
      </a>
      <NuxtLink v-else class="menu-entry" :class="{ blue: blue }" :to="url">
        <slot />
      </NuxtLink>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  enforceUnderlineAlways: {
    type: Boolean,
    default: false,
  },
  inFooter: {
    type: Boolean,
    default: false,
  },
  groupLine: {
    type: Boolean,
    default: false,
  },
  hideUnderlineAlways: {
    type: Boolean,
    default: false,
  },
  last: {
    type: Boolean,
    default: false,
  },
  external: {
    type: Boolean,
    default: false,
  },
  button: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  blue: {
    type: Boolean,
    default: false,
  },
  isNew: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['menuClicked']);

function menuClicked() {
  emit('menuClicked');
}
</script>

<style lang="scss" scoped>
.menu-entry-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 0;
  width: 100%;


  .menu-entry {
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    position: relative;
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;

    &.isActive:after,
    &.router-link-active:after,
    &:hover:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.51em;
      background-color: var(--gw-yellow);
      z-index: -10;
      -webkit-transition: all 0.1s linear;
      -moz-transition: all 0.1s linear;
      transition: all 0.1s linear;
    }

    &.blue:after {
      background-color: var(--gw-blue-light);
    }
  }


  &.enforceUnderlineAlways:not(.last) {
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.12) inset;
  }

  &.groupLine {
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.12) inset;

    &.inFooter {
      box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.5) inset;
    }
  }

  &.hideUnderlineAlways:not(.last) {
    box-shadow: none;
  }
}

@media screen and (min-width: 1600px) {
  .menu-entry-wrapper {
    box-shadow: none;
    justify-content: flex-start;

    &.groupLine {
      box-shadow: none;

      &.inFooter {
        box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.5) inset;
      }
    }

  }


}
</style>