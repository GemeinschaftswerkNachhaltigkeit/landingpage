<template>
  <div :class="sidebarOpen ? 'sidenav-open' : ''">
    <header class="header">
      <div class="content-left">
        <Logo :id="'header-logo'" />
        <MenuMain :id="'header-menu-main'" :user="user" v-if="!pre_release_version" />
      </div>
      <div class="header-actions">
        <MenuAccount :id="'header-menu-account'" :loggedIn="!!user" @logout="logout" v-if="!pre_release_version" />
        <LangSwitch @langChanged="handleLangChanged" />
      </div>

      <div class="hamburger-wrapper sidenav-toggle">
        <button type="button" class="hamburger hamburger--collapse" @click="toogleSidebar"
          :class="sidebarOpen ? 'is-active' : ''">
          <span class="hamburger-box"><span class="hamburger-inner"></span></span>
        </button>
      </div>
    </header>
    <main>
      <Nuxt />
    </main>


    <Footer :hideMenu="pre_release_version" :paticipactionDeclaration="paticipactionDeclaration" />

    <div class="sidenav">
      <div class="logo-wrapper" @click="closeSidebar">
        <Logo :id="'sidenav-logo'" />
      </div>
      <MenuMain :id="'sidenav-menu-main'" :user="user" v-if="!pre_release_version" @closeSidebar="closeSidebar" />
      <div class="separator"></div>
      <div class="sidenav-actions">
        <div @click="closeSidebar">
          <LangSwitch />
        </div>
        <MenuAccount :id="'sidenav-menu-account'" :loggedIn="!!user" @logout="logout" v-if="!pre_release_version" />
      </div>
    </div>
    <div class="backdrop" @click="closeSidebar"></div>
    <div class="hamburger-wrapper sidenav-toggle">
      <button type="button" class="hamburger hamburger--collapse" @click="toogleSidebar"
        :class="sidebarOpen ? 'is-active' : ''">
        <span class="hamburger-box"><span class="hamburger-inner"></span></span>
      </button>
    </div>
    <CookieBanner></CookieBanner>
    <PopUp v-if="popup" :openAfter="popup.open_after_seconds" :imgId="popup.image?.id"
      :badgeImgId="popup.circle_image?.id" :summary="popup.description" :title="popup.title"
      :moreBtn="popup.more_button_text" :moreBtnUrl="popup.more_button_url" :linkBtn="popup.link_button_text"
      :linkBtnUrl="popup.link_button_url">
    </PopUp>
  </div>
</template>



<script>
import jwt_decode from "../plugins/jwt-decode";
export default {
  computed: {
    metaData() {
      return this.$store.state.metaData.find(
        (d) => d.languages_id == this.$currentLocaleIso()
      );
    },
  },
  data() {
    return {
      pre_release_version: false,
      sidebarOpen: false,
      user: null,
      interval: null,
      authConfig: null,
      paticipactionDeclaration: "",
      popup: null
    };
  },
  methods: {
    async handleLangChanged() {
      this.popup = null;
      await this.loadContent();
    },
    toogleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    async logout() {
      const accessToken = window.localStorage.getItem("access_token");
      const refreshToken = window.localStorage.getItem("refresh_token");

      if (this.authConfig && accessToken) {
        const { issuer, clientId } = this.authConfig.keycloak;
        const logoutEndpoint = `${issuer}/protocol/openid-connect/logout`;
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("refresh_token", refreshToken);
        try {
          await this.$axios.post(logoutEndpoint, params, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          localStorage.clear();
          this.checkToken();
        } catch (error) {
          console.log("Error during logout", error);
        }
      }
    },
    checkToken() {
      const accessToken = window.localStorage.getItem("access_token");
      let decodedJwt = null;

      if (accessToken) {
        decodedJwt = this.$decodeJwt(accessToken);
      }
      if (decodedJwt) {
        const exp = decodedJwt.exp * 1000;
        const now = Date.now();
        const isExpired = now > exp;
        if (accessToken && decodedJwt && !isExpired) {
          this.user = {
            firstName: decodedJwt?.given_name,
            lastName: decodedJwt?.family_name,
          };
        } else {
          this.user = null;
        }
      } else {
        this.user = null;
      }
    },
    async loadContent() {
      const currentLocale = this.$i18n.locales.find(
        (i) => i.code === this.$i18n.locale
      );

      const lp = await this.$directus
        .items("landingpage")
        .readOne(1);

      let popup = null;
      if (lp.popup) {
        const popupData = await this.$directus.items('pop_ups').readOne(1);
        const popupTranslationData = await this.$directus
          .items("pop_ups_translations")
          .readByQuery({
            filter: {
              pop_ups_id: {
                id: lp.popup,
              },
              languages_code: currentLocale.iso, //'en-US'
            },

            fields: ["*", "*.*"]
          });
        popup = { ...popupTranslationData.data[0], ...popupData }
      }

      const lpTranslations = await this.$directus
        .items("landingpage_translations")
        .readByQuery({
          filter: {
            languages_id: currentLocale.iso, //'en-US'
          },
        });

      this.popup = popup;
      this.pre_release_version = lpTranslations.data[0]?.pre_release_version;
      this.paticipactionDeclaration =
        lpTranslations.data[0]?.participation_declaration;
    },
  },
  async created() {
    try {
      const url = `${this.$config.apiProxyPrefixAlt}/ui/ui-config`;
      const authConfigResp = await this.$axios.get(url, {
        baseURL: this.$config.authConfigBaseUrl,
      });
      if (authConfigResp) {
        const authConfig = authConfigResp.data;

        this.authConfig = authConfig;
      }
    } catch (error) {
      console.log("Cannot load env config", error);
    }
  },
  mounted() {
    this.checkToken();
    this.interval = setInterval(() => {
      this.checkToken();
    }, 5000);
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  async fetch() {
    await this.loadContent();
  },
  head() {
    return {
      title: this.$t("page.title"), //'Gemeinschaftswerk Nachhaltigkeit',
      titleTemplate: "%s - " + this.$t("page.title"),
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.metaData.description,
        },
        {
          hid: "og-description",
          property: "og:description",
          content: this.metaData.description || "",
        },
        {
          hid: "og-image",
          property: "og:image",
          content: this.$assetURL(this.metaData.image?.id),
        },
        {
          hid: "og-image-alt",
          property: "og:image:alt",
          content: this.metaData.image?.description || "",
        },
        {
          hid: "twitter-card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter-site",
          name: "twitter:site",
          content: "@gw_undjetztalle",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#header-menu-main {
  display: flex;
  flex-grow: 1;
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

@media screen and (min-width: 1350px) {
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



@media screen and (max-width: 1349px) {

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
    gap: 1.2rem;
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

header>div {
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