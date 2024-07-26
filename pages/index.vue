<template>
  <div id="index" class="index-page" v-if="data">
    <SearchHero
      :image="data.search.image"
      :alt="'Hero background'"
      :title="data.search.title_line_1"
      :keywords="data.search.title_line_2"
      :content="data.search.content"
    >
    </SearchHero>

    <HighlightedItems :infoContent="data.search"></HighlightedItems>

    <section class="add-section content-section">
      <AdSection v-if="data.addSection" :data="data.addSection"></AdSection>
    </section>

    <section class="content-section" v-if="data.focus_topic_active">
      <div class="content-section-wrapper full">
        <FocusTopicSection
          :title="data.focus_topic_title"
          :subtitle="data.focus_topic_subtitle"
          :linkText="data.focus_topic_link_text"
          :linkUrl="data.focus_topic_link_url"
          :item="data.focus_topic_item"
          :itemType="data.focus_topic_item_type"
        >
        </FocusTopicSection>
      </div>
    </section>

    <section
      class="content-section height-full feature-section-wrapper"
      v-if="data.content_section_0?.length"
    >
      <div class="yellow-circle"></div>
      <div class="content-section-wrapper feature-section">
        <div class="main-title-wrapper">
          <h2 class="title">{{ data.content_section_0_title }}</h2>
        </div>
        <div class="features" v-if="data.content_section_0?.length">
          <div
            class="feature"
            v-for="feature in data.content_section_0"
            :key="feature.title"
          >
            <div class="coming-soon-wrapper">
              <h4 class="coming-soon" v-if="feature.coming_soon">
                {{ feature.coming_soon }}
              </h4>
            </div>
            <div class="title-wrapper">
              <h3 class="title">{{ feature?.title }}</h3>
            </div>
            <div class="content" v-html="feature?.content"></div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="form-section bg-img-section bg-img-parallax"
      :style="$getBgImgSectionStyle(data.form_img_signup)"
    >
      <div class="content-wrapper">
        <div class="html box-content" v-html="data.form_content_signup"></div>
      </div>

      <div class="register-btn-wrapper">
        <a
          class="button btn-accent"
          :href="$config.public.appUrl + '/account?forceRegistration'"
          >{{ $t('btn.registration') }}</a
        >
      </div>
    </section>

    <section class="content-section about-hero height-full">
      <div class="content-section-wrapper">
        <columns-section :cols="2">
          <template v-slot:column-1>
            <div class="content-wrapper">
              <div class="html" v-html="data.content_section_1"></div>
              <div>
                <NuxtLink class="button accent-btn" :to="localePath('about')">{{
                  $t('btn.more')
                }}</NuxtLink>
              </div>
            </div>
          </template>
          <template v-slot:column-2>
            <div class="placeholder"></div>
          </template>
        </columns-section>
      </div>
      <div class="circle">
        <div class="image-wrapper">
          <content-section-image
            :id="data.content_section_img_1"
            :alt="
              data.files.find((f) => f.id == data.content_section_img_1)?.title
            "
          >
          </content-section-image>
        </div>
      </div>
    </section>

    <section class="content-section bg-color-orange col-1">
      <VideoContent
        :heroImageLandscape="data.heroImageLandscape || ''"
        :heroImagePortrait="data.heroImagePortrait || ''"
        :heroVideoLandscape="data.heroVideoLandscape"
        :heroVideoPortrait="data.heroVideoPortrait"
        :subtitlesFileId="data.video_subtitles"
      />
    </section>

    <section class="content-section bg-blue-50 split-section height-full">
      <div class="content-section-wrapper">
        <columns-section :cols="2">
          <template v-slot:column-1>
            <div class="left-column column">
              <div class="html" v-html="data.content_section_2"></div>
              <div>
                <NuxtLink
                  class="button accent-btn"
                  :to="localePath('roadmap')"
                  >{{ $t('btn.goToRoadmap') }}</NuxtLink
                >
              </div>
            </div>
          </template>
          <template v-slot:column-2>
            <div class="right-column column">
              <div class="html" v-html="data.content_section_2_right"></div>
              <div>
                <NuxtLink
                  class="button accent-btn"
                  :to="localePath('partner')"
                  >{{ $t('btn.goToPartner') }}</NuxtLink
                >
              </div>
            </div>
          </template>
        </columns-section>
      </div>
    </section>

    <section
      class="form-section bg-img-section bg-img-parallax"
      id="newsletter"
      :style="$getBgImgSectionStyle(data.form_img_newsletter)"
    >
      <div class="content-wrapper">
        <div
          class="html box-content"
          v-html="data.form_content_newsletter"
        ></div>
      </div>
      <NewsletterForm></NewsletterForm>
    </section>

    <section
      class="form-section bg-img-section"
      :style="$getBgImgSectionStyle(data.form_img_contact)"
    >
      <div class="content-wrapper">
        <div class="html box-content" v-html="data.form_content_contact"></div>
      </div>
      <ContactForm></ContactForm>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();
const { $i18n } = useNuxtApp();
const { getItems, getSingletonItem } = useDirectusItems();
const { getFiles } = useDirectusFiles();

