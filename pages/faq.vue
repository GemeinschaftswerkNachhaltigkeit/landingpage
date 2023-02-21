<template>
  <div id="faq">        
      <div class="title-wrap">
        <h1 v-if="title !== undefined">{{title}}</h1>
      </div>
      <section class="content-section align-start">
        <div v-if="content" v-html="content"></div>
        <div v-if="content_2" v-html="content_2"></div>
      </section>
  </div>
</template>

<style></style>

<script>
export default {
  async asyncData({ app, $directus }) {
    const currentLocale = app.i18n.locales.find(
      (i) => i.code === app.i18n.locale
    );

    const page = await $directus.items("FAQ").readOne(1);
    const pageTranslations = await $directus
      .items("FAQ_translations")
      .readByQuery({
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        },
      });

    return { ...page, ...pageTranslations.data[0] };
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