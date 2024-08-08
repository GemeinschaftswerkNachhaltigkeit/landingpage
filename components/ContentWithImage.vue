<template>
  <div class="content-section-wrapper content-with-image">
    <columns-section :cols="2">
      <template v-slot:column-1>
        <div>
          <p class="tagline accent-font" v-if="tagline">{{ tagline }}</p>
          <div class="title">
            <h1 class="title-content" id="main-title">
              {{ title }}
            </h1>
            <img
              v-if="badge"
              class="title-badge"
              :src="
                $imageURL(badge, {
                  width: 160,
                  format: 'webp',
                  quality: 80,
                })
              "
              :alt="alt"
              loading="lazy"
            />
          </div>
          <div class="content" v-html="content"></div>
          <slot />
        </div>
      </template>
      <template v-slot:column-2>
        <div
          class="image-wrapper"
          :class="{ mobileSwapped: mobileSwapped, swapped: swapped }"
        >
          <content-section-image
            :contain="true"
            :id="image"
            :alt="alt"
          ></content-section-image>
          <slot name="imageExt" />
        </div>
      </template>
    </columns-section>
  </div>
</template>

<script setup>
const { $imageURL } = useNuxtApp();

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  badge: {
    type: String,
    default: '',
  },
  tagline: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  mobileSwapped: {
    type: Boolean,
    default: true,
  },
  swapped: {
    type: Boolean,
    default: false,
  },
});

function hasBadge() {
  return !!props.badge;
}

function positionBadge() {
  const mainTitle = document.querySelector('#main-title');
  const badge = document.querySelector('.title-badge');
  const dimensions = mainTitle.getBoundingClientRect();
  const badgeDimensions = badge.getBoundingClientRect();
  badge.style.left = `${dimensions.width - badgeDimensions.width / 4}px`;
  badge.style.top = `${-badgeDimensions.height / 2}px`;
  badge.style.opacity = 1;
}

onMounted(() => {
  if (hasBadge()) {
    setTimeout(positionBadge, 0);
    window.addEventListener('resize', positionBadge);
  }
});
</script>

<style lang="scss" scoped>
.content-with-image {
  flex-grow: 1;
  position: relative;
}

.title {
  margin: 0;
  margin-bottom: 24px;
  z-index: 9;
  width: fit-content;
  position: relative;
}

.title-content {
  position: relative;
  z-index: 1;
}

.title-badge {
  width: 80px;
  height: auto;
  z-index: -1;
  display: inline;
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s;
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

  .title-badge {
    width: 160px;
  }
}
</style>
