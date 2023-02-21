<template>

  <div @click="handleClick">
    <a v-if="external" class="button" :class="[color, variant]" :href="url" target="_blank">
      <slot />
    </a>
    <NuxtLink v-else class="button" :class="[color, variant]" :to="localePath(url)">
      <slot />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      open: true,
    }
  },
  props: {
    external: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'magenta'
    },
    variant: {
      type: String,
      default: 'solid'
    }
  },

  methods: {
    handleClick() {
      this.$emit('clicked')
    }
  }

}</script>

<style scoped lang="scss">
.button {
  &.solid {
    &.magenta {
      background: var(--gw-magenta);
      color: white;
    }

    &.yellow {
      background: var(--gw-yellow);
      color: var(--gw-blue-dark);
    }

    &.blue {
      background: var(--gw-blue-dark);
      color: white;
    }
  }


  &.outline {
    background: transparent;
    box-shadow: 0 0 0 1px var(--light-gray) inset;

    &.magenta {
      color: var(--gw-magenta);
    }

    &.blue {

      color: var(--gw-blue-dark);
    }

    &.yellow {
      color: var(--gw-yellow);
    }
  }
}
</style>