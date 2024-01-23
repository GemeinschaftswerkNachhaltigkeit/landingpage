<template>
  <div id="roadmap">
    <section class="content-section hero">
      <content-with-image :title="data?.title" :content="data?.content" :image="data?.hero_image"
        :alt="data?.hero_image_alt"></content-with-image>
    </section>
    <section class="content-section ideas-section-wrapper">
      <div class="content-section-wrapper ideas-section">
        <div>
          <h2 class="blue title ideas-title">{{ data?.idea_section_title }}</h2>
        </div>
        <columns-section :cols="3">
          <template #column-1>
            <roadmap-column :title="data?.ideas_column_title" :entries="data?.idea_entries" :open="open"
              @toggle="toggleOpen"></roadmap-column>
          </template>
          <template #column-2>
            <roadmap-column :title="data?.development_column_title" :entries="data?.development_entries" :open="open"
              @toggle="toggleOpen"></roadmap-column>
          </template>
          <template #column-3>
            <roadmap-column :title="data?.done_column_title" :entries="data?.done_entries" :open="open"
              @toggle="toggleOpen"></roadmap-column>
          </template>

        </columns-section>
        <columns-section :cols="3">
          <template #column-1>
            <div class="new-idea-wrapper">
              <a class="new-idea-link button accent-btn"
                :href="`mailto:${data?.new_idea_email_address}?subject=${data?.new_idea_subject}`">{{
                  data?.new_idea_button
                }}</a>
            </div>
          </template>
          <template #column-2>
            <div></div>
          </template>
          <template #column-3>
            <div></div>
          </template>
        </columns-section>
      </div>
    </section>
  </div>
</template>

<script setup>

const { t } = useI18n()
const { $i18n, $stringify } = useNuxtApp();
const { getItems, getSingletonItem } = useDirectusItems();
const { getFiles } = useDirectusFiles();
const open = ref(false);
const config = useRuntimeConfig()

const { data, pending, error, refresh } = await useAsyncData('roadmap', async () => {
  const currentLocale = $i18n.locales.value.find(
    (i) => i.code === $i18n.locale.value
  );
  let roadmapTranslations = [];
  let roadmap = {};
  let files = [];
  try {
    roadmap = await getSingletonItem({
      collection: 'roadmap',
    })

    roadmapTranslations = await getItems({
      collection: 'roadmap_translations',
      params: {
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        }
      }
    })

    const roadmapTranslationsData = roadmapTranslations[0];


    files = await getFiles({
      params: {
        filter: {
          id: {
            _in: [roadmapTranslationsData.hero_image],
          },
        }
      }
    });


  } catch (error) {
    console.log('DIRECTUS Fetch Error', error)
  }



  return {
    ...roadmap,
    ...roadmapTranslations[0],

    files: files,
  }
});

function toggleOpen() {
  open.value = !open.value;
}

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

<style lang="scss" scoped>
.hero {
  overflow: hidden;
  background: linear-gradient(45deg,
      white 66%,
      var(--gw-magenta) 66%,
      var(--gw-magenta) 76%,
      var(--gw-orange) 76%);
  background-repeat: no-repeat;
  min-height: 70vh;
}

.title {
  margin: 0;
  margin-bottom: 28px;
}

.ideas-section-wrapper {
  background: var(--gw-yellow);

  .ideas-section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;

    align-items: start;
    grid-auto-rows: min-content;

    .ideas-title {
      margin: 0;
    }

    .new-idea-wrapper {
      align-self: start;
      justify-self: center;
    }
  }
}
</style>