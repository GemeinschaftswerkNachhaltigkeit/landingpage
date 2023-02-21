<template>
  <div id="index" class="index-page" v-if="!pre_release_version">
    <template>
      <HeroWithSearchForm :heroImageLandscape="heroImageLandscape || ''" :heroImagePortrait="heroImagePortrait || ''"
        :heroTitle="heroTitle" :formTitle="search_form_title" :words="search_form_key_words" />
    </template>
    <section class="content-section bg-yellow-circle height-full" v-if="content_section_0?.length">
      <div class="content-section-wrapper feature-section">
        <div class="main-title-wrapper">
          <h2 class="title">{{ content_section_0_title }}</h2>
        </div>
        <div class="features" v-if="content_section_0?.length">
          <div class="feature" v-for="feature in content_section_0" :key="feature.title">
            <div class="coming-soon-wrapper">
              <h4 class="coming-soon" v-if="feature.coming_soon">{{ feature.coming_soon }}</h4>
            </div>
            <div class="title-wrapper">
              <h3 class="title">{{ feature?.title }}</h3>
            </div>
            <div class="content" v-html="feature?.content"></div>
          </div>


        </div>
      </div>
    </section>

    <section class="form-section bg-img-section bg-img-parallax" :style="$getBgImgSectionStyle(form_img_signup)">
      <div v-html="form_content_signup"></div>
      <div class="register-btn-wrapper">
        <a class="button btn-accent" :href="$config.appUrl + '/account?forceRegistration'">{{
          $t("btn.registration")
        }}</a>
      </div>
    </section>

    <section class="content-section about-hero height-full">
      <div class="content-section-wrapper">
        <columns-section :cols="2">
          <template v-slot:column-1>
            <div class="content-wrapper">
              <div class="content" v-html="content_section_1"></div>
              <div>
                <NuxtLink class="button accent-btn" :to="localePath('about')">{{
                  $t("btn.more")
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
          <content-section-image :id="content_section_img_1"
            :alt="files.find((f) => f.id == content_section_img_1).title">
          </content-section-image>
        </div>
      </div>
    </section>

    <section class="content-section bg-color-orange col-1">
      <VideoContent :heroImageLandscape="heroImageLandscape || ''" :heroImagePortrait="heroImagePortrait || ''"
        :heroTitle="heroTitle" :heroVideoLandscape="heroVideoLandscape" :heroVideoPortrait="heroVideoPortrait"
        :subtitlesFileId="video_subtitles" />
    </section>

    <section class="content-section bg-blue-50 split-section height-full">
      <div class="content-section-wrapper">
        <columns-section :cols="2">
          <template v-slot:column-1>
            <div class="left-column column">
              <div class="content" v-html="content_section_2"></div>
              <div>
                <NuxtLink class="button accent-btn" :to="localePath('roadmap')">{{
                  $t("btn.goToRoadmap")
                }}</NuxtLink>
              </div>
            </div>
          </template>
          <template v-slot:column-2>
            <div class="right-column column">
              <div class="content" v-html="content_section_2_right"></div>
              <div>
                <NuxtLink class="button accent-btn" :to="localePath('partner')">{{
                  $t("btn.goToPartner")
                }}</NuxtLink>
              </div>
            </div>
          </template>
        </columns-section>
      </div>
    </section>

    <section class="form-section bg-img-section bg-img-parallax" id="newsletter"
      :style="$getBgImgSectionStyle(form_img_newsletter)">
      <div v-html="form_content_newsletter"></div>
      <NewsletterForm></NewsletterForm>
    </section>

    <section class="form-section bg-img-section" :style="$getBgImgSectionStyle(form_img_contact)">
      <div v-html="form_content_contact"></div>
      <ContactForm></ContactForm>
    </section>
  </div>
  <div id="index" class="index-page" v-else>
    <pre-release-page :title="pre_release_title" :content="pre_release_description" :bgImage="form_img_signup"
      :formContent="form_content_signup" :participation_declaration="participation_declaration"></pre-release-page>
  </div>
</template>

<style scoped lang="scss">
.index-page {
  overflow: hidden;
}

.height-full {
  min-height: 100vh;
}

.feature-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;

  .main-title-wrapper {
    padding-top: 38px;

    .title {
      font-size: 48px;
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
  html.webp .form-section.bg-img-section {
    /* uses modernizr feature-detects*/
    background-image: var(--bg-landscape);
  }

  .form-section.bg-img-section {
    background-image: var(--bg-landscape-png);
    /* fallback for browsers that dont support webp*/
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

<script>
import PreReleasePage from "../components/PreReleasePage.vue";
export default {
  components: { PreReleasePage },
  async asyncData({ app, $directus }) {
    const currentLocale = app.i18n.locales.find(
      (i) => i.code === app.i18n.locale
    );

    const lp = await $directus.items("landingpage").readOne(1);
    const lpTranslations = await $directus
      .items("landingpage_translations")
      .readByQuery({
        filter: {
          languages_id: currentLocale.iso, //'en-US'
        },
      });
    const files = await $directus.files.readByQuery({
      filter: {
        id: {
          _in: [
            lpTranslations.data[0].video_subtitles,
            lpTranslations.data[0].content_section_img_2,
            lpTranslations.data[0].content_section_img_1,
          ],
        },
      },
    });

    return {
      ...lp,
      ...lpTranslations.data[0],
      files: files.data,
    };
  },
  head() {
    return {
      titleTemplate: null,
      meta: [
        {
          hid: "og-title",
          property: "og:title",
          content: this.$t("page.title"),
        },
      ],
    };
  },
};
</script>
