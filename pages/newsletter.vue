<template>
    <div id="newsletter-page">
        <section class="form-section bg-img-section bg-img-parallax" id="newsletter" :style="$getBgImgSectionStyle(form_img_newsletter)" >
            <template v-if="!loading && this.validateQueryParams(queryParams)">
                <template v-if="queryParams.error">
                    <div><h2>{{$t('newsletter.error.title')}}</h2></div>
                    <div>
                        <p>{{$t('newsletter.error.'+ queryParams.error)}}</p>
                        <p>{{$t('newsletter.error.tryAgain')}}</p>
                    </div>
                </template>
                <template v-if="queryParams.subscribe">
                    <div><h2>{{$t('newsletter.subscribe.'+ queryParams.subscribe +'.title')}}</h2></div>
                    <div><p>{{$t('newsletter.subscribe.'+ queryParams.subscribe +'.msg')}}</p></div>
                </template>
                <template v-if="queryParams.unsubscribe">
                    <div><h2>{{$t('newsletter.unsubscribe.'+ queryParams.unsubscribe +'.title')}}</h2></div>
                    <div><p>{{$t('newsletter.unsubscribe.'+ queryParams.unsubscribe +'.msg' )}}</p></div>
                </template>
            </template>

            <template v-else-if="!loading">
                <div v-html="form_content_newsletter"></div>
                <NewsletterForm></NewsletterForm>
            </template>
        </section>
    </div>
</template>


<script>
export default {
  data() {
    return {
      loading: true,
      queryParams: null,
    };
  },
  async asyncData({ app, $directus }) {
    const currentLocale = app.i18n.locales.find(
      (i) => i.code === app.i18n.locale
    );

    const lp = await $directus.items("landingpage").readOne(1);
    const lpTranslations = await $directus
      .items("landingpage_translations")
      .readByQuery({
        filter: {
          languages_id: currentLocale.iso, //'en-US'
        },
        fields: ["form_content_newsletter", "form_img_newsletter"],
      });

    return { ...lp, ...lpTranslations.data[0] };
  },
  methods: {
    validateQueryParams(queryParams) {
      if (!queryParams || Object.keys(queryParams).length === 0) return false;

      if (
        [
          "emailFormat",
          "emailExists",
          "emailBlocked",
          "requiredFields",
        ].indexOf(queryParams.error) > -1
      )
        return true;

      const sucessStates = ["confirm", "complete"];
      if (
        sucessStates.indexOf(queryParams.subscribe) > -1 ||
        sucessStates.indexOf(queryParams.unsubscribe) > -1
      )
        return true;

      return false;
    },
  },
  mounted() {
    this.queryParams = this.$route.query;
    this.loading = false;
  },
  head() {
    const title = "Newsletter";
    return {
      title: title,
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