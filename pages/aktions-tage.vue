<template>
  <div class="page">
    <section class="hero">
      <section class="content-section breadcrumbs-section">
        <div class="breadcrumbs content-section-wrapper">
          <div>
            {{ data.parentNav?.name }}
            <span class="arrow">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.4 12L0 10.6L4.6 6L0 1.4L1.4 0L7.4 6L1.4 12Z"
                  fill="#19486A"
                />
              </svg>
            </span>
          </div>
          <div class="current">{{ data.currentNav?.name }}</div>
        </div>
      </section>
      <section class="content-section page-hero">
        <content-with-video
          :title="data.title"
          :content="data.content"
          :video="data.video"
          :image="data.video_placeholder || ''"
        >
          <div class="actions" v-if="data.button_url && data.button_text">
            <div class="external-link">
              <LinkButton
                size="lg"
                external
                variant="solid"
                :url="data.button_url"
                >{{ data.button_text }}</LinkButton
              >
            </div>
            <Feature feature="dan-range">
              <div class="external-link">
                <LinkButton
                  size="lg"
                  external
                  variant="outline"
                  icon="map"
                  :url="$config.public.appUrl + '/map?viewType=DAN'"
                  >{{ $t('btn.showOnMap') }}</LinkButton
                >
              </div>
            </Feature>
          </div>
        </content-with-video>
      </section>
    </section>
    <section class="content-section lighthouse">
      <div class="content-section-wrapper sidebar-layout">
        <div class="sidebar-menu">
          <nav class="menu-items accent-font">
            <a
              class="menu-item"
              href="#ziel"
              :class="{ active: isActive('ziel') }"
            >
              {{ data.dan_explained_menu }}
            </a>
            <a
              class="menu-item"
              href="#mitmachen"
              :class="{ active: isActive('mitmachen') }"
            >
              {{ data.participate_menu }}</a
            >
            <a
              class="menu-item"
              href="#zusammenfuermorgen"
              :class="{ active: isActive('zusammenfuermorgen') }"
              >{{ data.together_menu }}</a
            >
            <Feature feature="lighthouse_projects">
              <a
                class="menu-item"
                href="#leuchturmprojekte"
                :class="{ active: isActive('leuchturmprojekte') }"
                >{{ data.lighthouse_projects_menu }}</a
              >
            </Feature>
          </nav>
        </div>
        <div class="content">
          <section class="nav-section" id="ziel" data-track-menu>
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div class="header-image" v-if="data.dan_explained_image">
                  <ContentSectionImage
                    :id="data.dan_explained_image"
                    :alt="data.dan_explained_image"
                  >
                  </ContentSectionImage>
                </div>
                <div v-if="data.dan_explained_goals_title">
                  <h2 class="blue">{{ data.dan_explained_goals_title }}</h2>
                </div>
                <div
                  class="html"
                  v-if="data.dan_explained_goals_content"
                  v-html="data.dan_explained_goals_content"
                ></div>
              </div>
            </div>
            <div class="inner-section">
              <div class="inner-layout-image-content">
                <div
                  class="image-wrapper"
                  :style="{
                    height: data.dan_explained_sus_week_image_height + 'px',
                  }"
                >
                  <ContentSectionImage
                    v-if="data.dan_explained_sutainablility_week_image"
                    :id="data.dan_explained_sutainablility_week_image"
                    :alt="data.dan_explained_sutainablility_week_image_alt"
                  >
                  </ContentSectionImage>
                </div>
                <div class="content-col">
                  <div v-if="data.dan_explained_sutainablility_week_title">
                    <h2 class="blue">
                      {{ data.dan_explained_sutainablility_week_title }}
                    </h2>
                  </div>
                  <div
                    class="html no-margin"
                    v-if="data.dan_explained_sutainablility_week_content"
                    v-html="data.dan_explained_sutainablility_week_content"
                  ></div>
                </div>
              </div>
            </div>
          </section>
          <section id="mitmachen" class="nav-section" data-track-menu>
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div class="header-image">
                  <ContentSectionImage
                    v-if="data.participate_image"
                    :id="data.participate_image"
                    :alt="data.participate_image"
                  >
                  </ContentSectionImage>
                </div>
                <div>
                  <h2 class="blue" v-if="data.participate_title">
                    {{ data.participate_title }}
                  </h2>
                </div>
                <div
                  class="faq"
                  v-if="
                    data.participate_accordion &&
                    data.participate_accordion.length
                  "
                >
                  <accordion>
                    <accordion-entry
                      v-for="entry of data.participate_accordion"
                      color="orange"
                      :key="entry.title"
                      :title="entry.title"
                      :subtitle="entry.subtitle"
                      :content="entry.content"
                    />
                  </accordion>
                </div>
              </div>
            </div>
          </section>
          <section id="zusammenfuermorgen" class="nav-section" data-track-menu>
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div class="header-image">
                  <ContentSectionImage
                    v-if="data.together_image"
                    :id="data.together_image"
                    :alt="data.together_image"
                  >
                  </ContentSectionImage>
                </div>
                <div>
                  <h2 class="blue" v-if="data.together_title">
                    {{ data.together_title }}
                  </h2>
                </div>
                <div
                  class="html"
                  v-if="data.together_content"
                  v-html="data.together_content"
                ></div>
              </div>
            </div>
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div>
                  <h2 class="blue" v-if="data.together_partner_title">
                    {{ data.together_partner_title }}
                  </h2>
                </div>
                <div
                  class="html"
                  v-if="data.together_partner_content"
                  v-html="data.together_partner_content"
                ></div>
              </div>
              <div
                class="carousel-wrapper"
                v-if="data.logos && data.logos.length"
              >
                <div class="shadow">
                  <Carousel
                    :items="data.logos"
                    :component="DanPartnerLogo"
                    itemKey="logo"
                    :intervalTime="4000"
                    actionsRight
                  >
                  </Carousel>
                </div>
              </div>
            </div>
          </section>
          <section id="leuchturmprojekte" class="nav-section" data-track-menu>
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div>
                  <h2 class="blue" v-if="data.lighthouse_projects_title">
                    {{ data.lighthouse_projects_title }}
                  </h2>
                </div>
                <div
                  class="html"
                  v-if="data.lighthouse_projects_content"
                  v-html="data.lighthouse_projects_content"
                ></div>
              </div>
            </div>
            <div class="inner-section">
              <div class="inner-layout-vertical">
                <div>
                  <h2 class="blue" v-if="data.lighthouse_projects_year_title">
                    {{ data.lighthouse_projects_year_title }}
                  </h2>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <div class="carousel-wrapper" v-if="data.projects && data.projects.length">
      <Carousel
        :items="data.projects"
        :component="DanLighthouseProject"
        :intervalTime="4000"
      >
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import DanLighthouseProject from '../components/DanLighthouseProject.vue';
import DanPartnerLogo from '../components/DanPartnerLogo.vue';

