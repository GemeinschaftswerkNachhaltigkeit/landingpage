<template>
  <div id="about" class="about-page">
    <section class="content-section hero">
      <div class="content-section-wrapper">
        <columns-section :cols="2">
          <template v-slot:column-1>
            <div>
              <div class="title"><h1 >{{about_project_title}}</h1></div>
              <div class="content" v-html="about_project_content"></div>
            </div>
          </template>
          <template v-slot:column-2>
            <div class="placeholder"></div>
          </template>
        </columns-section>
      </div>
      <div class="circle">
        <div class="image-wrapper">
          <content-section-image :id="about_project_image" :alt="about_project_image_alt"></content-section-image>
        </div>
      </div>
    </section>
    <section class="content-section what-is">
      <div class="circle" />
      <div class="content-section-wrapper">
        <div class="text-section">
          <div>
            <h2 class="title">{{what_is_title}}</h2>
          </div>
          <div class="content" v-html="what_is_content"></div>
        </div>
      </div>
    </section>
    <section class="content-section goals" v-if="accordion_entries">
      <div class="circle" />
      <div class="content-section-wrapper">
        <div>
          <h2 class="title">{{goals_title}}</h2>
        </div>
        <div class="accordion-wrapper">
          <accordion>
            <accordion-entry 
            v-for="entry of accordion_entries" 
            :key="entry.title"
            :title="entry.title" 
            :content="entry.content"
              />
          </accordion>
        </div>
      </div>
    </section>
    <section class="content-section who-behind">
      <div class="circle">
      </div>
      <div class="content-section-wrapper">
        <div class="text-section">
          <div>
            <h2 class="title">{{who_behind_title}}</h2>
          </div>
          <div class="content" v-html="who_behind_content"></div>
        </div>
      </div>
    </section>
    <section class="content-section schedule">
      <div class="content-section-wrapper">
        <div class="schedule-section">
          <div>
            <h2 class="title">{{schedule_title}}</h2>
          </div>
          <div class="image-wrapper">
            <div class="inner-wrapper">
              <content-section-image :id="schedule_image" :alt="schedule_image_alt"></content-section-image>
            </div>
          </div>
        </div>
      </div>

    </section>
    <section class="content-section participation">
      <div class="content-section-wrapper">
        <div class="text-section">
          <div>
            <h2 class="title">{{participation_title}}</h2>
          </div>
          <div class="content" v-html="participation_content"></div>
          <div>
            <a class="button accent-btn" :href="participation_register_link">{{participation_register_btn}}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.about-page {
  overflow: hidden;
  .circle {
    z-index: -1;
    position: absolute;
    border-radius: 50%;
  }
  .hero {
    min-height: 70vh;
    box-sizing: border-box;
    position: relative;
    overflow: visible;

    .placeholder {
      height: 50vh;
    }

    .circle {
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
  }
  .title {
    margin: 0;
  }
  .content-section-wrapper {
    width: 100%;
  }
  .text-section {
    display: grid;
    max-width: 80ch;
  }
  .what-is {
    position: relative;
    .circle {
      width: 25vh;
      height: 25vh;
      right: 1vw;
      bottom: -100px;
      top: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--gw-magenta);
    }
  }
  .who-behind {
    position: relative;
    .circle {
      width: 30vh;
      height: 30vh;
      background: var(--gw-green);
      right: 0;
      bottom: -130px;
      transform: translateX(50%);
      top: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .goals {
    position: relative;
    .circle {
      width: 38vh;
      height: 38vh;
      background: var(--gw-orange);
      left: 0;
      top: 150px;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .accordion-wrapper {
      margin-top: 24px;
    }
  }
  .schedule {
    .image-wrapper {
      width: 100%;
      overflow: auto;
      .inner-wrapper {
        min-width: 800px;
      }
    }
  }
  .participation {
    background: var(--gw-blue-light);
    .text-section {
      max-width: 100ch;
    }
  }
}
@media screen and (min-width: 769px) {
  .about-page {
    .hero {
      .placeholder {
        height: 0;
      }
      .circle {
        width: 55vw;
        height: 55vw;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .about-page {
    .hero {
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
}
</style>

<script>
import Accordion from "../components/Accordion/Accordion.vue";
import AccordionEntry from "../components/Accordion/AccordionEntry.vue";
export default {
  components: { Accordion, AccordionEntry },
  async asyncData({ app, $directus }) {
    const currentLocale = app.i18n.locales.find(
      (i) => i.code === app.i18n.locale
    );

    const about = await $directus.items("about").readOne(1);
    const aboutTranslations = await $directus
      .items("about_translations")
      .readByQuery({
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        },
      });

    return {
      ...about,
      ...aboutTranslations.data[0],
    };
  },
  head() {
    return {
      title: this.about_project_title,

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

