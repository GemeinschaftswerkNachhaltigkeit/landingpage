<template>
  <div v-if="noticeVisible" id="cookie-banner" role="dialog"
    :class="noticeVisible ? 'cookie-banner-visible' : 'cookie-banner-hidden'" aria-label="Cookie Notice">
    <div class="cookie-banner-container">
      <div id="cookie-banner-text" class="cookie-banner-text-container">
        <h6>{{ $t("cookieBanner.title") }}</h6>
        <i18n-t for="agreePrivacyContact" tag="p" keypath="cookieBanner.text" class="title" scope="global">
          <template v-slot:privacyLink>
            <NuxtLink :to="localePath('privacy')" target="_blank">{{ $t('page.privacy') }}</NuxtLink>
          </template>
        </i18n-t>
      </div>
      <div id="cookie-banner-buttons" class="cookie-banner-buttons-container">
        <button v-on:click="accept" id="cookie-banner-accept" class="accent-btn"
          :aria-label="$t('cookieBanner.btn.acceptAll')">
          {{ $t("cookieBanner.btn.acceptAll") }}
        </button>
        <button v-on:click="refuse" id="cookie-banner-refuse" class="link"
          :aria-label="$t('cookieBanner.btn.acceptNecessary')">
          {{ $t("cookieBanner.btn.acceptNecessary") }}
        </button>
      </div>
      <!-- <button v-on:click="refuse" id="cookie-banner-close" class="cookie-banner-close" :title="$t('cookieBanner.btn.acceptNecessary')">X</button>-->
    </div>
  </div>
</template>

<style>
#cookie-banner {
  background-color: var(--gw-yellow);
  box-shadow: 4px -4px 4px rgb(0 0 0 / 25%);
  position: fixed;
  min-width: 100%;
  height: auto;
  z-index: 100000;
  left: 0;
  font-weight: 400;
  bottom: 0;
}

#cookie-banner h6 {
  font-family: "AzeretMono";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding: 0;
  margin: 0;
}

#cookie-banner .cookie-banner-container {
  display: block;
}

#cookie-banner,
#cookie-banner * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.cookie-banner-container {
  padding: 2em;
  width: 100%;
  z-index: 2;
}

.cookie-banner-text-container {
  margin: 0 0 6px;
  font-size: 12px;
}

#cookie-banner-close {
  position: absolute;
  right: 1em;
  top: 1em;
  margin-top: -10px;
  width: 15px;
  height: 15px;
  padding: 0.75em;
  outline: none;
  cursor: pointer;
  background-color: unset;
  color: var(--gw-yellow);
  font-size: 1.25em;
  font-weight: bold;
}

.cookie-banner-buttons-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  flex-direction: column;
  margin-top: 2em;
}

#cookie-banner-buttons button {
  padding: 0.5em;
  width: 100%;
}

#cookie-banner-buttons button.link {
  font-size: 11px;
}

@media only screen and (min-width: 769px) {
  .cookie-banner-container {
    padding: 2em 8.125em;
  }

  #cookie-banner .cookie-banner-container {
    display: flex;
  }

  .cookie-banner-text-container {
    font-size: 14px;
  }

  #cookie-banner-buttons button.link {
    font-size: 12px;
  }

  .cookie-banner-buttons-container {
    margin-top: 0;
    margin-left: 4em;
  }
}
</style>

<script>
const CNAME = "wpgwn_cookie_consent_set";
const EXDAYS = 90;

const MATOMO_SCRIPT_CLASS = "matomo-script";

export default {
  data() {
    return {
      noticeVisible: false,
      scriptLoaded: false,
    };
  },
  methods: {
    accept(path) {
      this.noticeVisible = false;
      this.setCookie(CNAME, true, EXDAYS);
      this.loadScript();
    },
    refuse() {
      this.noticeVisible = false;
      this.setCookie(CNAME, false, EXDAYS);
      this.removeScript();
    },
    setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    },
    checkCookie() {
      let c = this.getCookie(CNAME);
      if (c !== null) {
        this.noticeVisible = false;
        if (c === "true") {
          this.loadScript();
        } else {
          this.removeScript();
        }
      } else {
        this.noticeVisible = true;
      }
    },
    loadScript() {
      if (!this.scriptLoaded && this.getMatomoSiteId()) {
        const script = document.createElement("script");
        script.setAttribute("class", MATOMO_SCRIPT_CLASS);
        script.innerHTML =
          "var _paq = window._paq = window._paq || [];" +
          "_paq.push(['trackPageView']);" +
          "  _paq.push(['enableLinkTracking']);" +
          "  (function() {" +
          'var u="https://matomo.nachhaltigkeitsrat.de/";' +
          "_paq.push(['setTrackerUrl', u+'matomo.php']);" +
          "_paq.push(['setSiteId', " +
          this.getMatomoSiteId() +
          "]);" +
          "var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];" +
          "g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s); " +
          "})();";

        const noscript = document.createElement("noscript");
        noscript.setAttribute("class", MATOMO_SCRIPT_CLASS);
        noscript.innerHTML =
          '<p><img src="https://matomo.nachhaltigkeitsrat.de/matomo.php?idsite=' +
          this.getMatomoSiteId() +
          '&amp;rec=1" style="border:0;" alt="" /></p>';

        const position = document.querySelector("body"); // Or any other location , example head
        position.appendChild(script);
        position.appendChild(noscript);

        this.scriptLoaded = true;
      }
    },
    removeScript() {
      if (this.scriptLoaded) {
        var script = document.getElementsByClassName(MATOMO_SCRIPT_CLASS); //document.getElementById(MATOMO_SCRIPT_ID);
        script.parentNode.removeChild(script);
        this.scriptLoaded = false;
      }
    },
    getMatomoSiteId() {
      return this.$config.public.matomoSiteId;
    },
  },
  mounted: function () {
    window.addEventListener("onload", this.checkCookie());
  },
  destroyed: function () {
    window.removeEventListener("onload", this.checkCookie());
  },
};
</script>
