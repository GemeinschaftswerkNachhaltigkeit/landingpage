<template>
  <div class="page">
    <section class="hero">
      <section class="content-section breadcrumbs-section">
        <div class="breadcrumbs content-section-wrapper">
          <div>{{ data.parentNav?.name }} <span class="arrow">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.4 12L0 10.6L4.6 6L0 1.4L1.4 0L7.4 6L1.4 12Z" fill="#19486A" />
              </svg>
            </span></div>
          <div class="current">{{ data.currentNav?.name }}</div>
        </div>
      </section>
      <section class="content-section page-hero">
        <content-with-image :title="data.title" :content="data.content" :image="data.image">
        </content-with-image>
      </section>
    </section>

    <section class="content-section">
      <div class="content-section-wrapper sidebar-layout">
        <div class="sidebar-menu">
          <nav class="menu-items accent-font">
            <a v-if="data.description_menu" class="menu-item" href="#beschreibung"
              :class="{ active: isActive('beschreibung') }">
              {{ data.description_menu }}
            </a>
            <a v-for="action in data.actions" class="menu-item" :href="'#' + action.menu_slug"
              :class="{ active: isActive('' + action.menu_slug) }">
              {{
                action.menu }}</a>

            <a v-if="data.knowledge_menu" class="menu-item" href="#wissenssammlung"
              :class="{ active: isActive('wissenssammlung') }">{{
                data.knowledge_menu }}</a>
            <a v-if="data.highlights_menu" class="menu-item" href="#highlights"
              :class="{ active: isActive('highlights') }">{{
                data.highlights_menu }}</a>
          </nav>
        </div>
        <div class="content">
          <section class="nav-section" id="beschreibung" data-track-menu>
            <div class="inner-section">
              <div class="inner-layout-vertical">

                <div v-if="data.description_title">
                  <h2 class="blue">{{ data.description_title }}</h2>
                </div>
                <div v-if="data.description_content">
                  <div v-html="data.description_content"></div>
                </div>
                <div class="description-entry font-2" v-if="data.description_entries?.length"
                  v-for="( entry, index) in data.description_entries">
                  <div class="number">
                    {{ index + 1 }}
                  </div>
                  <div v-html="entry.content">

                  </div>
                </div>
                <div class="description-source">{{ data.description_source }}</div>
              </div>
            </div>

          </section>
          <section class="nav-section">
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div>
                  <h3 class="no-decoration" v-if="data.sdgs_title">{{
                    data.sdgs_title }}</h3>
                </div>
                <div class="html no-margin " v-if="data.sdgs_content" v-html="data.sdgs_content"></div>
                <div class="sdgs">
                  <LinkedLogo width="120px" height="120px" v-for="sdg in data.sdgs_selected_goals" :logo="sdg">
                  </LinkedLogo>
                </div>
              </div>
            </div>
          </section>
          <section class="nav-section small-gap">
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div>
                  <h2 class="blue" v-if="data.actions_title">{{
                    data.actions_title }}</h2>
                </div>
                <div class="html no-margin " v-if="data.actions_description" v-html="data.actions_description"></div>
              </div>
            </div>
          </section>

          <section v-for="action in data.actions" class="nav-section" :id="action.menu_slug" data-track-menu>
            <div class="inner-section">
              <ParticipateActivity :title="action.title" :content="action.content" :image="action.image"
                :logos="action.cooperations" :logoLabel="action.cooperations_title"
                :sliderTitle="action.image_slider_title" :slider="!!action.slides?.length"
                :button="action.series_popup_active && action.series_popup_button" :show-logos="action.slider_active"
                :show-cooperations="action.cooperations_active" @action-clicked="setPopupOpen(action.menu_slug)">
                <Carousel :items="action.slides" :component="ImageSlide" framedCards>
                </Carousel>
              </ParticipateActivity>

            </div>
          </section>

          <section class="nav-section knowledge-section" :class="{ 'knowledge-section-space': !data.highlights_title }"
            id="wissenssammlung" data-track-menu>
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div>
                  <h2 class="blue" v-if="data.knowledge_title">{{
                    data.knowledge_title }}</h2>
                </div>
                <div>
                  <h3 class="list-title" v-if="data.knowledge_list_title">{{
                    data.knowledge_list_title }}</h3>
                </div>
                <div class="list">
                  <div class="list-item" v-for="listItem in data.knowledge_list" :key="listItem">

                    <div class="icon">
                      <svg width="28" height="21" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.91666 20.9999L0.416656 11.4999L2.79166 9.12492L9.91666 16.2499L25.2083 0.958252L27.5833 3.33325L9.91666 20.9999Z"
                          fill="#4C9F38" />
                      </svg>
                    </div>
                    <div v-html="listItem.content"></div>
                  </div>
                </div>
                <div class="html no-margin " v-if="data.knowledge_content" v-html="data.knowledge_content"></div>

                <div class="knowledge-accordion" v-if="data.knowledge_accordion && data.knowledge_accordion.length">
                  <accordion>
                    <accordion-entry v-for="entry of data.knowledge_accordion" :key="entry.title" :title="entry.title"
                      :content="entry.content" />
                  </accordion>
                </div>
              </div>
            </div>
          </section>
          <section class="nav-section highlights-section" id="highlights" data-track-menu>
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div>
                  <h2 class="blue" v-if="data.highlights_title">{{
                    data.highlights_title }}</h2>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </section>
    <section class="carousel-section">

      <div class="carusel-wrapper">
        <Carousel :items="highlights" :component="OrgaActivitySlide" framedCards></Carousel>
      </div>


    </section>
    <template>
      <PopUp v-for="action in  data.actions " :open="openPopup === action.menu_slug" @popupClosed="handleClosePopup">
        <PopUpContent :title="action.series_popup_title"
          :content="wasSubscriptionSuccess ? '' : action.series_popup_content">
          <SubscriptionForm :endpoint="'action-page/form'" :options="action.series_popup_stations"
            :lang="$i18n.locale.value" :stations="data.stations && data.stations[action.series_popup_key]"
            :form-key="action.series_popup_key" @success="handleSuccess">
          </SubscriptionForm>
        </PopUpContent>
      </PopUp>

    </template>
  </div>
