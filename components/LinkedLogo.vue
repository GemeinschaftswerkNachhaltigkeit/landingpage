<template>
  <div class="logo-wrapper" :key="logo.id" :style="{ 'width': width, height: height }">
    <a v-if="logo.url" class="logo" :href="logo.url" target="_blank">
      <img :src="$imageURL(logo.logo, { width: 150, format: 'png', quality: 80 })" :alt="alt" />
    </a>
    <div v-else="logo.url" class="logo" :href="logo.url" target="_blank">
      <img :src="$imageURL(logo.logo, { width: 150, format: 'png', quality: 80 })" :alt="alt" />
    </div>
    <div class="video-icon" v-if="logo.icon">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
          d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
          fill="currentColor" />
      </svg>
    </div>
  </div>
</template>

<script setup>
const { $imageURL } = useNuxtApp();

defineProps({
  logo: {
    type: Object
  },
  width: {
    type: String,
    value: "100%"
  },
  height: {
    type: String,
    value: "100%"
  },
  alt: {
    type: String,
    default: 'partner logo'
  },
})

</script>

<style lang="scss" scoped>
.logo-wrapper {
  position: relative;

  .logo {
    height: 100%;
    width: 100%;


    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .video-icon {
    position: absolute;
    right: 4px;
    bottom: 4px;
    color: white;
    display: flex;
    align-items: center;
  }
}
</style>