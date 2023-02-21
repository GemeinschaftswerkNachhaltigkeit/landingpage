export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  /*head: {*/
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    return {
      htmlAttrs: {
        lang: "de",
        translate: "no",
        ...i18nHead.htmlAttrs,
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "msapplication-TileImage", content: "/mstile-150x150.png" },
        { name: "msapplication-TileColor", content: "#ffffff" },
        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "pinterest-rich-pin",
          name: "pinterest-rich-pin",
          content: "app",
        },
        ...i18nHead.meta,
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touce-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
      ],
    };
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["modern-normalize", "~/style/main.css", "~/style/flicking.css"],

  publicRuntimeConfig: {
    assetUrl: process.env.DIRECTUS_PUBLIC_URL || process.env.DIRECTUS_URL,
    apiProxyPrefix:
      process.env.NODE_ENV === "development" ? "/app-api" : "/api/public/v1",
    privateApiUrl:
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:8081/api/v1"
        : "/api/v1",
    privateAssetsUrl:
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:8081/api/v1"
        : "/app/api/v1",
    apiProxyPrefixAlt:
      process.env.NODE_ENV === "development" ? "/auth-config" : "",
    authConfigBaseUrl:
      process.env.NODE_ENV === "development" ? "" : "/app/api/v1",
    matomoSiteId: process.env.MATOMO_SITE_ID,
    appUrl:
      process.env.NODE_ENV === "development" ? process.env.APP_URL : "/app",
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/asset-url.js",
    "~/plugins/click-outside.js",
    "~/plugins/translatePageTitle.js",
    { src: "~/plugins/vue-typer.js", mode: "client" },
    { src: "~/plugins/vue-slider.js" },
    { src: "~/plugins/jwt-decode.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "~/modules/directus",
    "~/modules/modernizr",
    "@nuxtjs/i18n",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    baseURL: process.env.BASE_HREF || "", //await $directus.items("languages").readOne(1)
  },

  // Configuration is written when building the application (npm run build)
  directus: {
    url: process.env.DIRECTUS_URL,
    publicUrl: process.env.DIRECTUS_PUBLIC_URL || process.env.DIRECTUS_URL,
    auth: {
      // Dont put any sensitive information in here, since the login data is sent from the browser.
      // mark all data as public if you can see them without a login
      // email: process.env.DIRECTUS_EMAIL,
      // password: process.env.DIRECTUS_PASSWORD,
      token:
        process.env.DIRECTUS_STATIC_TOKEN || "TOP_SECRET_STATIC_USER_TOKEN",
    },
  },
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.js", name: "English" },
      { code: "de", iso: "de-DE", file: "de.js", name: "Deutsch" },
    ],
    langDir: "i18n/",
    defaultLocale: "de",
    vueI18n: {
      fallbackLocale: "de",
    },
  },
  modernizr: {
    "feature-detects": ["img/webp"],
    options: ["setClasses"],
  },

  ...(process.env.NODE_ENV === "development" && {
    axios: {
      proxy: true,
    },
    proxy: {
      "/app-api": {
        target: "http://127.0.0.1:8081/api/public/v1",
        pathRewrite: { "^/app-api/": "" },
        changeOrigin: false,
      },
      "/auth-config": {
        target: "http://127.0.0.1:8081/api/v1",
        pathRewrite: { "^/auth-config/": "" },
        changeOrigin: true,
      },
    },
  }),
  ...(process.env.NODE_ENV === "production" && {
    axios: {
      baseURL: "/app", // wpgwn-app backend url
    },
  }),
};