</template>


<script setup>
import OrgaActivitySlide from '../components/OrgaActivitySlide.vue'
import ImageSlide from '../components/ImageSlide.vue'

const { t } = useI18n()
const route = useRoute()
const { $i18n } = useNuxtApp();
const { getItems, getSingletonItem } = useDirectusItems();
const config = useRuntimeConfig();
const { isActive } = useTrackMenu();

const highlights = ref([]);
const openPopup = ref(undefined)
const wasSubscriptionSuccess = ref(false)

const { data, pending, error, refresh } = await useAsyncData('dan', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let focusTopic = {};
  let focusTopicTranslations = {};

  let actionTranslations = [];
  let allActionTranslations = [];
  let parentNav = {}
  let currentNav = {}
  try {
    const nav = await getItems({
      collection: 'navigation_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso
        },
        fields: ['*', '**']
      }
    })
    const navItems = nav[0] && nav[0].nav_item || [];
    parentNav = navItems.find(i => i.key === 'activities');
    currentNav = parentNav?.submenu.find(s => s.target === 'schwerpunktthema');
    const focusTopicPromise = getSingletonItem({ collection: 'focus_topic_page' })

    const focusTopicTranslationsPromise = getItems({
      collection: 'focus_topic_page_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso, //'en-US',

        },
        fields: ['*', '**', 'sdgs_selected_goals.*']
      }
    })


    const [
      focusTopicResp,
      focusTopicTranslationsRes,
    ] = await Promise.all([
      focusTopicPromise,
      focusTopicTranslationsPromise,
    ])
    focusTopic = focusTopicResp

    if (focusTopic.actions && focusTopic.actions.length) {
      actionTranslations = await getItems({
        collection: 'focus_topic_actions_translations',
        params: {
          filter: {
            languages_code: currentLocale.iso, //'en-US',
            focus_topic_actions_id: {
              _in: focusTopic.actions
            },
          },
          fields: ['*', '**', "cooperations.*", "slides.*"]
        }
      })
      const allActionTranslationsUngrouped = await getItems({
        collection: 'focus_topic_actions_translations',
        params: {
          filter: {
            focus_topic_actions_id: {
              _in: focusTopic.actions
            },
          },
          fields: ['series_popup_key', 'series_popup_stations', 'languages_code']
        }
      })
      allActionTranslations = allActionTranslationsUngrouped.reduce((acc, entry) => {
        if (!acc[entry.series_popup_key]) {
          acc[entry.series_popup_key] = {}
        }
        acc[entry.series_popup_key][entry.languages_code] = entry.series_popup_stations
        return acc;
      }, {})
      console.log(JSON.stringify(allActionTranslations, null, 2))
    }


    focusTopicTranslations = focusTopicTranslationsRes && focusTopicTranslationsRes[0];

    const logosPromises = actionTranslations.map(async a => {
      const ids = a.cooperations.map(c => c.Logos_id) || []
      if (!ids.length) {
        return []
      }
      const logos = await getItems({
        collection: 'Logos',
        params: {
          filter: {
            id: {
              _in: ids
            },
          },
        }
      })
      a.cooperations = logos;
    })
    const sliderPromises = actionTranslations.map(async a => {
      const ids = a.slides.map(s => s.focus_topic_images_id) || []
      if (!ids.length) {
        return []
      }
      const slides = await getItems({
        collection: 'focus_topic_images',
        params: {
          filter: {
            id: {
              _in: ids
            },
          },
          fields: ['*', '**', 'translations.*']
        }
      })
      a.slides = slides.map(slide => {
        const trans = slide.translations.find(t => t.languages_code === currentLocale.iso)
        return {
          ...trans,
          image: slide.image
        }
      })
    })
    await Promise.all(
      [...logosPromises,
      ...sliderPromises]
    )

  } catch (error) {
    console.log('DIRECTUS Fetch Error', error)
  }

  return {
    ...focusTopic,
    ...focusTopicTranslations,
    actions: actionTranslations,
    stations: allActionTranslations,
    parentNav,
    currentNav
  };


});

