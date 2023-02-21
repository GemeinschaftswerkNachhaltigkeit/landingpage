<template>
  <div id="projekt-nachhaltigkeit" class="page">
    <section class="content-section breadcrumbs-section">
      <div class="breadcrumbs content-section-wrapper">{{ $t('menu.activities') }} <span class="arrow">
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.4 12L0 10.6L4.6 6L0 1.4L1.4 0L7.4 6L1.4 12Z" fill="#19486A" />
          </svg>
        </span> <span class="current">{{
          $t('menu.projectN')
        }}</span></div>
    </section>
    <section class="content-section page-hero">
      <content-with-image :title="title" :tagline="tagline" :content="summary" :image="image" :alt="alt || ''">
        <div class="action">
          <LinkButton external variant="outline" :url="button_url">{{ button_text }}</LinkButton>
        </div>
        <div class="project-logo">
          <img :src="logo" alt="projekt-nachhaltigkeit-logo" />
        </div>
      </content-with-image>
    </section>
    <section class="content-section cards-section" v-if="orgas && orgas.length">
      <div class="cards content-section-wrapper">
        <div class="title-wrapper">
          <h2 class="slider-title">{{ title_slider }}</h2>
        </div>

      </div>
    </section>
    <div class="carousel-wrapper" v-if="orgas && orgas.length">
      <Carousel :items="orgas" component="OrgaSlide"></Carousel>
    </div>

  </div>
</template>


<script>
import Carousel from "../components/Carousel.vue";
import ColumnsSection from "../components/ColumnsSection.vue";
import ContentWithImage from "../components/ContentWithImage.vue";
import LinkButton from "../components/LinkButton.vue";
import PartnerLogos from "../components/PartnerLogos.vue";

export default {
  components: {
    ColumnsSection,
    ContentWithImage,
    PartnerLogos,
    LinkButton,
    Carousel
  },
  data() {
    return {
      orgas: []
    }
  },
  computed: {
    logo: () => {
      return require(`~/assets/img/Projekt_Nachhaltigkeit_Logo.svg`);

    }
  },
  async mounted() {
    try {
      const response = await this.$axios.get(this.$config.privateApiUrl + '/organisations?projectSustainabilityWinner=true&size=30')
      if (response && response.data) {
        console.log('ORGAS Response', response.data.content)
        this.orgas = [...response.data.content, ...response.data.content, ...response.data.content, ...response.data.content];
      }
    } catch (e) {
      console.log(e)
    }
  },
  async asyncData({ app, $directus }) {
    const currentLocale = app.i18n.locales.find(
      (i) => i.code === app.i18n.locale
    );

    const projectN = await $directus.items("projekt_nachhaltigkeit").readOne(1);
    const projectNTranslations = await $directus
      .items("projekt_nachhaltigkeit_translations")
      .readByQuery({
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        },
      });
    return {
      ...projectN,
      ...projectNTranslations.data[0],
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "og-title",
          property: "og:title",
          content: this.title + " - " + this.$t("page.title"),
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.breadcrumbs-section {
  padding-top: 20px;
  padding-bottom: 20px;

  .breadcrumbs {
    flex-grow: 1;

    .arrow {
      padding: 0 16px;
    }

    .current {
      font-weight: 600;
    }
  }

}

.page-hero {
  position: relative;
  padding-top: 20px;

  .project-logo {
    position: absolute;
    right: 0;
    bottom: -44px;
    width: 312px;
    height: 88px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .action {
    margin-top: 40px;
  }
}

.cards-section {
  padding: 46px 0 0 0;

  .cards {
    flex-grow: 1;
  }

  .title-wrapper {
    max-width: 500px;


  }
}

.carousel-wrapper {
  padding: 24px 0 100px;
}
</style>