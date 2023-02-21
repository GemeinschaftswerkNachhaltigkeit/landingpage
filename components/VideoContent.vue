<template>
    <div v-if="heroImageLandscape">
      <video
        ref="video"
        crossorigin="anonymous"
        width="100%"
        controls
        :autoplay="enableAutoplay()"
        :muted="enableAutoplay()"
        playsinline
        v-if="heroVideoLandscape || heroVideoPortrait"
        :data-landscape-vid="$assetURL(heroVideoLandscape)"
        :data-portrait-vid="$assetURL(heroVideoPortrait)"
        :data-landscape-img="$assetURL(heroImageLandscape)"
        :data-portrait-img="$assetURL(heroImagePortrait)"
        :poster="$assetURL(heroImageLandscape)"
      >
        Your browser does not support HTML video.
        <track
          v-if="$i18n.locale === 'de'"
          :label="$t('labels.de')"
          kind="subtitles"
          srclang="de"
          :src="$assetURL(subtitlesFileId)"

        />
        <track
          v-if="$i18n.locale === 'en'"
          :label="$t('labels.en')"
          kind="subtitles"
          srclang="en"
          :src="$assetURL(subtitlesFileId)"
        />
      </video>
    </div>
</template>

<script>
export default {
  props: {
    heroImageLandscape: {
      type: String,
      default: "",
    },
    heroImagePortrait: {
      type: String,
      default: "",
    },
    heroTitle: {
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
  },

  methods: {
    addVideoSrc() {
      const video = this.$refs.video;

      if (video) {
        var source = document.createElement("source");
        source.type = "video/mp4";
        if (window.matchMedia("(orientation: portrait)").matches) {
          if (video.dataset.portraitVid) {
            source.src = video.dataset.portraitVid;
            source.id = "portraitVid";

            if (document.getElementById("landscapeVid")) {
              video.removeChild(document.getElementById("landscapeVid"));
            }
          }
          if (video.dataset.portraitImg) {
            video.setAttribute("poster", video.dataset.portraitImg);
          }
        }
        if (window.matchMedia("(orientation: landscape)").matches) {
          if (video.dataset.landscapeVid) {
            source.src = video.dataset.landscapeVid;
            source.id = "landscapeVid";

            if (document.getElementById("portraitVid")) {
              video.removeChild(document.getElementById("portraitVid"));
            }

            video.setAttribute("poster", video.dataset.landscapeImg);
          }
        }

        video.appendChild(source);
      }
    },
    enableAutoplay() {
      return this.heroVideoLandscape && !this.heroImageLandscape;
    },
    getImgSrcSet(imageId, type, orientation) {
      if (orientation == "portrait") {
        return this.$imageURL(imageId, { format: type }) + " 1440w,";
      } else {
        return this.$imageURL(imageId, { format: type }) + " 1920w";
      }
    },
  },
  mounted: function () {
    window.addEventListener("onload", this.addVideoSrc());
  },
  destroyed: function () {
    window.addEventListener("onload", this.addVideoSrc());
  },
};
</script>
