<template>
  <section class="content-section">
    <div>
      <h1>{{title}}</h1>
      <div v-html="content"></div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ app, $directus }) {
    const currentLocale = app.i18n.locales.find(
      (i) => i.code === app.i18n.locale
    );

    const page = await $directus.items("Legal_Pages").readByQuery({
      filter: {
        path: "imprint",
      },
    });

    const pageTranslations = await $directus
      .items("Legal_Pages_translations")
      .readByQuery({
        filter: {
          Legal_Pages_id: page.data[0].id,
          languages_code: currentLocale.iso, //'en-US'
        },
      });

    return { ...page.data[0], ...pageTranslations.data[0] };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "og-title",
          property: "og:title",
          content: this.title + " - " + this.$t("page.title"),
        },
      ],
    };
  },
};
</script>