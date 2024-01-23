<template>
  <div class="activity">
    <div class="image">
      <ContentSectionImage v-if="image" :alt="title + ' Bild'" :id="image" />
    </div>
    <div>
      <h3 v-if="title">{{
        title }}</h3>
    </div>
    <div class="html no-margin " v-if="content" v-html="content"></div>
    <div class="action" v-if="button"><button @click="handleActionClicked">{{ button }}</button></div>
    <div class="labeled-logos" v-if="showCooperations">
      <div class="label" v-if="logoLabel">{{ logoLabel }}</div>
      <div class="logos">
        <LinkedLogo width="auto" height="80px" v-for="logo in logos" :logo="logo">
        </LinkedLogo>
      </div>
    </div>
    <div class="labeled-logos" v-if="slider && showLogos">
      <div class="label" v-if="logoLabel">{{ sliderTitle }}</div>
      <div class="logos">
        <slot />
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
    default: false
  },
  sliderTitle: String,
  logoLabel: {
    type: String,
    default: ''
  },
  showLogos: {
    type: Boolean,
    default: true
  },
  showCooperations: {
    type: Boolean,
    default: true
  },
})

const emit = defineEmits(['action-clicked'])


function handleActionClicked() {
  emit('action-clicked')
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

  .image {
    height: 240px;
  }

  .action {
    margin-top: 16px;
    margin-bottom: 40px;
  }

  .labeled-logos {

    .label {
      margin-bottom: 1rem;
      font-weight: 700;
    }

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
