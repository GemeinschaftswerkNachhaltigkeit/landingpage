<template>
  <div id="newsletter-page">
    <section class="form-section bg-img-section bg-img-parallax" id="newsletter"
      :style="$getBgImgSectionStyle(data?.form_img_newsletter)">
      <template v-if="!loading && validateQueryParams()">
        <template v-if="queryParams.error">
          <div>
            <h2>{{ $t('newsletter.error.title') }}</h2>
          </div>
          <div>
            <p>{{ $t('newsletter.error.' + queryParams.error) }}</p>
            <p>{{ $t('newsletter.error.tryAgain') }}</p>
          </div>
        </template>
        <template v-if="queryParams.subscribe">
          <div>
            <h2>{{ $t('newsletter.subscribe.' + queryParams.subscribe + '.title') }}</h2>
          </div>
          <div>
            <p>{{ $t('newsletter.subscribe.' + queryParams.subscribe + '.msg') }}</p>
          </div>
        </template>
        <template v-if="queryParams.unsubscribe">
          <div>
            <h2>{{ $t('newsletter.unsubscribe.' + queryParams.unsubscribe + '.title') }}</h2>
          </div>
          <div>
            <p>{{ $t('newsletter.unsubscribe.' + queryParams.unsubscribe + '.msg') }}</p>
          </div>
        </template>
      </template>

      <template v-else-if="!loading">
        <div v-html="data?.form_content_newsletter"></div>
        <NewsletterForm></NewsletterForm>
      </template>
    </section>
  </div>
</template>


<script setup>
const { t } = useI18n()
const { $i18n } = useNuxtApp();
const { getItems, getSingletonItem } = useDirectusItems();
const route = useRoute()
const queryParams = ref(route.query)
const loading = ref(true)



const { data, pending, error, refresh } = await useAsyncData('newsletter', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let indexTranslations = [];
  let index = {};
  try {
    index = await getSingletonItem({
      collection: 'landingpage',
    })
    indexTranslations = await getItems({
      collection: 'landingpage_translations',
      params: {
        filter: {
          languages_id: currentLocale.iso, //'en-US'
        },
        fields: ["form_content_newsletter", "form_img_newsletter"]
      }
    })

  } catch (error) {
    console.log('DIRECTUS Fetch Error', error)
  }
  return {
    ...index,
    ...indexTranslations[0]
  }
});

function validateQueryParams() {
  if (!route.query || Object.keys(route.query).length === 0) return false;

  if (
    [
      "emailFormat",
      "emailExists",
      "emailBlocked",
      "requiredFields",
    ].indexOf(route.query.error) > -1
  )
    return true;

  const sucessStates = ["confirm", "complete"];
  if (
    sucessStates.indexOf(route.query.subscribe) > -1 ||
    sucessStates.indexOf(route.query.unsubscribe) > -1
  )
    return true;

  return false;
}
const title = "Newsletter";

onMounted(() => {
  loading.value = false;
})

useHead({
  title: title,
  meta: [
    {
      hid: "og-title",
      property: "og:title",
      content: title + " - " + t("page.title"),
    },
  ]

})

</script>