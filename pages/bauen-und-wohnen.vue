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
            <a class="menu-item" href="#hintergrund" :class="{ active: isActive('hintergrund') }">
              {{ data.background_menu }}
            </a>
            <a class="menu-item" href="#bauwende-unterwegs" :class="{ active: isActive('bauwende-unterwegs') }">
              {{
                data.turnaround_menu }}</a>
            <a class="menu-item" href="#transformathon" :class="{ active: isActive('transformathon') }">{{
              data.transformathon_menu }}</a>
            <a class="menu-item" href="#wissenssammlung" :class="{ active: isActive('wissenssammlung') }">{{
              data.knowledge_menu }}</a>
          </nav>
        </div>
        <div class="content">
          <section class="nav-section" id="hintergrund" data-track-menu>
            <div class="inner-section">
              <div class="inner-layout-vertical">

                <div v-if="data.background_title">
                  <h2 class="blue">{{ data.background_title }}</h2>
                </div>
                <div class="background-entry font-2" v-if="data.background_entries?.length"
                  v-for="( entry, index) in data.background_entries">
                  <div class="number">
                    {{ index + 1 }}
                  </div>
                  <div v-html="entry.content">

                  </div>
                </div>
                <div class="background-source">{{ data.background_source }}</div>
              </div>
            </div>

          </section>
          <section class="nav-section">
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div>
                  <h3 class="no-decoration" v-if="data.focus_goals_title">{{
                    data.focus_goals_title }}</h3>
                </div>
                <div class="html no-margin " v-if="data.focus_goals_content" v-html="data.focus_goals_content"></div>
                <div class="sdgs">
                  <LinkedLogo width="120px" height="120px" v-for="sdg in data.logos" :logo="sdg"></LinkedLogo>
                </div>

              </div>
            </div>
          </section>
          <section class="nav-section small-gap">
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div>
                  <h2 class="blue" v-if="data.participate_title">{{
                    data.participate_title }}</h2>
                </div>
                <div class="html no-margin " v-if="data.participate_content" v-html="data.participate_content"></div>
              </div>
            </div>
          </section>
          <section class="nav-section" id="bauwende-unterwegs" data-track-menu>
            <div class="inner-section">
              <ParticipateActivity :title="data.turnaround_title" :content="data.turnaround_content"
                :image="data.turnaround_image" :logos="data.turnaround_logos" :logoLabel="data.turnaround_logos_label"
                :button="data.turnaround_button_text" :sliderTitle="data.turnaround_image_slider_title"
                :slider="!!data.imageSlider?.length" @action-clicked="handleOpenTurnaroundPopup">
                <Carousel :items="data.imageSlider" :component="ImageSlide" framedCards>
                </Carousel>
              </ParticipateActivity>

            </div>
          </section>
          <section class="nav-section" id="transformathon" data-track-menu>
            <div class="inner-section">
              <ParticipateActivity :title="data.transformathon_title" :content="data.transformathon_content"
                :image="data.transformathon_image" :logos="data.transformathon_logos"
                :logoLabel="data.transformathon_logos_label" :button="data.transformathon_button_text"
                :sliderTitle="data.transformathon_image_slider_title" :slider="!!data.transformathonImageSlider?.length"
                @action-clicked="handleOpenTransformathonPopup">
                <Carousel :items="data.transformathonImageSlider" :component="ImageSlide" framedCards>
                </Carousel>
              </ParticipateActivity>

            </div>
          </section>

          <section class="nav-section knowledge-section" id="wissenssammlung" data-track-menu>
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

        </div>
      </div>
    </section>
    <section class="carousel-section">
      <div class="carousel-title-wrapper">
        <h2 class="carousel-title" v-if="data.main_topics_title">{{
          data.main_topics_title }}</h2>
      </div>
      <div class="carusel-wrapper">
        <Carousel :items="highlights" :component="OrgaActivitySlide" framedCards></Carousel>
      </div>


    </section>

    <template>
      <PopUp :open="turnaroundPopupOpen" @popupClosed="handleCloseTurnaroundPopup">
        <PopUpContent :title="data.turnaround_popup_title"
          :content="wasSubscriptionSuccess ? '' : data.turnaround_popup_content">
          <SubscriptionForm endpoint="building-housing-contact-form" :options="data.stations" @success="handleSuccess">
          </SubscriptionForm>
        </PopUpContent>
      </PopUp>
      <PopUp :open="transformathonPopupOpen" @popupClosed="handleCloseTransformathonPopup">
        <PopUpContent :title="data.transformathon_popup_title" :content="data.transformathon_popup_content">
          <NewsletterForm @submitted="handleCloseTransformathonPopup"></NewsletterForm>
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
const turnaroundPopupOpen = ref(false)
const transformathonPopupOpen = ref(false)
const wasSubscriptionSuccess = ref(false)

