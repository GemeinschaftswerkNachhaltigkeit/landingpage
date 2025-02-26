// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';
export default defineNuxtConfig({
  vite: {
    plugins: [svgLoader()],
  },

  modules: ['@nuxtjs/i18n', 'nuxt-directus'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'de',
        translate: 'no',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileImage', content: '/mstile-150x150.png' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { hid: 'og-type', property: 'og:type', content: 'website' },
        {
          hid: 'pinterest-rich-pin',
          name: 'pinterest-rich-pin',
          content: 'app',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touce-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/android-chrome-192x192.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          href: '/android-chrome-512x512.png',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.css',
        },
      ],
    },
  },

  css: ['modern-normalize', '~/style/main.css', '~/style/flicking.css'],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'de', iso: 'de-DE', file: 'de.json', name: 'Deutsch' },
    ],
    langDir: 'locales/',
    defaultLocale: 'de',
    baseUrl: 'https://gemeinschaftswerk-nachhaltigkeit.de/',
  },

  directus: {
    url: process.env.DIRECTUS_PUBLIC_URL,
  },

  runtimeConfig: {
    public: {
      keycloak: {
        url: process.env.KC_URL,
        realm: process.env.KC_REALM,
        clientId: process.env.KC_CLIENT_ID,
      },
      assetUrl: process.env.DIRECTUS_PUBLIC_URL || process.env.DIRECTUS_URL,
      apiProxyPrefix: process.env.NODE_ENV === 'development' ? '/app-api' : '',
      apiProxyPrefixAlt:
        process.env.NODE_ENV === 'development' ? '/auth-config' : '',
      publicApiUrl:
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8081/api/public/v1'
          : '/app/api/public/v1',
      privateApiUrl:
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8081/api/v1'
          : '/app/api/v1',
      privateAssetsUrl:
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8081/api/v1'
          : '/app/api/v1',
      authConfigUrl:
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8081/api/v1/ui/ui-config'
          : '/app/api/v1/ui/ui-config',
      matomoSiteId: process.env.MATOMO_SITE_ID,
      matomoUrl: process.env.MATOMO_URL,
      appUrl:
        process.env.NODE_ENV === 'development' ? process.env.APP_URL : '/app',
    },
  },

  compatibilityDate: '2024-11-01',
});
