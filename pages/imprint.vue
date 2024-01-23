<template>
  <section class="content-section legal-pages">
    <div>
      <h1>{{ data.title }}</h1>
      <div v-html="data.content" class="html"></div>
    </div>
  </section>
</template>



<script setup>
const { t } = useI18n()
const { $i18n } = useNuxtApp();
const { getItems } = useDirectusItems();

const { data } = await useAsyncData('imprint', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let imprintTranslations = [];
  let imprint = {};

  try {

    const imprint = await getItems({
      collection: "Legal_Pages", params: {
        filter: {
          path: "imprint",
        }
      }
    })


    imprintTranslations = await getItems({
      collection: 'Legal_Pages_translations',
      params: {
        filter: {
          Legal_Pages_id: imprint[0].id,
          languages_code: currentLocale.iso, //'en-US'
        }
      }
    })
  } catch (error) {
    console.log('DIRECTUS Fetch Error', error)
  }
  return {
    ...imprint[0],
    ...imprintTranslations[0],
  }
});
const title = data.value.title;

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