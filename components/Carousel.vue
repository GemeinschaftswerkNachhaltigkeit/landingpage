<template>
  <div class="carousel">

    <Flicking ref="flicking" :options="{
      circularFallback: 'bound', circular: true, align: 'center'
    }">
      <template>
        <div class="slide" v-for="item in items">
          <component v-bind:is="component" :organisation="item">
          </component>
        </div>

      </template>


    </Flicking>
    <div class="actions" v-if="items?.length">
      <button class="arrow-btn" @click="prev" :disabled="!enabledPrev">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_14507_6834" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18"
            height="18">
            <rect x="0.427734" y="0.428589" width="17.1429" height="17.1429" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_14507_6834)">
            <path
              d="M11.8557 16.1427L4.71289 8.99985L11.8557 1.85699L13.1236 3.12485L7.24861 8.99985L13.1236 14.8749L11.8557 16.1427Z"
              fill="white" />
          </g>
        </svg>
      </button>
      <button class="arrow-btn" @click="next" :disabled="!enabledNext">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_14507_6839" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18"
            height="18">
            <rect width="17.1429" height="17.1429" transform="matrix(-1 0 0 1 17.5723 0.428589)" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_14507_6839)">
            <path
              d="M6.14425 16.1427L13.2871 8.99985L6.14425 1.85699L4.8764 3.12485L10.7514 8.99985L4.8764 14.8749L6.14425 16.1427Z"
              fill="white" />
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    component: {
      type: String,
      required: true
    },

  },
  data() {
    return {
      enabledNext: true,
      enabledPrev: true
    }
  },
  methods: {
    next() {
      if (!this.$refs.flicking.animating) {
        const loop = this.$refs.flicking.circularEnabled;
        const index = this.$refs.flicking.index
        const count = this.$refs.flicking.panelCount
        this.enabledPrev = true;
        if (!loop && index + 2 >= count) {
          this.enabledNext = false
        }
        if (loop || index + 1 < count) {
          this.$refs.flicking.next();
        }
        console.log(this.$refs.flicking.currentPanel)
      }
    },
    prev() {
      if (!this.$refs.flicking.animating) {
        const loop = this.$refs.flicking.circularEnabled;
        const index = this.$refs.flicking.index
        this.enabledNext = true;
        if (!loop && index <= 1) {
          this.enabledPrev = false
        }
        if (loop || index > 0) {
          this.$refs.flicking.prev();
        }

      }
    },
  },
  mounted() {
    const loop = this.$refs.flicking.circularEnabled;
    const index = this.$refs.flicking.index
    const count = this.$refs.flicking.panelCount
    if (!loop && index + 1 >= count) {
      this.enabledNext = false
    }
    if (!loop && index <= 1) {
      this.enabledPrev = false
    }
  }
}
</script>

<style scoped lang="scss">
.carousel {
  width: 100%;
  padding-bottom: 46px;
  position: relative;
}

.slide {
  padding: 24px 12px;
  max-width: 350px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  .arrow-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--gw-blue-dark);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    padding: 0;

    &:hover {
      opacity: .5;
    }

    &:disabled {
      opacity: .3;
    }

  }


}

@media screen and (min-width: 650px) {
  .slide {
    max-width: 650px;
  }
}
</style>