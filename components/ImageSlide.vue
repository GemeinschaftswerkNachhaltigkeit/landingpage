<template>
  <div class="card">
    <div v-if="item?.copyright" class="copyright">{{ item?.copyright }}</div>
    <img :src="$imageURL(item.image, { width: 300, format: 'png', quality: 80 })" :alt="item?.alt || 'Slider Image'" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { t } = useI18n();
const { $i18n } = useNuxtApp();
const { $imageURL } = useNuxtApp();


const props = defineProps({
  item: {
    type: Object
  }
})

</script>

<style lang="scss" scoped>
$card-height: 300px;
$text-color: var(--gw-blue-dark);

.card {
  margin: 24px 12px;
  position: relative;
  width: 300px;
  aspect-ratio: 3/2;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, .12);


  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: block;
  }

  .copyright {
    z-index: 10;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: .1rem .3rem;
    text-align: right;
    font-size: .8rem;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, .4));
    color: white;
  }
}
</style>
