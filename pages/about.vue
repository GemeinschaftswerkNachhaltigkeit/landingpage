<template>
  <div id="about" class="about-page">
    <section class="content-section hero">
      <div class="content-section-wrapper">
        <columns-section :cols="2">
          <template v-slot:column-1>
            <div>
              <div class="title-wrapper">
                <h1 class="title">{{ data.about_project_title }}</h1>
              </div>
              <div class="content" v-html="data.about_project_content"></div>
            </div>
          </template>
          <template v-slot:column-2>
            <div class="placeholder"></div>
          </template>
        </columns-section>
      </div>
      <div class="circle">
        <div class="image-wrapper">
          <content-section-image :id="data.about_project_image"
            :alt="data.about_project_image_alt"></content-section-image>
        </div>
      </div>
    </section>
    <section class="content-section what-is">
      <div class="circle" />
      <div class="content-section-wrapper">
        <div class="text-section">
          <div class="title-wrapper">
            <h2 class="title">{{ data.what_is_title }}</h2>
          </div>
          <div class="content" v-html="data.what_is_content"></div>
        </div>
      </div>
    </section>
    <section class="content-section goals" v-if="data.accordion_entries">
      <div class="circle" />
      <div class="content-section-wrapper">
        <div class="title-wrapper">
          <h2 class="title">{{ data.goals_title }}</h2>
        </div>
        <div class="accordion-wrapper">
          <accordion>
            <accordion-entry v-for="entry of data.accordion_entries" :key="entry.title" :title="entry.title"
              :content="entry.content" />
          </accordion>
        </div>
      </div>
    </section>
    <section class="content-section who-behind">
      <div class="circle">
      </div>
      <div class="content-section-wrapper">
        <div class="text-section">
          <div class="title-wrapper">
            <h2 class="title">{{ data.who_behind_title }}</h2>
          </div>
          <div class="content" v-html="data.who_behind_content"></div>
        </div>
      </div>
    </section>
    <section v-if="data.schedule_title" class="content-section schedule">
      <div class="content-section-wrapper">
        <div class="schedule-section">
          <div class="title-wrapper">
            <h2 class="title">{{ data.schedule_title }}</h2>
          </div>
          <div class="image-wrapper">
            <div class="inner-wrapper">
              <content-section-image :id="data.schedule_image" :alt="data.schedule_image_alt"></content-section-image>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="content-section participation">
      <div class="content-section-wrapper">
        <div class="text-section">
          <div class="title-wrapper">
            <h2 class="title">{{ data.participation_title }}</h2>
          </div>
          <div class="content" v-html="data.participation_content"></div>
          <div class="participation-action">
            <a class="button accent-btn" :href="data.participation_register_link">{{ data.participation_register_btn
            }}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
const { $i18n } = useNuxtApp();
const { getItems, getSingletonItem } = useDirectusItems();

const { data } = await useAsyncData('about', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let aboutTranslations = [];
  let about = {};
  try {
    about = await getSingletonItem({
      collection: 'about',
    })
    aboutTranslations = await getItems({
      collection: 'about_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        }
      }
    })
  } catch (error) {
    console.log('DIRECTUS Fetch Error', error)
  }
  return {
    ...about,
    ...aboutTranslations[0],
  }
});
const title = data.value.about_project_title;

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

  .title-wrapper {
    margin-bottom: 24px;
  }

  .title {
    margin: 0;
    display: inline;
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

    .participation-action {
      margin-top: 24px;
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