const { data } = await useAsyncData('index', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let indexTranslations = [];
  let index = {};
  let search = {};
  let searchTranslations = {};
  let files = [];
  let addSection = null;

  try {
    const searchPromise = getSingletonItem({
      collection: 'search',
    });
    const searchTranslationsPromise = getItems({
      collection: 'search_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        },
      },
    });
    const indexPromise = getSingletonItem({
      collection: 'landingpage',
    });
    const indexTranslationsPromise = getItems({
      collection: 'landingpage_translations',
      params: {
        filter: {
          languages_id: currentLocale.iso, //'en-US'
        },
      },
    });

    const [
      searchResult,
      searchTranslationsResult,
      indexResult,
      indexTranslationsResult,
    ] = await Promise.all([
      searchPromise,
      searchTranslationsPromise,
      indexPromise,
      indexTranslationsPromise,
    ]);
    search = searchResult;
    searchTranslations = searchTranslationsResult;
    index = indexResult;
    indexTranslations = indexTranslationsResult;

    if (index.add_section) {
      const addSectionDataTranslationData = await getItems({
        collection: 'add_sections_translations',
        params: {
          filter: {
            add_sections_id: {
              id: index.add_section,
            },
            languages_code: currentLocale.iso, //'en-US'
          },
        },
      });

      addSection = { ...addSectionDataTranslationData[0] };
    }
    files = await getFiles({
      params: {
        filter: {
          id: {
            _in: [
              indexTranslations[0].video_subtitles,
              indexTranslations[0].content_section_img_2,
              indexTranslations[0].content_section_img_1,
            ],
          },
        },
      },
    });
  } catch (error) {
    console.log('DIRECTUS Fetch Error', error);
  }
  return {
    ...index,
    ...indexTranslations[0],
    search: {
      ...search,
      ...searchTranslations[0],
    },
    addSection: addSection,
    files: files,
  };
});

useHead({
  titleTemplate: null,
  title: t('page.title'),
  meta: [
    {
      hid: 'og-title',
      property: 'og:title',
      content: t('page.title'),
    },
  ],
});
</script>

<style scoped lang="scss">
.index-page {
  overflow: hidden;
}

.height-full {
  min-height: 100vh;
}

.form-section {
  .html {
    padding-top: 24px;
  }
}

.add-section {
  background: linear-gradient(180deg, var(--light-gray) 50%, transparent 50%);
}

.feature-section-wrapper {
  overflow: hidden;
  position: relative;

  .yellow-circle {
    width: 500px;
    height: 500px;
    border-radius: 100%;
    background-color: var(--gw-yellow);
    position: absolute;
    bottom: -250px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
}

@media screen and (min-width: 1300px) {
  .feature-section-wrapper {
    min-height: 60vw;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 40px;

    .yellow-circle {
      width: 60vw;
      height: 60vw;
      border-radius: 100%;
      background-color: var(--gw-yellow);
      position: absolute;
      bottom: auto;
      right: -60vw;
      left: auto;
      transform: auto;
    }
  }
}

@media screen and (min-width: 1800px) {
  .feature-section-wrapper {
    min-height: 70vw;

    .yellow-circle {
      width: 70vw;
      height: 70vw;
      border-radius: 100%;
      background-color: var(--gw-yellow);
      position: absolute;
      bottom: auto;
      right: -70vw;
      left: auto;
      transform: auto;
    }
  }
}

.feature-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;

  .main-title-wrapper {
    padding-top: 38px;

    .title {
      font-size: 48px;
      line-height: 60px;
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 64px;

    .feature {
      .coming-soon-wrapper {
        height: 28px;
        margin-bottom: 10px;

        .coming-soon {
          font-size: 24px;
          font-weight: bold;
          color: var(--gw-magenta);
          text-transform: uppercase;
          background: none;
        }
      }

      .content {
        line-height: 20px;
        margin: 24px 0;
      }

      .title-wrapper {
        min-height: 42px;

        .title {
          font-size: 18px;
          background: none;
          text-transform: uppercase;
          font-weight: 700;
        }
      }
    }
  }
}

.box-content {
  text-align: center;
}

.about-hero {
  box-sizing: border-box;
  position: relative;
  overflow: visible;

  .placeholder {
    height: 50vh;
  }

  .circle {
    z-index: -1;
    position: absolute;
    border-radius: 50%;
    width: 50vh;
    height: 50vh;
    background: var(--gw-blue-dark);
    right: -6vw;
    bottom: -150px;
    top: auto;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;

    .image-wrapper {
      width: 70%;
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.split-section {
  .left-column {
    background: var(--gw-blue-light);
    box-shadow: 0 0 0 130px var(--gw-blue-light);
    margin-bottom: 260px;
    overflow: hidden;
  }

  .column {
    display: flex;
    flex-direction: column;

    .content {
      flex-grow: 1;
    }
  }
}

.register-btn-wrapper {
  padding: 3em;
  padding-top: 0;
  padding-bottom: 24px;
}

@media only screen and (max-width: 768px) {
  html.webp .form-section.bg-img-section {
    background-image: var(--bg-portrait);
  }

  .form-section.bg-img-section {
    background-image: var(--bg-portrait-png);
  }
}

@media only screen and (min-width: 769px) {
  .form-section.bg-img-section {
    background-image: var(--bg-landscape);
  }

  .split-section {
    .left-column {
      background: transparent;
      box-shadow: none;
      margin-bottom: 0px;
      overflow: auto;
      padding-right: 56px;
    }

    .right-column {
      padding-left: 56px;
    }
  }

  .feature-section {
    display: grid;
    grid-template-columns: 250px 1fr;
  }

  .about-hero {
    .placeholder {
      height: 0;
    }

    .circle {
      width: 55vw;
      height: 55vw;
    }
  }
}

@media screen and (min-width: 1200px) {
  .about-hero {
    .placeholder {
      height: 0;
    }

    .circle {
      right: -4vw;
      top: 50%;
      width: 50vw;
      height: 50vw;
    }
  }

  .schedule {
    .schedule-section {
      width: 90%;
    }
  }

  .who-behind {
    .circle {
      bottom: -50px;
    }
  }

  .what-is {
    .circle {
      bottom: 0px;
    }
  }
}
</style>
