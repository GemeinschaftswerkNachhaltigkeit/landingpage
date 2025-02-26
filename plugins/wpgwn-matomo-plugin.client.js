import { defineNuxtPlugin } from '#app';
import VueMatomo from 'vue-matomo';

export default defineNuxtPlugin((nuxtApp) => {
  const matomoSiteId = nuxtApp.$config.public.matomoSiteId;
  const matomoUrl = nuxtApp.$config.public.matomoUrl;
  nuxtApp.vueApp.use(VueMatomo, {
    host: matomoUrl,
    siteId: matomoSiteId,
    // Enables automatically registering pageviews on the router
    router: nuxtApp.$router,
    enableLinkTracking: true,
    requireConsent: true,
    trackInitialView: true,
    disableCookies: true,
    requireCookieConsent: true,
  });
});
