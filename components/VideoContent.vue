<template>
  <div class="video-wrapper" v-if="heroImageLandscape">
    <video class="video" ref="video" crossorigin="anonymous" width="100%" controls :autoplay="enableAutoplay()"
      :muted="enableAutoplay()" playsinline v-if="heroVideoLandscape || heroVideoPortrait"
      :data-landscape-vid="$assetURL(heroVideoLandscape)" :data-portrait-vid="$assetURL(heroVideoPortrait)"
      :data-landscape-img="$assetURL(heroImageLandscape)" :data-portrait-img="$assetURL(heroImagePortrait)"
      :poster="$assetURL(heroImageLandscape)">
      Your browser does not support HTML video.
      <track v-if="$i18n.locale === 'de'" :label="$t('labels.de')" kind="subtitles" srclang="de"
        :src="$assetURL(subtitlesFileId)" />
      <track v-if="$i18n.locale === 'en'" :label="$t('labels.en')" kind="subtitles" srclang="en"
        :src="$assetURL(subtitlesFileId)" />
    </video>
  </div>
</template>

<script setup>
const { $imageURL } = useNuxtApp();
const video = ref(null);

const props = defineProps({
  heroImageLandscape: {
    type: String,
    default: "",
  },
  heroImagePortrait: {
    type: String,
    default: "",
  },
  heroVideoLandscape: {
    type: String,
  },
  heroVideoPortrait: {
    type: String,
  },
  subtitlesFileId: {
    type: String,
  },
})

function addVideoSrc() {


  if (video.value) {
    var source = document.createElement("source");
    source.type = "video/mp4";
    if (window.matchMedia("(orientation: portrait)").matches) {
      if (video.value.dataset.portraitVid) {
        source.src = video.value.dataset.portraitVid;
        source.id = "portraitVid";

        if (document.getElementById("landscapeVid")) {
          video.value.removeChild(document.getElementById("landscapeVid"));
        }
      }
      if (video.value.dataset.portraitImg) {
        video.value.setAttribute("poster", video.value.dataset.portraitImg);
      }
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
      if (video.value.dataset.landscapeVid) {
        source.src = video.value.dataset.landscapeVid;
        source.id = "landscapeVid";

        if (document.getElementById("portraitVid")) {
          video.value.removeChild(document.getElementById("portraitVid"));
        }

        video.value.setAttribute("poster", video.value.dataset.landscapeImg);
      }
    }

    video.value.appendChild(source);
  }
}
function enableAutoplay() {
  return props.heroVideoLandscape && !props.heroImageLandscape;
}
function getImgSrcSet(imageId, type, orientation) {
  if (orientation == "portrait") {
    return $imageURL(imageId, { format: type }) + " 1440w,";
  } else {
    return $imageURL(imageId, { format: type }) + " 1920w";
  }
}

onMounted(() => {
  addVideoSrc()
})




</script>

<style scoped lang="scss">
.video-wrapper {
  width: 100%;
  height: 100%;

  .video {
    width: 100%;
    height: 100%;
  }
}
</style>