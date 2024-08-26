<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <div :class="{ safari: isSafari, 'sidenav-open': sidebarOpen }">
      <header class="header">
        <div class="content-left">
          <Logo :id="'header-logo'" />
          <MenuMain
            :id="'header-menu-main'"
            :user="userInfo"
            :items="data.menuItems"
          />
        </div>

        <div class="header-actions">
          <MenuAccount
            :id="'header-menu-account'"
            :loggedIn="true || loggedIn"
            @logout="handleLogout"
            items="menuItems"
          />
          <LangSwitch @langChanged="handleLangChanged" />
        </div>
        <div class="hamburger-wrapper sidenav-toggle">
          <button
            type="button"
            class="hamburger hamburger--collapse"
            aria-label="menu"
            @click="toogleSidebar"
            :class="sidebarOpen ? 'is-active' : ''"
          >
            <span class="hamburger-box"
              ><span class="hamburger-inner"></span
            ></span>
          </button>
        </div>
      </header>
      <main>
        <slot />
      </main>
      <Footer
        :footer-content="data?.footerContent"
        :menuItems="data.menuItems"
        :social-media-links="data?.socialMediaLinks"
        :paticipactionDeclaration="data?.paticipactionDeclaration"
      />

      <div class="sidenav">
        <div class="logo-wrapper" @click="closeSidebar">
          <Logo :id="'sidenav-logo'" />
        </div>
        <MenuMain
          :id="'sidenav-menu-main'"
          :user="user"
          :items="data.menuItems"
          @closeSidebar="closeSidebar"
        />
        <div class="separator"></div>
        <div class="sidenav-actions">
          <div @click="closeSidebar">
            <LangSwitch @langChanged="handleLangChanged" />
          </div>
          <MenuAccount
            :id="'sidenav-menu-account'"
            :loggedIn="!!user"
            @logout="() => handleLogout(localePath('index'))"
          />
        </div>
      </div>
      <div class="backdrop"></div>
      <div class="hamburger-wrapper sidenav-toggle">
        <button
          type="button"
          class="hamburger hamburger--collapse"
          aria-label="menu"
          @click="toogleSidebar"
          :class="sidebarOpen ? 'is-active' : ''"
        >
          <span class="hamburger-box"
            ><span class="hamburger-inner"></span
          ></span>
        </button>
      </div>
      <CookieBanner></CookieBanner>
      <template v-if="data?.popup">
        <PopUp
          :open="popupOpen"
          close-button-light
          @popup-closed="handlePopupClosed"
        >
          <AddPopUpContent
            :imgId="data.popup.image?.id"
            :badgeImgId="data.popup.circle_image?.id"
            :summary="data.popup.description"
            :title="data.popup.title"
            :moreBtn="data.popup.more_button_text"
            :moreBtnUrl="data.popup.more_button_url"
            :linkBtn="data.popup.link_button_text"
            :linkBtnUrl="data.popup.link_button_url"
            @add-clicked="handlePopupClosed"
          ></AddPopUpContent>
        </PopUp>
      </template>
    </div>
  </Html>
</template>

<script setup>
import { disabelOnClose, isDisabled, openAfter } from '../utils/popup';

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
});

const { getItems, getSingletonItem } = useDirectusItems();
const { getFiles } = useDirectusFiles();
const { $i18n, $stringify } = useNuxtApp();
const { t } = useI18n();
const { $decodeJwt, $assetURL } = useNuxtApp();
const config = useRuntimeConfig();

const user = ref(null);
const auth = ref(null);
const interval = ref(null);
const sidebarOpen = ref(false);
const isSafari = ref(false);
const authConfig = ref(null);
const popupOpen = ref(false);
const { loggedIn, ready, userInfo, logout } = useAuth(config.public.keycloak);

const { data, pending, error, refresh } = await useAsyncData(
  'default',
  async () => {
    const currentLocale = $i18n.locales.value.find(
      (i) => i.code === $i18n.locale.value
    );
    let lpTranslations = [];
    let lp = {};
    let files = null;
    let popup = null;
    let menuItems = [];

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
      menuItems = (nav[0] && nav[0].nav_item) || [];

      menuItems = menuItems.map((item) => {
        if (item.submenu) {
          return {
            ...item,
            submenu: item.submenu.map((submenu) => {
              if (submenu.target === 'fokus') {
                submenu.target = `/${submenu.target}/${submenu.slug}`;
                submenu.slug = null;
              }
              return submenu;
            }),
          };
        }
        return item;
      });

      lp = await getSingletonItem({
        collection: 'landingpage',
      });

      if (lp.popup) {
        const popupTranslationData = await getItems({
          collection: 'pop_ups_translations',
          params: {
            filter: {
              pop_ups_id: {
                id: lp.popup,
              },
              languages_code: currentLocale.iso, //'en-US'
            },

            fields: ['*', '*.*'],
          },
        });

        popup = {
          ...popupTranslationData[0],
          ...popupTranslationData[0].pop_ups_id,
        };
      }

      const filter = {
        languages_id: currentLocale.iso, //'en-US'
      };
      lpTranslations = await getItems({
        collection: 'landingpage_translations',
        params: {
          filter: filter,
        },
      });
      files = await getFiles({
        params: {
          filter: {
            id: {
              _in: [
                lpTranslations.find((d) => d.languages_id == 'en-US')
                  ?.heroImageLandscape,
                lpTranslations.find((d) => d.languages_id == 'de-DE')
                  ?.heroImageLandscape,
              ],
            },
          },
        },
      });
    } catch (error) {
      console.log('DIRECTUS Fetch Error', error);
    }
    const lpTrans = lpTranslations[0];
    return {
      paticipactionDeclaration: lpTrans?.participation_declaration,
      seoDescription: lpTrans?.metaDescription,
      seoImage: lpTrans?.og_image,
      seoImageAlt: files[0]?.description || files[0]?.title,
      socialMediaLinks: lp.social_media_links,
      footerContent: lpTrans?.footerContent,
      popup: popup,
      menuItems: menuItems,
    };
  }
);

