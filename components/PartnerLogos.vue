<template>
  <div class="logos-wrapper">
    <div>
      <h2 class="title" v-if="title">{{ title }}</h2>
    </div>
    <div class="logos">
      <PartnerLogo
        v-for="logo in logos"
        :logo="logo"
        :key="logo.id"
        :alt="logo.alt || ''"
      ></PartnerLogo>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  logos: {
    type: Array,
    default: [],
  },
  files: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="scss" scoped>
.logos-wrapper {
  width: 100%;
  display: grid;
  gap: 24px;
  grid-auto-rows: min-content;

  .title {
    margin: 0;
  }

  .logos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    gap: 24px;

    .logo {
      height: 150px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
}
</style>
