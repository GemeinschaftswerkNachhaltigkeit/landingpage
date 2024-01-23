<template>
  <picture :class="{ contain: contain }">
    <source media="(orientation: landscape)" :srcset="getSrcSet(id, 'webp')" sizes="(min-width: 769px) 50vw,    
                                                              100vw" type="image/webp">
    <source media="(orientation: landscape)" :srcset="getSrcSet(id, 'jpg')" sizes="(min-width: 769px) 50vw,    
                                                              100vw" type="image/jpg">
    <source v-if="portraitId" media="(orientation: portrait)" :srcset="getSrcSet(portraitId, 'webp')" sizes="(min-width: 769px) 50vw,    
                                                              100vw" type="image/webp">
    <source v-if="portraitId" media="(orientation: portrait)" :srcset="getSrcSet(portraitId, 'jpg')" sizes="(min-width: 769px) 50vw,    
                                                              100vw" type="image/jpg">

    <img :src="$imageURL(id, { width: 1440, format: 'jpg', quality: 80 })" :alt="alt" loading="lazy" />
    <!-- src = fallback for browsers that don't support srcset and size attribute and webp format -->

  </picture>
</template>


<script setup>

const { $imageURL } = useNuxtApp();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
  portraitId: {
    type: String,
    default: ''
  },
  contain: {
    type: Boolean,
    default: false,
  },
})

function getSrcSet(id, type) {
  return (
    $imageURL(id, { width: 400, format: type }) +
    " 400w," +
    $imageURL(id, { width: 800, format: type }) +
    " 780w," +
    $imageURL(id, { width: 1024, format: type }) +
    " 1024w," +
    $imageURL(id, { width: 1440, format: type }) +
    " 1440w," +
    $imageURL(id, { width: 2400, format: type }) +
    " 2400w"
  );
}
</script>


<style scoped lang="scss">
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.contain {
  img {
    object-fit: contain;
  }
}
</style>