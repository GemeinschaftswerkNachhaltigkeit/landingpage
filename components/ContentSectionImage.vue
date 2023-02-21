<template>
  <picture :class="{contain: contain}">
    <source :srcset="getSrcSet('webp')"
          sizes="(min-width: 769px) 50vw,    
                100vw"
          type="image/webp">
    <source :srcset="getSrcSet('png')"
          sizes="(min-width: 769px) 50vw,    
                100vw"
          type="image/png">
    <img :src="$imageURL(id, {width: 1440, format:'png', quality: 80})" :alt="alt"/>
    <!-- src = fallback for browsers that don't support srcset and size attribute and webp format -->
  </picture>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.contain {
  img {
    object-fit: contain;
  }
}
</style>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
    contain: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getSrcSet(type) {
      return (
        this.$imageURL(this.id, { width: 400, format: type }) +
        " 400w," +
        this.$imageURL(this.id, { width: 800, format: type }) +
        " 780w," +
        this.$imageURL(this.id, { width: 1024, format: type }) +
        " 1024w," +
        this.$imageURL(this.id, { width: 1440, format: type }) +
        " 1440w," +
        this.$imageURL(this.id, { width: 2400, format: type }) +
        " 2400w"
      );
    },
  },
};
</script>