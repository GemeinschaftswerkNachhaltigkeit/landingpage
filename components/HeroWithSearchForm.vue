<template>
  <div class="hero-wrapper" v-if="heroImageLandscape">
    <div class="search-form-wrapper">
      <h2 class="title">
        <div>{{ formTitle }}</div>
        <div><vue-typer :text="words"></vue-typer></div>
      </h2>
      <SearchForm></SearchForm>
    </div>
    <picture class="hero-image">
      <source v-if="heroImageLandscape" media="(orientation: landscape)"
        :srcset="getImgSrcSet(heroImageLandscape, 'webp', 'landscape')" type="image/webp" />
      <source v-if="heroImagePortrait" media="(orientation: portrait)"
        :srcset="getImgSrcSet(heroImagePortrait, 'png', 'portrait')" type="image/png" />
      <img :src="$imageURL(heroImageLandscape, { format: 'png', quality: 80 })" />
    </picture>
    <div class="arrow-down">
      <svg viewBox="0 0 1440 229" preserveAspectRatio="xMidYMax slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1440 229L0 229L2.00198e-05 -3.81849e-06L721.5 189.5L1440 0.00012207L1440 229Z" fill="white" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-wrapper {
  background-color: var(--gw-blue-dark);
  width: 100%;
  padding: 40px 0;
  position: relative;
  z-index: 9;



  .arrow-down {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    svg {
      display: block;
    }
  }

  .search-form-wrapper {
    position: relative;
    z-index: 1;
    max-width: 90vw;
    width: 100%;
    padding: 2rem 0.7rem 4rem 0.7rem;
    margin: auto;
    margin-bottom: 14vw;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .title {
      padding: 0;
      margin: 0;
      font-family: AzeretMono;
      font-weight: 600;
      color: var(--gw-blue-dark);
      font-size: 24px;
      background: none;
      letter-spacing: 0px;
    }

    background: white;

    @media screen and (min-width: 600px) {
      padding: 2rem 3rem 4rem 3rem;

      .title {
        display: flex;
        gap: 16px;
      }
    }

    @media screen and (min-width: 1800px) {
      max-width: 70vw;
    }
  }

  .hero-image {
    position: absolute;
    inset: 0;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}

@media screen and (min-width: 950px) {
  .hero-wrapper {
    padding: 112px 0;
  }
}
</style>

<script>
export default {
  props: {
    heroImageLandscape: {
      type: String,
      required: true,
    },
    heroImagePortrait: {
      type: String,
    },
    formTitle: {
      type: String,
    },
    words: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getImgSrcSet(imageId, type, orientation) {
      if (orientation == "portrait") {
        return this.$imageURL(imageId, { format: type }) + " 1440w,";
      } else {
        return this.$imageURL(imageId, { format: type }) + " 1920w";
      }
    },
  },
};
</script>
