<template>
  <section class="content-section">
    <div class="content-section-wrapper text-content stack">
      <div>
        <h1>{{ data.title }}</h1>
      </div>
      <div v-html="data.content" class="html stack-sm no-underline"></div>
      <div v-html="data.content_2" class="html stack"></div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const { $i18n } = useNuxtApp();
const { getItems, getSingletonItem } = useDirectusItems();

const { data } = await useAsyncData('faq', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let faqTranslations = [];
  let faq = {};

  try {
    faq = await getSingletonItem({
      collection: 'FAQ',
    });
    faqTranslations = await getSingletonItem({
      collection: 'FAQ_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        },
      },
    });
  } catch (error) {
    console.log('DIRECTUS Fetch Error', error);
  }
  return {
    ...faq[0],
    ...faqTranslations[0],
  };
});
const title = data.value.title;

useHead({
  title: title,
  meta: [
    {
      hid: 'og-title',
      property: 'og:title',
      content: title + ' - ' + t('page.title'),
    },
  ],
});
</script>

<style scoped lang="scss">
.content-section-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
