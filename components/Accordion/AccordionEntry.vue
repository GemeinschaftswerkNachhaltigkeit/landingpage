<template>
    <div class="accordion-entry">
      <div class="header" @click="toggle">
        <div>{{title}}</div>
        <div class="icon" :class="{open: show}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_3602_13984" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect y="24" width="24" height="24" transform="rotate(-90 0 24)" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_3602_13984)">
          <path d="M22.3516 8.03516L12.3516 18.0352L2.35156 8.03516L4.12656 6.26016L12.3516 14.4852L20.5766 6.26016L22.3516 8.03516Z" fill="#19486A"/>
          </g>
          </svg>
        </div>
      </div>
      
      <expander :show="show">
        <div class="content" v-html="content"></div>
      </expander>
    </div>
</template>

<script lang="js">
import Expander from "../Expander.vue";
export default {
  components: { Expander },
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
  },
  data() {
    return {
      show: this.open,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion-entry {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    padding: 0 34px;
    background: var(--gw-blue-light);
    font-weight: bold;
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
    padding: 0 34px;
    border: 2px solid var(--gw-blue-light);
    background: white;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>