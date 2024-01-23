<template>
  <div id="partner" class="partner-page">
    <section class="content-section hero">
      <content-with-image :title="data.title" :content="data.content" :image="data.hero_image"
        :alt="data.hero_image_alt"></content-with-image>
      <div class="circle"></div>
    </section>
    <section class="content-section partner-logos">
      <div class="content-section-wrapper">
        <columns-section :cols="2">
          <template #column-1>
            <partner-logos :title="data.partner_map_data_title" :logos="data.logos_map_data" :files="data.files">
            </partner-logos>

          </template>
          <template #column-2>
            <partner-logos :title="data.partner_general_title" :logos="data.logos_general" :files="data.files">
            </partner-logos>

          </template>
        </columns-section>
      </div>
    </section>
    <section class="content-section become-partner" v-if="data.become_partner_section_active">
      <div class="content-section-wrapper">
        <div class="become-partner-content">
          <div>
            <h2 class="title">{{ data.become_partner_title }}</h2>
          </div>
          <div class="content" v-html="data.become_partner_content"></div>
          <a class="new-idea-link button accent-btn"
            :href="`mailto:${data.become_partner_email_address}?subject=${data.become_partner_subject}`">{{
              data.become_partner_btn_label
            }}</a>
        </div>
      </div>
    </section>
  </div>
</template>




<script setup>

const { t } = useI18n()
const { $i18n } = useNuxtApp();
const { getItems, getSingletonItem } = useDirectusItems();
const { getFiles } = useDirectusFiles();

const { data, pending, error, refresh } = await useAsyncData('partner', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let partnerTranslations = [];
  let partner = {};
  let general_logos = [];
  let logos_map_data = [];
  try {
    partner = await getSingletonItem({
      collection: 'partner',
    })
    partnerTranslations = await getItems({
      collection: 'partner_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        }
      }
    })

    const partnerTranslationsData = partnerTranslations[0];

    if (
      partnerTranslationsData.partner_general_logos?.length
    ) {
      const logoTranslations = await getItems({
        collection: 'Logos',
        params: {
          filter: {
            id: {
              _in: partnerTranslationsData.partner_general_logos || [],
            },
          },
        }
      })

      general_logos = logoTranslations || []


    }


    if (
      partnerTranslationsData.partner_map_data_logos?.length
    ) {
      const logoTranslations = await getItems({
        collection: 'Logos',
        params: {
          filter: {
            id: {
              _in: partnerTranslationsData.partner_map_data_logos || [],
            },
          },
        }
      })

      logos_map_data = logoTranslations || []

    }


  } catch (error) {
    console.log('DIRECTUS Fetch Error', error)
  }

  return {
    ...partner,
    ...partnerTranslations[0],
    logos_general: general_logos,
    logos_map_data: logos_map_data,
  }
});

const title = data.value?.title;


useHead({
  title: title,
  meta: [
    {
      hid: "og-title",
      property: "og:title",
      content: title + " - " + t("page.title"),
    },
  ]

})

</script>

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