const { data, pending, error, refresh } = await useAsyncData('dan', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let buildingAndLiving = {};
  let buildingAndLivingTranslations = {};
  let buildingAndLivingImages = {}
  let buildingAndLivingImagesTranslations = {}
  let transformathonImages = {}
  let transformathonImagesTranslations = {}
  let logos = [];
  let turnaround_logos = [];
  let transformathon_logos = [];
  let projects = [];
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
    currentNav = parentNav?.submenu.find(s => s.target === 'bauen-und-wohnen');
    const buildingAndLivingPromise = getSingletonItem({ collection: 'building_and_living' })
    const buildingAndLivingImagesPromise = getSingletonItem({ collection: 'building_and_living_images' })
    const transformathonImagesPromise = getSingletonItem({ collection: 'transformathon_images' })

    const buildingAndLivingTranslationsPromise = await getItems({
      collection: 'building_and_living_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso, //'en-US',

        },
        fields: ['*', '**']
      }
    })
    const buildingAndLivingImagesTranslationsPromise = await getItems({
      collection: 'building_and_living_images_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso, //'en-US',

        },
        fields: ['*', '**']
      }
    })
    const transformathonImagesTranslationsPromise = await getItems({
      collection: 'transformathon_images_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso, //'en-US',

        },
        fields: ['*', '**']
      }
    })

    const [buildingAndLivingResp,
      buildingAndLivingImagesResp,
      transformathonImagesResp,
      buildingAndLivingTranslationsRes,
      buildingAndLivingImagesTranslationsRes,
      transformathonImagesTranslationsRes] = await Promise.all([
        buildingAndLivingPromise, buildingAndLivingImagesPromise, transformathonImagesPromise, buildingAndLivingTranslationsPromise, buildingAndLivingImagesTranslationsPromise, transformathonImagesTranslationsPromise])
    buildingAndLiving = buildingAndLivingResp
    buildingAndLivingImages = buildingAndLivingImagesResp
    transformathonImages = transformathonImagesResp
    buildingAndLivingImagesTranslations = buildingAndLivingImagesTranslationsRes
    transformathonImagesTranslations = transformathonImagesTranslationsRes




    buildingAndLivingTranslations = buildingAndLivingTranslationsRes && buildingAndLivingTranslationsRes[0];



    if (buildingAndLivingTranslations?.focus_goals_sdgs?.length) {

      const logoData = await getItems({
        collection: 'sdgs',
        params: {
          filter: {
            id: {
              _in: buildingAndLivingTranslations.focus_goals_sdgs || [],
            },
          },
        }
      })

      logos = logoData || []

    }
    if (buildingAndLivingTranslations?.turnaround_logos?.length) {

      const logoData = await getItems({
        collection: 'Logos',
        params: {
          filter: {
            id: {
              _in: buildingAndLivingTranslations.turnaround_logos || [],
            },
          },
        }
      })

      turnaround_logos = logoData || []

    }
    if (buildingAndLivingTranslations?.transformathon_logos?.length) {

      const logoData = await getItems({
        collection: 'Logos',
        params: {
          filter: {
            id: {
              _in: buildingAndLivingTranslations.transformathon_logos || [],
            },
          },
        }
      })

      transformathon_logos = logoData || []

    }


  } catch (error) {
    console.log('DIRECTUS Fetch Error', error)
  }

  const imageSlider = buildingAndLivingImages.map((image, index) => {

    const t = buildingAndLivingImagesTranslations.find(translations => translations.building_and_living_images_id === image.id)
    image.alt = t?.alt
    image.copyright = t?.copyright

    return image;
  })
  const transformathonImageSlider = transformathonImages.map((image, index) => {

    const t = transformathonImagesTranslations.find(translations => translations.transformathon_images_id === image.id)
    image.alt = t?.alt
    image.copyright = t?.copyright

    return image;
  })
  const stations = buildingAndLivingTranslations.turnaround_steps ? buildingAndLivingTranslations.turnaround_steps.filter(s => {
    return s.active;
  }) : [];
  return {
    ...buildingAndLiving,
    ...buildingAndLivingTranslations,
    imageSlider: imageSlider,
    transformathonImageSlider: transformathonImageSlider,
    stations: stations,
    projects: projects,
    logos: logos,
    turnaround_logos: turnaround_logos,
    transformathon_logos: transformathon_logos,
    parentNav,
    currentNav
  };


});

onMounted(async () => {
  try {
    const ids = data.value.main_topics_item_ids.map(i => i.id);
    if (ids && ids.length) {
      const promises = ids.map(async id => {
        try {
          return await $fetch(config.privateApiUrl + '/activities/' + id)
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


function handleOpenTransformathonPopup() {
  transformathonPopupOpen.value = true;
}

function handleCloseTransformathonPopup() {
  transformathonPopupOpen.value = false;
}

function handleOpenTurnaroundPopup() {
  wasSubscriptionSuccess.value = false;
  turnaroundPopupOpen.value = true;
}

function handleCloseTurnaroundPopup() {
  turnaroundPopupOpen.value = false;
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

.background-entry {
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

.background-source {
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
    height: 156px;
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
        &.isActive,
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

      &.knowledge-section {
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

  .background-entry {
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