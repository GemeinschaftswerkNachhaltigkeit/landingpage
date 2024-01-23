<template>
  <div class="logo-wrapper" :key="logo.url">
    <a class="logo" :href="logo.url" target="_blank">
      <img :src="$imageURL(logo.logo, { width: 150, format: 'png', quality: 80 })" :alt="alt" />
    </a>
  </div>
</template>

<script setup>
const { $imageURL } = useNuxtApp();

defineProps({
  logo: {
    type: Object
  },
  alt: {
    type: String,
    default: 'partner logo'
  },
})

</script>

<style lang="scss" scoped>
.logo-wrapper {
  padding: 0 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 200px;
  height: 100%;
}

.logo {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
}
</style>