<template>
  <div class="content-section-wrapper content-with-image">
    <columns-section :cols="2">
      <template v-slot:column-1>
        <div>
          <p class="tagline" v-if="tagline">{{ tagline }}</p>
          <div class="title">
            <h1>{{ title }}</h1>
          </div>
          <div class="content" v-html="content"></div>
          <slot />
        </div>
      </template>
      <template v-slot:column-2>
        <div class="image-wrapper">
          <content-section-image :contain="true" :id="image" :alt="alt"></content-section-image>
        </div>
      </template>
    </columns-section>
  </div>
</template>

<style lang="scss" scoped>
.content-with-image {
  flex-grow: 1;
  position: relative;
}

.title {
  margin: 0;
  margin-bottom: 24px;
}

.tagline {
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 24px;

}

@media screen and (min-width: 769px) {
  .image-wrapper {
    margin-top: 0;
  }
}
</style>

<script>
import ContentSectionImage from "./ContentSectionImage.vue";
export default {
  components: { ContentSectionImage },
  props: {
    title: {
      type: String,
      default: "",
    },
    tagline: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
  },
};
</script>

