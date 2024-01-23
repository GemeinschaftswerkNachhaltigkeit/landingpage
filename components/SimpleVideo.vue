<template>
  <video ref="videoElement" crossorigin="anonymous" width="100%" controls :autoplay="false" :muted="false" playsinline
    :data-vid="$assetURL(video)" :data-img="$assetURL(image)" :poster="$assetURL(image)">
    Your browser does not support HTML video.
    <template v-if="subtitlesFileId">
      <track v-if="$i18n.locale === 'de'" :label="$t('labels.de')" kind="subtitles" srclang="de"
        :src="$assetURL(subtitlesFileId)" />
      <track v-if="$i18n.locale === 'en'" :label="$t('labels.en')" kind="subtitles" srclang="en"
        :src="$assetURL(subtitlesFileId)" />
    </template>
  </video>
</template>

<script setup>
import { ref } from 'vue'
const videoElement = ref(null)

defineProps({
  image: {
    type: String,
    default: "",
  },
  heroTitle: {
    type: String,
    default: "",
  },
  video: {
    type: String,
  },

  subtitlesFileId: {
    type: String,
  },
})

function addVideoSrc() {
  if (videoElement.value) {
    var source = document.createElement("source");
    source.type = "video/mp4";
    if (videoElement.value.dataset.vid) {

      source.src = videoElement.value.dataset.vid;


      source.id = "vid";

      videoElement.value.setAttribute("poster", videoElement.value.dataset.img);
    }

    videoElement.value.appendChild(source);
  }
}


onMounted(() => {
  window.addEventListener("onload", addVideoSrc());
})
onBeforeUnmount(() => {
  window.addEventListener("onload", addVideoSrc());
})

</script>
