<template>
  <div @click="handleClick" class="accent-font">
    <a
      v-if="external"
      class="button"
      :class="[color, variant, size]"
      :href="url"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
        v-if="icon === 'map'"
      >
        <path
          d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
        />
      </svg>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-else
      >
        <mask
          id="mask0_14523_8886"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="currentColor" />
        </mask>
        <g mask="url(#mask0_14523_8886)">
          <path
            d="M5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H12V5H5V19H19V12H21V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5ZM9.7 15.7L8.3 14.3L17.6 5H14V3H21V10H19V6.4L9.7 15.7Z"
            fill="currentColor"
          />
        </g>
      </svg>

      <span>
        <slot />
      </span>
    </a>
    <NuxtLink
      v-else
      class="button"
      :class="[color, variant]"
      :to="localePath(url)"
    >
      <slot />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      open: true,
    };
  },
  props: {
    size: {
      type: String,
      default: '',
    },
    external: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'magenta',
    },
    variant: {
      type: String,
      default: 'solid',
    },
  },

  methods: {
    handleClick() {
      this.$emit('clicked');
    },
  },
};
</script>

<style scoped lang="scss">
a.button {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0 32px;

  &.lg {
    padding: 2px 32px;
    font-size: 1rem;

    svg {
      transform: scale(1.3);
      margin-right: 0.6rem;
    }
  }

  &.xl {
    padding: 6px 32px;
    font-size: 1.3rem;

    svg {
      transform: scale(1.2);
      margin-right: 0.6rem;
    }
  }

  @media screen and (min-width: 600px) {
    &.lg {
      padding: 8px 32px;
      font-size: 1.2rem;

      svg {
        transform: scale(1.3);
        margin-right: 1rem;
      }
    }

    &.xl {
      padding: 16px 32px;
      font-size: 2rem;

      svg {
        transform: scale(1.8);
        margin-right: 1rem;
      }
    }
  }

  &.solid {
    &.magenta {
      background: var(--gw-magenta);
      color: white;
    }

    &.yellow {
      background: var(--gw-yellow);
      color: var(--gw-blue-dark);
    }

    &.orange {
      background: var(--gw-orange);
      color: white;
    }

    &.white {
      background: white;
      color: var(--gw-magenta);
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

    &.orange {
      color: var(--gw-orange);
    }
  }
}
</style>
