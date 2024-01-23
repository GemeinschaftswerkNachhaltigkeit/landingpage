<template>
  <LinkedLogo :logo="logo"></LinkedLogo>
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
.logo {}
</style>