function safari() {
  isSafari.value = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

async function handleLangChanged() {
  refresh();
}
function toogleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
function closeSidebar() {
  sidebarOpen.value = false;
}

async function handleLogout(redirect) {
  const tokens = [
    'access_token',
    'access_token_stored_at',
    'refresh_token',
    'id_token',
    'id_token_stored_at',
    'id_token_expires_at',
    'id_token_claims_obj',
  ];
  tokens.forEach((key) => {
    localStorage.removeItem(key);
  });
  await logout(redirect);
}

function handlePopupClosed() {
  popupOpen.value = false;
  disabelOnClose();
}

onMounted(async () => {
  try {
    authConfig.value = await $fetch(config.public.authConfigUrl);
  } catch (error) {
    console.log('Cannot load config');
  }
  safari();
  if (!isDisabled()) {
    openAfter(data.value.popup?.open_after_seconds, () => {
      popupOpen.value = true;
    });
  }
});

onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});

useHead({
  title: t('page.title'), //'Gemeinschaftswerk Nachhaltigkeit',
  titleTemplate: '%s - ' + t('page.title'),
  meta: [
    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
    {
      hid: 'description',
      name: 'description',
      content: data.value?.seoDescription || '',
    },
    {
      hid: 'og-description',
      property: 'og:description',
      content: data.value?.seoDescription || '',
    },
    {
      hid: 'og-image',
      property: 'og:image',
      content: $assetURL(data.value?.seoImage),
    },
    {
      hid: 'og-image-alt',
      property: 'og:image:alt',
      content: data.value?.seoImageAlt || '',
    },
    {
      hid: 'twitter-card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter-site',
      name: 'twitter:site',
      content: '@gw_undjetztalle',
    },
  ],
});
</script>

<style lang="scss">
#header-menu-main {
  display: flex;
  flex-grow: 1;
}

.search-icon {
  display: flex;
  align-items: center;
  padding-inline: 0.5rem;
}

.sidenav-toggle .icon {
  margin: 20px;
}

button.sidenav-toggle {
  background: #fff;
  border-radius: 50%;
}

.hamburger-wrapper {
  position: fixed;
  right: 10px;
  top: 0.75rem;
  /* top: 1rem;*/
  z-index: 9000;
  background-color: white;
  height: 3rem;
  width: 3rem;
  /*height: 5rem;
  width: 5rem;*/
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4px;
}

.hamburger.is-active:hover,
.hamburger:hover {
  opacity: 0.7;
}

.hamburger {
  padding: 15px 15px;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
}

.hamburger-box {
  width: 30px;
  height: 16px;
  display: inline-block;
  position: relative;
}

.hamburger--collapse.is-active .hamburger-inner {
  transform: translate3d(0, -7px, 0) rotate(-45deg);
  transition-delay: 0.22s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}

.hamburger--collapse .hamburger-inner {
  top: auto;
  bottom: 0;
  transition-duration: 0.13s;
  transition-delay: 0.13s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 30px;
  height: 2px;
  background-color: #19486a;
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -1px;
}

.hamburger-inner::before {
  top: -7px;
}

.hamburger-inner::before,
.hamburger-inner::after {
  content: '';
  display: block;
}

.hamburger--collapse.is-active .hamburger-inner::before {
  top: 0;
  transform: rotate(-90deg);
  transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
    transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.hamburger--collapse.is-active .hamburger-inner::after {
  opacity: 0;
}

.hamburger--collapse .hamburger-inner::after {
  top: -14px;
  transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    opacity 0.1s linear;
}

.hamburger--collapse .hamburger-inner::before {
  transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

@media screen and (min-width: 1600px) {
  .sidenav-toggle {
    display: none;
    visibility: hidden;
  }
}

.sidenav {
  z-index: -1;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 375px;
  height: 100vh;
  display: block;
  background-color: #fff;
  width: 375px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, visibility;
  transform: translateX(-110%);
  box-shadow: 0 8px 10px -5px #0003, 0 16px 24px 2px #00000024,
    0 6px 30px 5px #0000001f;
}

.backdrop {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  opacity: 0;
  transition: all 500ms;
}

@media screen and (max-width: 1599px) {
  #header-menu-main,
  .header-actions {
    display: none;
    visibility: hidden;
  }

  .sidenav {
    z-index: 9000;
    opacity: 1;
    transform: translateX(-110%);
  }

  .sidenav-open .sidenav {
    overflow-y: auto;
    transform: translateX(0%);
  }

  .sidenav-open .backdrop {
    z-index: 8000;
    background: rgba(0, 0, 0, 0.6);
    opacity: 1;
  }

  .sidenav-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: column;
  }

  .sidenav-actions .button {
    flex-grow: 1;
  }

  #sidenav-menu-main {
    flex-direction: column;
    display: flex;
  }

  #sidenav-menu-main a {
    z-index: 1;
  }

  #sidenav-logo {
    height: 70px;
  }

  .separator {
    height: 2px;
    background-color: var(--gw-blue-dark);
    margin: 32px 0;
  }
}

header {
  box-shadow: 4px 4px 4px rgb(0 0 0 / 25%);
  z-index: 10;
  position: absolute;
  width: 100%;
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 32px;
  height: 70px;
}

header > div {
  display: flex;
  align-items: center;
  gap: 16px;
}

header .content-left {
  flex-grow: 1;
}

@media screen and (min-width: 1600px) {
  header {
    padding: 0 56px;
  }
}

main {
  padding-top: 70px;
}
</style>
