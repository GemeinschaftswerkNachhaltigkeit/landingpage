<template>
  <div id="partner" class="partner-page">
    <section class="content-section hero">
      <content-with-image :title="title" :content="content" :image="hero_image"
        :alt="hero_image_alt"></content-with-image>
      <div class="circle"></div>
    </section>
    <section class="content-section partner-logos">
      <div class="content-section-wrapper">
        <columns-section :cols="2">
          <template #column-1>
            <partner-logos :title="partner_map_data_title" :logos="logos_map_data" :files="files">
            </partner-logos>

          </template>
          <template #column-2>
            <partner-logos :title="partner_general_title" :logos="logos_general" :files="files">
            </partner-logos>

          </template>
        </columns-section>
      </div>
    </section>
    <section class="content-section become-partner" v-if="become_partner_section_active">
      <div class="content-section-wrapper">
        <div class="become-partner-content">
          <div>
            <h2 class="title">{{ become_partner_title }}</h2>
          </div>
          <div class="content" v-html="become_partner_content"></div>
          <a class="new-idea-link button accent-btn"
            :href="`mailto:${become_partner_email_address}?subject=${become_partner_subject}`">{{ become_partner_btn_label }}</a>
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.partner-page {
  overflow: hidden;

  .hero {
    min-height: 70vh;
    box-sizing: border-box;
    position: relative;

    .circle {
      z-index: -1;
      position: absolute;
      width: 60vw;
      height: 60vw;
      background: var(--gw-orange);
      border-radius: 50%;
      right: -15vw;
      top: auto;
      bottom: 0;
    }
  }

  .content-section-wrapper {
    width: 100%;
  }

  .partner-logos {
    padding-top: 0;
  }

  .become-partner {
    background-color: var(--gw-blue-light);

    p {
      margin: 0;
    }

    .title {
      margin: 0;
    }

    .become-partner-content {
      display: grid;
      max-width: 80ch;
    }
  }
}

@media screen and (min-width: 922px) {
  .partner-page {
    .hero {
      .circle {
        z-index: -1;
        position: absolute;
        width: 60vw;
        height: 60vw;
        border-radius: 50%;
        right: -15vw;
        top: -10vw;
        bottom: auto;
      }
    }
  }
}
</style>

<script>
import ColumnsSection from "../components/ColumnsSection.vue";
import ContentWithImage from "../components/ContentWithImage.vue";
import PartnerLogos from "../components/PartnerLogos.vue";
export default {
  components: { ColumnsSection, ContentWithImage, PartnerLogos },
  async asyncData({ app, $directus }) {
    const currentLocale = app.i18n.locales.find(
      (i) => i.code === app.i18n.locale
    );

    const partner = await $directus.items("partner").readOne(1);
    const partnerTranslations = await $directus
      .items("partner_translations")
      .readByQuery({
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        },
      });

    const partnerTranslationsData = partnerTranslations.data[0];

    let general_logos = { data: [] };
    if (
      partnerTranslationsData.partner_general_logos &&
      partnerTranslationsData.partner_general_logos.length
    ) {
      general_logos = await $directus
        .items("partner_translations_files_1")
        .readByQuery({
          filter: {
            id: {
              _in: partnerTranslationsData.partner_general_logos || [],
            },
          },
        });
    }

    let logos_map_data = { data: [] };
    if (
      partnerTranslationsData.partner_map_data_logos &&
      partnerTranslationsData.partner_map_data_logos.length
    ) {
      logos_map_data = await $directus
        .items("partner_translations_files_2")
        .readByQuery({
          filter: {
            id: {
              _in: partnerTranslationsData.partner_map_data_logos,
            },
          },
        });
    }
    const files = await $directus.files.readByQuery({
      filter: {
        id: {
          _in: [
            ...logos_map_data.data.map((logo) => logo.directus_files_id),
            ...general_logos.data.map((logo) => logo.directus_files_id),
          ],
        },
      },
    });

    return {
      ...partner,
      ...partnerTranslations.data[0],
      logos_general: general_logos.data,
      logos_map_data: logos_map_data.data,
      files: files.data,
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

