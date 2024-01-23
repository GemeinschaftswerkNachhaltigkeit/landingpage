<template>
  <div class="content-section-wrapper content-with-video">
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
        <div class="video-wrapper" :class="{ swapped: mobileSwapped }">
          <SimpleVideo :video="video" :image="image"></SimpleVideo>
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
  video: {
    type: String,
    default: "",
  },
  mobileSwapped: {
    type: Boolean,
    default: true
  }
})

</script>


<style lang="scss" scoped>
.content-with-video {
  flex-grow: 1;
  position: relative;


}

.video-wrapper {
  aspect-ratio: 16/9;
  max-width: 100%;

  .yt-link {
    font-size: 10px;
    line-height: 16px;
  }
}

video {
  height: 100%;
  width: 100%;
  object-fit: cover;
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

.video-wrapper {
  position: relative;
}

.video-wrapper.swapped {
  order: -1;
}



@media screen and (min-width: 769px) {


  .video-wrapper {
    margin-top: 0;

    &.swapped {
      order: 0;
    }
  }

}
</style>