const { t } = useI18n();
const route = useRoute();
const { $i18n } = useNuxtApp();
const { getItems, getSingletonItem } = useDirectusItems();
const { isActive } = useTrackMenu();

const { data, pending, error, refresh } = await useAsyncData(
  'dan',
  async () => {
    const currentLocale = $i18n.locales.value.find(
      (i) => i.code === $i18n.locale.value
    );
    let danTranslations = {};
    let dan = {};
    let logos = [];
    let projects = [];
    let parentNav = {};
    let currentNav = {};
    try {
      const nav = await getItems({
        collection: 'navigation_translations',
        params: {
          filter: {
            languages_code: currentLocale.iso,
          },
          fields: ['*', '**'],
        },
      });
      const navItems = (nav[0] && nav[0].nav_item) || [];
      parentNav = navItems.find((i) => i.key === 'activities');
      currentNav = parentNav?.submenu.find((s) => s.target === 'aktions-tage');
      dan = await getSingletonItem({ collection: 'dan' });

      const danTranslationsResult = await getItems({
        collection: 'dan_translations',
        params: {
          filter: {
            languages_code: currentLocale.iso, //'en-US'
          },
        },
      });

      danTranslations = danTranslationsResult && danTranslationsResult[0];

      if (danTranslations?.together_partner_logos?.length) {
        const logoData = await getItems({
          collection: 'Logos',
          params: {
            filter: {
              id: {
                _in: danTranslations.together_partner_logos || [],
              },
            },
          },
        });

        logos = logoData || [];
      }
      if (danTranslations?.lighthouse_projects_cards?.length) {
        const projectsTranslations =
          (await getItems({
            collection: 'lighthouse_projects',
            params: {
              filter: {
                id: {
                  _in: danTranslations.lighthouse_projects_cards || [],
                },
              },
            },
          })) || [];

        projects = projectsTranslations.map((p) => {
          return {
            ...p,
            ...p.lighthouse_projects_id,
          };
        });
      }
    } catch (error) {
      console.log('DIRECTUS Fetch Error', error);
    }

    return {
      ...dan,
      ...danTranslations,
      projects: projects,
      logos: logos,
      parentNav,
      currentNav,
    };
  }
);
function menuItemActive(fragments) {
  return fragments.includes(route.hash);
}

const title = data.value.title;

useHead({
  title: title,
  meta: [
    {
      hid: 'og-title',
      property: 'og:title',
      content: title + ' - ' + t('page.title'),
    },
  ],
});
</script>

<style scoped lang="scss">
.content-section-wrapper {
  width: 100%;
}

.hero {
  overflow: hidden;
  padding-top: 0px;
  background: linear-gradient(
    45deg,
    white 74%,
    var(--gw-orange) 74%,
    var(--gw-orange) 82%,
    var(--gw-blue-light) 82%
  );
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

    .actions {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      .external-link {
        width: fit-content;
      }
    }
  }
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
    margin-bottom: 4rem;

    .menu-items {
      position: absolute;
      left: 64px;
      top: -10px;
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
          height: 0.5rem;
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

      &#zusammenfuermorgen {
        margin-bottom: 0;
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

          /* .image-wrapper {
            max-width: 300px;
          } */

          .content-col {
            display: grid;
            gap: 24px;
            grid-auto-rows: min-content;
          }
        }
      }

      &#zusammenfuermorgen {
        .inner-section {
          margin-bottom: 0px;
        }
      }
    }
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

.accordion-title {
  margin-bottom: 40px;
}

.lighthouse {
  padding: 0;

  #leuchturmprojekte {
    margin: 0;

    .inner-section {
      margin: 0;
    }
  }
}

.carousel-wrapper {
  padding: 24px 0 100px;
  width: 100%;

  .shadow {
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.12);
  }

  &.last {
    padding-bottom: 0;
  }
}

@media screen and (min-width: 1000px) {
  .sidebar-layout {
    display: grid;
    grid-template-columns: 300px 1fr;

    .sidebar-menu {
      position: sticky;
      top: 40px;
    }

    .content {
      .nav-section {
        .inner-section {
          .inner-layout-image-content {
            grid-template-columns: 1fr;
          }
        }
      }
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
            display: flex;

            .image-wrapper {
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
}
</style>