onMounted(async () => {
  try {
    const ids = data.value.highlights_ids.map(i => i.id);
    if (ids && ids.length) {
      const promises = ids.map(async id => {
        try {
          return await $fetch(config.public.privateApiUrl + '/activities/' + id)
        } catch (error) {
          return null;
        }
      })

      if (promises && promises.length) {
        const allResults = await Promise.all(promises)
        const clearedResults = allResults.filter(r => r !== null);
        highlights.value = clearedResults;
      }
    }

  } catch (e) {
    highlights.value = [];
  }
})


function menuItemActive(fragments) {
  return fragments.includes(route.hash)
}


function setPopupOpen(key) {
  openPopup.value = key;
}

function handleClosePopup() {
  openPopup.value = undefined;
}


function handleSuccess() {
  wasSubscriptionSuccess.value = true;
}

const title = data.value.title;

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
.content-section {
  padding-bottom: 0;
}

.content-section-wrapper {
  width: 100%;
}

.hero {
  overflow: hidden;
  padding-top: 0px;
  background: linear-gradient(45deg,
      white 74%,
      var(--gw-yellow) 74%,
      var(--gw-yellow) 82%,
      var(--dan-blue) 82%);
  background-repeat: no-repeat;

  .breadcrumbs-section {
    padding: 0;
    padding-top: 20px;
    padding-bottom: 20px;

    .breadcrumbs {
      flex-grow: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

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
    padding: 0;
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

      .external-link {
        width: fit-content;
      }
    }
  }
}

.description-entry {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;

  .number {
    background-color: var(--gw-blue-dark);
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    line-height: 24px;
    font-weight: 800;
    flex-shrink: 0;
  }
}

.description-source {
  margin-left: auto;
  font-size: 12px;
  line-height: 14px;
  margin-top: 16px;
}

.sdgs {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.sidebar-layout {
  display: flex;
  flex-direction: column;
  gap: 60px;


  .sidebar-menu {

    width: 201px;
    height: 200px;
    position: relative;
    background-color: var(--gw-blue-light);

    .menu-items {
      position: absolute;
      left: 64px;
      top: -10px;
      width: 250px;
      display: grid;
      gap: 1rem;

      .menu-item {

        display: block;
        width: fit-content;
        text-decoration: none;
        position: relative;
        z-index: 10;
        cursor: pointer;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0rem;
          background-color: var(--gw-yellow);
          height: .5rem;
          width: 0%;
          z-index: -1;
          transition: width 200ms;

        }

        &.active,
        &.isActive {
          font-weight: 600;
        }

        &.active,
        &:hover {
          &::after {
            width: 100%;
          }
        }
      }
    }

  }

  .content {
    section {
      padding: 0;
    }

    .faq {
      margin-top: 16px;
    }

    .nav-section {
      margin-bottom: 120px;

      &.knowledge-section-space {
        margin-bottom: 0;
      }

      &.highlights-section {
        margin-bottom: 0;
      }

      &.small-gap {
        margin-bottom: 40px;
      }

      .inner-section {
        margin-bottom: 40px;

        .header-image {
          height: 240px;
        }

        .inner-layout-vertical {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .inner-layout-image-content {
          display: grid;

          gap: 24px;

          .image-col {
            width: 400px;
          }

          .content-col {
            display: grid;
            gap: 24px;
            grid-auto-rows: min-content;
          }
        }


      }
    }

  }
}


.knowledge-section {
  .list-title {
    font-size: 14px;

    background: none;
  }

  .list {
    display: grid;
    gap: 1rem;

    .icon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    .list-item {
      display: flex;
      align-items: center;
      gap: 2rem;
      min-height: 40px;
    }
  }
}

.carousel-section {
  .carousel-title-wrapper {
    margin: auto;
    max-width: 90vw;
    text-align: center;

    .carousel-title {
      margin-bottom: 40px;
    }
  }

}





@media screen and (min-width: 1000px) {
  .sidebar-layout {
    display: grid;
    grid-template-columns: 300px minmax(0px, 1fr);


    .sidebar-menu {
      position: sticky;
      top: 40px;
      width: 300px;
    }

    .content {
      min-width: 0px;

      .nav-section {
        .inner-section {


          .inner-layout-image-content {
            grid-template-columns: 1fr;
          }
        }
      }
    }

  }

  .description-entry {
    flex-direction: row;
    gap: 40px;
    align-items: center;
  }

  .carousel-section {
    padding-top: 0;

    .carousel-title-wrapper {
      padding-left: 360px;
      text-align: left;
    }
  }
}

@media screen and (min-width: 1400px) {
  .sidebar-layout {
    grid-template-columns: 300px 1fr;



    .content {
      .nav-section {
        .inner-section {

          .inner-layout-vertical {
            display: grid;
            gap: 24px;

          }

          .inner-layout-image-content {
            grid-template-columns: 400px 1fr;
          }
        }
      }
    }

  }
}
</style>