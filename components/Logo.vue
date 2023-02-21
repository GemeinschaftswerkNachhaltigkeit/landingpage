<template>
  <div class="logo" :style="{width: width + 'px'}">
    <NuxtLink :to="localePath('index')" title="Home" :id="id" class="logo">
      <img :src="logoSrc" alt="Logo" loading="eager" />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
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
    bg: {
      type: String,
      required: false,
    },
    width: {
      type: Number,
      default: 140,
    },
  },
  computed: {
    logoSrc() {
      if (this.bg === undefined) {
        return `${require(`~/assets/img/logo_${this.$i18n.locale}.svg`)}`;
      } else {
        return `${require(`~/assets/img/logo_${this.$i18n.locale}_${this.bg}.svg`)}`;
      }
    },
  },
};
</script>
