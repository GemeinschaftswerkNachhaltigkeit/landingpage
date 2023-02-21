<template>
  <section 
  class="column-section" 
  :style="{'grid-template-columns': `repeat(auto-fit, minmax(${columnWidth}, 1fr))`}">
    <template v-for="column in columns">
      <slot :name="'column-' + column"></slot>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.column-section {
  display: block;
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


<script>
export default {
  props: {
    cols: {
      type: Number,
      default: 2,
    },
    colWidth: {
      type: String,
      require: false,
    },
  },
  computed: {
    columnWidth() {
      return this.colWidth ? this.colWidth : this.cols * 100 + "px";
    },
    columns() {
      return Array.from(Array(this.cols).keys()).map((k) => k + 1);
    },
  },
  methods: {
    getColumnClass(index) {
      return this.columnClasses[index];
    },
  },
};
</script>

