<template>
  <div class="content-section-wrapper content-with-image">
    <columns-section :cols="2">
      <template v-slot:column-1>
        <div>
          <p class="tagline accent-font" v-if="tagline">{{ tagline }}</p>
          <div class="title">
            <h1>{{ title }}</h1>
          </div>
          <div class="content" v-html="content"></div>
          <slot />
        </div>
      </template>
      <template v-slot:column-2>
        <div class="image-wrapper" :class="{ mobileSwapped: mobileSwapped, swapped: swapped }">

          <content-section-image :contain="true" :id="image" :alt="alt"></content-section-image>
          <slot name="imageExt" />
        </div>
      </template>
    </columns-section>
  </div>
</template>



<script setup>

defineProps({
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
  mobileSwapped: {
    type: Boolean,
    default: true
  },
  swapped: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
.content-with-image {
  flex-grow: 1;
  position: relative;
}

.title {
  margin: 0;
  margin-bottom: 24px;
  position: relative;
  z-index: 9;
}

.tagline {
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 24px;

}

.image-wrapper {
  position: relative;
}

.image-wrapper.mobileSwapped {
  order: -1;
}

@media screen and (min-width: 769px) {


  .image-wrapper {
    margin-top: 0;

    &.mobileSwapped {
      order: 0;
    }

    &.swapped {
      order: -1;
    }
  }

}
</style>