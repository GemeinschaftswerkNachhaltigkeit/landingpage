<template>
  <div class="project" :key="item.id">
    <div class="project-image">
      <img
        :src="
          $imageURL(item.image, { width: 320, format: 'webp', quality: 80 })
        "
        :alt="item.alt || ''"
      />
    </div>

    <div class="body accent-font">
      <div class="title">{{ item.title }}</div>
      <span class="project-link"
        ><span v-if="item.link_prefix">{{ item.link_prefix }}</span>
        <a :href="item.url">{{ item.link_title }}</a></span
      >
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
  },
  alt: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.project {
  max-width: 230px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  font-weight: 600;
  // padding: 1rem;

  .body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 10px;

    .title {
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
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
      border: 10px solid white;
    }
  }
}

@media screen and (min-width: 800px) {
  .project {
    max-width: 420px;
  }
}
</style>
