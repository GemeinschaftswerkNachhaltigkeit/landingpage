<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="dialog-wrapper" :class="{ open: open }">
        <transition name="fade">
          <dialog
            open
            v-if="open"
            :class="{ fullScreen: fullScreen, dark: dark }"
          >
            <button
              class="close-button"
              :class="{ light: closeButtonLight }"
              @click="handleClose"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <div class="content">
              <slot />
            </div>
          </dialog>
        </transition>
        <div class="backdrop" v-if="open"></div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  closeButtonLight: {
    type: Boolean,
    default: false,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['popupClosed']);

function handleClose() {
  emit('popupClosed');
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-leave-from,
.fade-enter-to {
  transform: translateY(0px);
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(300px);
  opacity: 0;
}

.dialog-wrapper {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  inset: 0;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &.open {
    pointer-events: all;
  }

  dialog {
    max-height: 90vh;
    padding: 0;
    width: 100%;
    max-width: 600px;
    min-height: 200px;
    border: none;
    margin: 0 auto;
    position: relative;
    z-index: 30;

    .content {
      overflow: auto;
      height: 100%;
      max-height: 90vh;
    }

    &.fullScreen {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.8);
      inset: 0;
      max-height: none;
      max-width: none;
      min-height: none;
      height: 100%;

      .content {
        overflow: hidden;
        height: 100%;
        max-height: none;
        position: absolute;
        inset: 0;
      }
    }

    .close-button {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 20;
      padding: 1rem;
      background-color: transparent;
      color: var(--gw-blue-dark);

      &.light {
        color: white;
      }
    }
  }

  .backdrop {
    z-index: 10;
    position: fixed;
    inset: 0;
    background: var(--gw-blue-dark);
    opacity: 0.64;
  }
}
</style>
