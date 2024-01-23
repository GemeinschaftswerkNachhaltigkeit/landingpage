<template>
  <section class="column-section" :style="{ 'grid-template-columns': `repeat(auto-fit, minmax(${columnWidth}, 1fr))` }">
    <template v-for="column in columns">
      <slot :name="'column-' + column"></slot>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.column-section {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 0;
}

@media screen and (min-width: 769px) {
  .column-section {
    width: 100%;
    display: grid;
  }
}
</style>


<script setup>

const props = defineProps({
  cols: {
    type: Number,
    default: 2,
  },
  colWidth: {
    type: String,
    require: false,
  },
})

const columnWidth = computed(() => { return props.colWidth ? props.colWidth : props.cols * 100 + "px"; })
const columns = computed(() => { return Array.from(Array(props.cols).keys()).map((k) => k + 1); })



</script>

