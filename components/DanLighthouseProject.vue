<template>
  <div class="project" :key="item.id">
    <div class="project-image"><img :src="$imageURL(item.image, { width: 320, format: 'png', quality: 80 })"
        :alt="item.alt || ''" />
    </div>

    <div class="body accent-font">
      <div class="title">{{ item.title }}</div>
      <span class="project-link"><span v-if="item.link_prefix">{{ item.link_prefix }}</span> <a :href="item.url">{{
        item.link_title
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
.project {
  width: 100%;
  max-width: 226px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding-bottom: 40px;
  font-weight: 600;
  padding: 1rem;


  .body {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .title {
      display: inline;

    }




    .project-link {
      color: var(--gw-magenta);

      a {
        color: var(--gw-magenta);
      }
    }
  }

  .project-image {
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
  .project {
    max-width: 420px;
  }
}
</style>