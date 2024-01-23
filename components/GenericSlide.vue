<template>
  <div class="slide" :key="item.id">
    <div class="slide-image" v-if="item.image"><img
        :src="$imageURL(item.image.id, { width: 320, format: 'png', quality: 80 })" :alt="item.alt || ''" />
    </div>

    <div class="body accent-font">
      <h4 v-if="item.title" class="title">{{ item.title }}</h4>
      <div v-if="item.content" class="content" v-html="item.content"></div>
      <span v-if="item.url && item.link_text" class="slide-link"> <a :href="item.url">{{
        item.link_text
      }}</a></span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object
  },
  alt: {
    type: String,
    default: ''
  },

})
</script>

<style lang="scss" scoped>
.slide {
  width: 100%;
  max-width: 226px;
  display: grid;
  flex-direction: column;
  gap: 16px;
  font-weight: 600;
  padding: 0 1rem;

  .body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 16px;

    .title {
      font-size: 1rem;
      background: none;
      line-height: 1.2rem;
      align-self: flex-start;

    }


    .slide-link {
      color: var(--gw-magenta);

      a {
        color: var(--gw-magenta);
      }
    }
  }

  .slide-image {
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;

    }
  }
}


@media screen and (min-width: 800px) {
  .slide {
    max-width: 427px;
  }
}
</style>