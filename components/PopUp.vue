<template>
  <div class="dialog-wrapper" :class="{ open: open }">
    <transition name="fade">
      <dialog open v-if="open">
        <button class="close-button" @click="handleClose">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
              fill="white" />
          </svg>
        </button>
        <div class="circle" v-if="badgeImgId">
          <img :src="this.$imageURL(badgeImgId, { width: 64, height: 64 })" alt="badge" />
        </div>
        <header>
          <Badge v-if="isNew" yellow>{{ $t('labels.new') }}</Badge>
          <h2 class="title">
            {{ title }}
          </h2>
          <div class="summary" v-html="summary">

          </div>
        </header>
        <div class="body">
          <div class="image-wrapper"><img :src="this.$imageURL(imgId, { width: 600 })" :alt="alt" /></div>
          <div class="actions">
            <LinkButton :url="moreBtnUrl" color="yellow" @clicked="handleClose">{{ moreBtnUrl }}</LinkButton>
            <LinkButton v-if="linkBtn && linkBtnUrl" variant="outline" :url="linkBtnUrl" external>{{ linkBtn }}
            </LinkButton>


          </div>
        </div>
      </dialog>
    </transition>
    <div class="backdrop" v-if="open"></div>
  </div>
</template>

<script>
const DISABLE_POPUP_TIME = 'disable-popup-time';
const ONE_DAY = 24 * 60 * 60 * 1000 //h * min * sec * milliSec 
const DAYS_CLOSED = 14;
export default {
  data: () => {
    return {
      open: false,
      timout: null
    }
  },
  props: {
    openAfter: {
      type: Number,
      default: 0
    },
    imgId: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    badgeImgId: {
      type: String,
      default: ''
    },
    isNew: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    moreBtn: {
      type: String,
      default: ''
    },
    moreBtnUrl: {
      type: String,
      default: ''
    },
    linkBtn: {
      type: String,
      default: ''
    },
    linkBtnUrl: {
      type: String,
      default: ''
    },
  },
  methods: {
    handleClose() {
      this.open = false;
      const closeTime = new Date().getTime();
      const disablePopUpTime = localStorage.getItem(DISABLE_POPUP_TIME);
      if (!disablePopUpTime) {
        localStorage.setItem(DISABLE_POPUP_TIME, closeTime + (ONE_DAY * DAYS_CLOSED))
      }
    },
    handleOpen() {
      const openAfterInMs = this.openAfter * 1000;
      const currentTime = new Date().getTime();
      const disablePopUpTime = localStorage.getItem(DISABLE_POPUP_TIME);
      if (disablePopUpTime) {
        if (disablePopUpTime > currentTime) {
          return;
        }
      }
      localStorage.removeItem(DISABLE_POPUP_TIME);
      this.timeout = setTimeout(() => {
        this.open = true;
      }, openAfterInMs);
    }
  },
  mounted() {
    this.handleOpen();


  },
  beforeDestroy() {
    clearTimeout(this.timout);
  }

}

</script>

<style  lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

.fade-leave,
.fade-enter-to {
  transform: translateY(0px);
  opacity: 1;
}

.fade-enter,
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
    padding: 0;
    width: 100%;
    max-width: 600px;
    min-height: 200px;
    border: none;
    margin: 0 auto;
    position: relative;
    z-index: 30;

    .close-button {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 20;
      padding: 1rem;
    }



    header {
      position: relative;
      display: flex;
      flex-direction: column;
      box-shadow: none;
      background: var(--gw-magenta);
      z-index: 0;
      color: white;
      height: auto;
      padding: 40px;
      gap: 4px;

      .title {
        margin: 0;
        background: none;
        font-size: 20px;
        line-height: 30px
      }

      .summary {
        margin: 0;
        font-size: 14px;
        text-transform: uppercase;
        line-height: 21px;

        p {
          margin: 0;
        }
      }
    }

    .circle {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .text .char {
      position: absolute;
      top: 0%;
      left: 50%;
      font-size: .7rem;
      transform-origin: 0 40px;

    }


  }

  .actions {
    padding: 24px;
    display: grid;
    gap: 16px;


  }

  .image-wrapper {
    height: 212px;
    width: 100%;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .backdrop {
    z-index: 10;
    position: fixed;
    inset: 0;
    background: var(--gw-blue-dark);
    opacity: .64;
  }
}
</style>
