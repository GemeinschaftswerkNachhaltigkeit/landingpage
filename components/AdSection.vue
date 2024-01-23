<template>
  <article class="add" :style="{ '--brand-color': data.brand_color }">
    <div class="badge" v-if="data.badge_image">
      <img :src="$imageURL(data.badge_image, { width: 64, height: 64 })" alt="badge" />
    </div>

    <div class="image">
      <ContentSectionImage :id="data.image" :alt="data.alt || ''"></ContentSectionImage>
    </div>
    <div class="content-wrapper" :class="data.color_scheme">

      <div class="content">
        <p v-if="data.tagline" class="tagline accent-font">{{ data.tagline }}</p>
        <h2 class="title">{{ data.title }}</h2>
        <div v-html="data.summary" class="summary html"></div>
      </div>
      <div class="actions">
        <LinkButton v-if="data.more_button_text && data.more_button_url" :color="buttonColor" :url="data.more_button_url">
          {{ data.more_button_text }}</LinkButton>
        <LinkButton external color="white" v-if="data.external_link_text && data.external_link_url"
          :url="data.external_link_url">{{
            data.external_link_text }}
        </LinkButton>
      </div>
    </div>
  </article>
</template>

<script setup>
import ContentSectionImage from './ContentSectionImage.vue';
import LinkButton from './LinkButton.vue';
const { $imageURL } = useNuxtApp();

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const buttonColor = computed(() => {
  switch (props.data.color_scheme) {
    case "default":
      return "yellow"
    case "dan":
      return "orange"
    default:
      return "blue"
  }
})

</script>

<style lang="scss" scoped>
.add {
  position: relative;
  margin: 0;
  width: 100%;
  max-width: 500px;

  .badge {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    transform: translate(0%, -50%);
    width: 48px;
    height: 48px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 24px 16px;
    height: 100%;

    &.default {
      background-color: var(--gw-magenta);
      color: white;
    }

    &.dan {
      background-color: var(--gw-blue-light);
      color: var(--gw-blue-dark);
    }

    .content {
      position: relative;



      .tagline {
        margin: 0 0 32px;
      }

      .title {
        margin-bottom: 16px;
        background: none;
        display: block;
      }



    }

    .actions {
      margin-top: 40px;
      display: block;
      display: grid;
      gap: 8px;
    }
  }

}

@media screen and (min-width: 700px) {
  .add {
    .badge {
      width: 120px;
      height: 120px;
      transform: translate(-50%, -50%);
    }
  }
}

@media screen and (min-width: 1300px) {



  .add {
    --brand-color: #ddd;
    width: 1150px;
    max-width: none;

    .image {
      position: absolute;
      right: 16px;
      top: 111px;
      width: 539px;
      height: 493px;
      z-index: 1;

      &::after {
        content: '';
        z-index: -1;
        position: absolute;
        top: 33px;
        left: 33px;
        right: -16px;
        bottom: -16px;
        background-color: var(--brand-color);
      }
    }

    .content-wrapper {
      min-height: 503px;
      max-width: 650px;
      padding: 80px 100px 40px 40px;

      .actions {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>