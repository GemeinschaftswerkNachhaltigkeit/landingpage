<template>
  <div ref="carousel" class="carousel" :class="{ noTopPadding: noTopPadding }" @mouseover="hover = true"
    @mouseleave="hover = false">
    <Flicking ref="flicking" :options="{
      circularFallback: 'bound', circular: true, align: 'center'
    }">
      <div class="slide" v-for="(item, index) in items" :key="item.id">
        <component :is="component" v-bind="getProps(item)">
        </component>
      </div>



    </Flicking>
    <div class="actions" :class="{ actionsRight: actionsRight, 'framedCards': framedCards }" v-if="items?.length > 1">
      <button class="arrow-btn" @click="prev">
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
      <button class="arrow-btn" @click="next">
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
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Flicking from "@egjs/vue3-flicking";

const flicking = ref(null)
const interval = ref(null);
const hover = ref(false);
const carousel = ref(null);

const props = defineProps({
  items: {
    type: Array,
    default: []
  },
  itemKey: {
    type: String,
    default: 'item'
  },
  component: {
    type: Object,
    required: true
  },
  intervalTime: {
    type: Number,
    default: null
  },
  actionsRight: {
    type: Boolean,
    default: false
  },
  framedCards: {
    type: Boolean,
    default: false
  },
  noTopPadding: {
    type: Boolean,
    default: false
  }

})

function getProps(item) {
  return { [props.itemKey]: item }
}
async function next() {
  try {
    await flicking.value.next();
  } catch (error) {
    console.log('no next slide')
  }
}
async function prev() {

  try {

    await flicking.value.prev();
  } catch (error) {
    console.log('no previous slide')
  }

}

onMounted(() => {
  const ref = flicking.value;

  if (props.intervalTime) {
    interval.value = setInterval(() => {
      const hovered = hover.value;
      if (ref && ref.circularEnabled && !hovered) {
        next()
      }
    }, props.intervalTime)
  }

  /**
   * Hack to make the slider work in all situations
   */
  const w = carousel.value.clientWidth;
  setTimeout(() => {
    carousel.value.style.width = (w + 1) + 'px'
  }, 100)
  setTimeout(() => {
    carousel.value.style.width = '100%';
  }, 400)

})

onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})
</script>

<style scoped lang="scss">
.carousel {
  width: 100%;
  position: relative;
  padding: 2rem 0;

  &.noTopPadding {
    padding-top: 0;
  }
}

.slide {
  /* padding: 24px 12px; */
  max-width: 350px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  &.framedCards {
    bottom: 4px;
  }

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

@media screen and (min-width: 800px) {
  .actions {
    &.actionsRight {
      left: auto;
      right: 32px;
      transform: translateX(0);
    }
  }
}

@media screen and (min-width: 650px) {
  .slide {
    max-width: 650px;
  }
}
</style>