<template>
  <div class="circle" v-if="badgeImgId">
    <img :src="$imageURL(badgeImgId, { width: 64, height: 64 })" alt="badge" />
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
    <div class="image-wrapper"><img :src="$imageURL(imgId, { width: 600 })" :alt="alt" /></div>
    <div class="actions">
      <LinkButton :url="moreBtnUrl" color="yellow" @clicked="handleAddClicked">{{ moreBtn }}</LinkButton>
      <LinkButton v-if="linkBtn && linkBtnUrl" variant="outline" :url="linkBtnUrl" external>{{ linkBtn }}
      </LinkButton>


    </div>
  </div>
</template>

<script setup>
const { $imageURL } = useNuxtApp();

const props = defineProps({

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
})
const emit = defineEmits(['add-clicked'])

function handleAddClicked() {
  emit('add-clicked')
}

</script>

<style  lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
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
      align-items: center;
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
        line-height: 30px;
        text-align: center;
      }

      .summary {
        margin: 0;
        font-size: 14px;
        text-transform: uppercase;
        line-height: 21px;
        text-align: center;

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
