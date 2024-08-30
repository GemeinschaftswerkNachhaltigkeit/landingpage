<template>
  <article>
    <div>
      <div class="image">
        <a v-if="!modal" :href="url" target="_blank">
          <img
            :src="$imageURL(image, { width: 300, format: 'webp', quality: 80 })"
            :alt="title || 'Thumbnail'"
          />
        </a>
        <button
          class="video-button"
          v-if="modal"
          :href="url"
          target="_blank"
          @click="handleOpenModal"
        >
          <img
            :src="$imageURL(image, { width: 300, format: 'webp', quality: 80 })"
            :alt="title || 'Thumbnail'"
          />
        </button>

        <a class="download" :href="$assetURL(file)" target="_blank" v-if="file">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path
              d="m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z"
            />
          </svg>
          {{ $t('btn.profileDownload') }}
        </a>
        <div class="video-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="content">
      <h4 class="title no-decoration">{{ title }}</h4>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  title: String,
  file: String,
  image: String,
  url: String,
  modal: Boolean,
  video: String,
});

const emits = defineEmits(['openModal']);

function handleOpenModal() {
  window._paq.push([
    'trackEvent',
    'VIDEO POPUP',
    'Video-Popup geöffnet',
    props.title,
    props.url,
  ]);

  emits('openModal');
}
</script>

<style scoped lang="scss">
article {
  display: flex;
  width: 100%;
  background-color: white;
  flex-direction: column;
  position: relative;

  .image {
    position: relative;
    width: 100%;
    img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      display: block;
    }
    .video-button {
      background: none;
      padding: 0;
      display: block;
    }
    .download {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      width: fit-content;
      padding-inline: 8px;
      padding-block: 4px;
      background-color: var(--gw-magenta);
      color: white;
      text-decoration: none;
      font-weight: 700;
      cursor: pointer;
    }
    .video-icon {
      position: absolute;
      inset: 0;
      transition: all 200ms;
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      pointer-events: none;

      svg {
        position: absolute;
        color: white;
        right: 20px;
        bottom: 20px;
        transform: translate(50%, 50%);
        transition: all 200ms;
        pointer-events: none;
        transition: all 200ms;
      }
    }
    &:hover {
      .video-icon {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.5);

        svg {
          width: 60px;
          height: 60px;
          right: 50%;
          bottom: 50%;
          transform: translate(50%, 50%);
        }
      }
    }
  }

  .content {
    padding: 8px;
    height: 100%;
    .title {
      display: inline-block;
      font-family: Verdana, sans-serif;
      text-align: left;
      align-self: flex-start;
      font-size: 14px;
      letter-spacing: 0;
      font-weight: 700;
      line-height: 130%;
    }
  }
}
</style>
