<template>
  <div class="activity">
    <div class="image">
      <ContentSectionImage v-if="image" :alt="title + ' Bild'" :id="image" />
    </div>
    <div>
      <h3 v-if="title">{{ title }}</h3>
    </div>
    <div class="html no-margin" v-if="content" v-html="content"></div>
    <div class="action" v-if="button">
      <button @click="handleActionClicked">{{ button }}</button>
    </div>
    <div class="labeled-logos" v-if="showCooperations">
      <div class="label" v-if="logoLabel">{{ logoLabel }}</div>
      <div class="logos">
        <LinkedLogo
          width="auto"
          height="80px"
          v-for="logo in logos"
          :logo="logo"
        >
        </LinkedLogo>
      </div>
    </div>
    <div class="labeled-logos" v-if="slider && showLogos">
      <div class="label" v-if="logoLabel">{{ sliderTitle }}</div>
      <div class="logos">
        <slot />
      </div>
    </div>

    <div class="video-section" v-if="videoSectionActive">
      <div class="image">
        <ContentSectionImage
          v-if="videoSectionImage"
          :alt="videoSection.title + ' Bild'"
          :id="videoSectionImage"
        />
      </div>
      <div>
        <h3 v-if="videoSectionTitle">{{ videoSectionTitle }}</h3>
      </div>
      <div
        class="html no-margin"
        v-if="videoSectionContent"
        v-html="videoSectionContent"
      ></div>
      <div>
        <div class="label" v-if="videoSectionVideosTitle">
          {{ videoSectionVideosTitle }}
        </div>
        <div class="videos">
          <FocusTopicVideo
            v-for="video in videoSection"
            :title="video.title"
            :file="video.file"
            :image="video.image"
            :url="video.video_link"
            :modal="video.open_in_modal"
            :video="video.video"
            :subtitles="video.subtitles"
            @open-modal="() => handleOpenModal(video)"
          ></FocusTopicVideo>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
  image: String,
  logos: Array,
  button: String,
  slider: {
    type: Boolean,
    default: false,
  },
  sliderTitle: String,
  logoLabel: {
    type: String,
    default: '',
  },
  showLogos: {
    type: Boolean,
    default: true,
  },
  showCooperations: {
    type: Boolean,
    default: true,
  },
  videoSectionActive: {
    type: Boolean,
    default: false,
  },
  videoSectionVideosTitle: {
    type: String,
  },
  videoSectionImage: {
    type: String,
  },
  videoSectionTitle: {
    type: String,
  },
  videoSectionContent: {
    type: String,
  },
  videoSection: {
    type: Array,
    default: false,
  },
});

const emit = defineEmits(['action-clicked', 'open-video-modal']);

function handleActionClicked() {
  emit('action-clicked');
}

function handleOpenModal(video) {
  emit('open-video-modal', video);
}
</script>

<style scoped lang="scss">
.slider-wrapper {
  width: 100%;
  max-width: 100%;
}

.activity {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--light-gray);
  padding: 24px;

  .video-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .videos {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      align-content: stretch;
      gap: 16px;
    }
  }

  .image {
    height: 240px;
  }

  .action {
    margin-top: 16px;
    margin-bottom: 40px;
  }

  .label {
    margin-bottom: 1rem;
    font-weight: 700;
  }

  .labeled-logos {
    .logos {
      display: flex;
      background-color: white;
      padding: 1rem;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
}
</style>
