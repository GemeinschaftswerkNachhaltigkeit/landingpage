<template>
  <div id="roadmap">
    <section class="content-section hero">
      <content-with-image 
      :title="title" 
      :content="content" 
      :image="hero_image" 
      :alt="hero_image_alt"></content-with-image>
    </section>
    <section class="content-section ideas-section-wrapper">
      <div class="content-section-wrapper ideas-section">
        <div>
          <h2 class="blue title ideas-title">{{idea_section_title}}</h2>
        </div>
        <columns-section :cols="3">
          <template #column-1>
            <roadmap-column 
            :title="ideas_column_title" 
            :entries="idea_entries" 
            :open="open"
            @toggle="toggleOpen"></roadmap-column>
          </template>
          <template #column-2>
            <roadmap-column 
            :title="development_column_title" 
            :entries="development_entries"
            :open="open"
            @toggle="toggleOpen"></roadmap-column>
          </template>
          <template #column-3>
            <roadmap-column 
            :title="done_column_title" 
            :entries="done_entries"
            :open="open"
            @toggle="toggleOpen"></roadmap-column>
          </template>
        
        </columns-section>
        <columns-section :cols="3">
          <template #column-1>
            <div class="new-idea-wrapper">
              <a  class="new-idea-link button accent-btn" :href="`mailto:${new_idea_email_address}?subject=${new_idea_subject}`">{{new_idea_button}}</a>
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


<style lang="scss" scoped>
.hero {
  overflow: hidden;
  background: linear-gradient(
    45deg,
    white 66%,
    var(--gw-magenta) 66%,
    var(--gw-magenta) 76%,
    var(--gw-orange) 76%
  );
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

<script>
import ColumnsSection from "../components/ColumnsSection.vue";
import ContentWithImage from "../components/ContentWithImage.vue";
import RoadmapColumn from "../components/RoadmapColumn.vue";
export default {
  components: { ColumnsSection, ContentWithImage, RoadmapColumn },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
  },
  async asyncData({ app, $directus }) {
    const currentLocale = app.i18n.locales.find(
      (i) => i.code === app.i18n.locale
    );

    const roadmap = await $directus.items("roadmap").readOne(1);
    const roadmapTranslations = await $directus
      .items("roadmap_translations")
      .readByQuery({
        filter: {
          languages_code: currentLocale.iso, //'en-US'
        },
      });

    const files = await $directus.files.readByQuery({
      filter: {
        id: {
          _in: [roadmapTranslations.data[0].hero_image],
        },
      },
    });

    return {
      ...roadmap,
      ...roadmapTranslations.data[0],
      files: files.data,
    };
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

