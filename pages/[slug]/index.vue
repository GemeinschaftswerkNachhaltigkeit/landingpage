<template>
  <div v-if="data && data.status === 'published'" class="dyn-page">
    <section class="content-section hero"
      :style="{ background: getGradient(data.hero_deco_color, data.hero_deco_color_alt) }">
      <content-with-image v-if="data.image" :title="data.title" :content="data.content" :image="data.image.id"
        :alt="data.image_alt"></content-with-image>
      <div class="circle" v-if="data.hero_deco === 'circle'" :style="{ backgroundColor: data.hero_deco_color }"></div>
    </section>

    <section class="section" v-for="section in  data.sections ">
      <content-wrapper>
        <article class="content">
          <div class="image-and-text" :class="section.page_sections_id?.imageTextLayout">
            <div class=" image" v-if="section.image">
              <ContentSectionImage :id="section.image.id" :alt="section.title">
              </ContentSectionImage>
            </div>
            <div class="text-wrapper">
              <div v-if="section.title">
                <h2 class="blue">{{ section.title }}</h2>
              </div>
              <div class="html text" :class="{ oneColumn: section.page_sections_id?.one_column_text }"
                v-if="section.content" v-html="section.content"></div>
            </div>
          </div>

          <accordion>
            <accordion-entry v-for=" entry  of  section.accordion " :color="section.color" :key="entry.title"
              :title="entry.title" :content="entry.content" />
          </accordion>
          <div class="carousel-wrapper last" v-if="section.slides && section.slides.length">
            <Carousel :items="section.slides" :component="GenericSlide" :intervalTime="4000">
            </Carousel>
          </div>
        </article>
      </content-wrapper>
    </section>
  </div>
</template>

<script setup>
import GenericSlide from '../../components/GenericSlide.vue'

const { t } = useI18n()
const route = useRoute()
const { $i18n } = useNuxtApp();
const { getItems } = useDirectusItems();

const { data, pending, error, refresh } = await useAsyncData('dan', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let pageTranslations = {};
  let pageSectionsTranslations = [];
  let sections = []
  let slides = []

  try {
    const slug = route.params.slug;
    const parts = slug.split('.')
    if (parts.length > 1) {
      return;
    }
    const pageTranslationsResult = await getItems({
      collection: 'pages_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso,
          pages_id: {
            slug: slug
          }
        },
        fields: ["*", "*.*", "*"]
      }
    })



    if (!pageTranslationsResult.length) {
      return navigateTo('/')
    }

    pageTranslations = pageTranslationsResult[0];
    sections = pageTranslations?.pages_id
      ? pageTranslations.pages_id.sections.map(s => s.name)
      : [];




    let secs = await getItems({
      collection: 'page_sections_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso,
          page_sections_id: {
            name: { _in: sections },
          }
        },
        fields: ['*', ' *.*.* ']
      }
    })
    slides = await getItems({
      collection: 'slides_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso,

        },
        fields: ['*', '*.*']
      }
    })



    secs.forEach(sec => {
      const secSlides = sec.page_sections_id?.slides ? sec.page_sections_id.slides.map(s => s.name) : []
      sec.slides = slides.filter(slide => secSlides.includes(slide.slides_id?.name))
    });



    secs.sort(function (a, b) {
      return sections.indexOf(a.page_sections_id?.name) - sections.indexOf(b.page_sections_id?.name);
    });



    pageSectionsTranslations = secs


  } catch (error) {
    console.log('DIRECTUS Fetch Error', error)
  }


  return {
    ...pageTranslations?.pages_id || {},
    ...pageTranslations,
    sections: pageSectionsTranslations,
    slides
  }
    ;


});

if (data?.value?.status !== 'published') {
  navigateTo('/')
}

function getGradient(col1, col2) {
  return `linear-gradient(45deg,
      white 74%,
      ${col1} 74%,
      ${col1} 82%,
      ${col2} 82%)`
}

const title = data?.value ? data.value.title : '';

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

<style scoped lang="scss">
.dyn-page {
  min-width: 0px;
  width: 100%;
}

.hero {
  min-height: 70vh;
  box-sizing: border-box;
  position: relative;
  background-repeat: no-repeat;
  overflow: hidden;

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

.section {
  min-width: 0px;
  width: 100%;

  .content {
    display: flex;
    flex-direction: column;
    gap: 64px;
    min-width: 0px;
    width: 100%;

    .image-and-text {
      display: flex;
      gap: 40px;
      flex-wrap: wrap;

      .image {
        flex: 1 1 300px;
        max-width: 100%;
      }

      .text-wrapper {
        flex: 1 1 300px;
        display: flex;
        flex-direction: column;
        gap: 24px;

        .text {
          columns: 2;
          column-width: 60ch;
          column-gap: 80px;

          &.oneColumn {
            columns: 1;
          }
        }
      }

      &.vertical {
        flex-direction: column;

        .text-wrapper {
          flex-basis: auto;
        }

        .image {
          height: 240px;
        }
      }

      @media screen and (min-width: 712px) {
        &.inverse {
          .image {
            order: 2;
          }
        }
      }
    }

    .carousel-wrapper {
      min-width: 0px;
      width: 100%;
    }
  }


}
</style>