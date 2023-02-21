export const state = () => ({
  logo: "",
  socialMedia: [],
  pageTitles: [],
});

export const mutations = {
  CHANGE_DESCRIPTION(state, metaDescription) {
    state.metaDescription = metaDescription;
  },
  CHANGE_META_DATA(state, metaData) {
    state.metaData = metaData;
  },
  CHANGE_SOCIAL_MEDIA(state, socialMedia) {
    state.socialMedia = socialMedia;
  },
  CHANGE_PAGE_TITLES(state, pageTitles) {
    state.pageTitles = pageTitles;
  },
  FOOTER_CONTENT(state, footerContent) {
    state.footerContent = footerContent;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { $directus }) {
    const landingPageTranslations = await $directus
      .items("landingpage_translations")
      .readByQuery({
        fields: [
          "metaDescription",
          "heroImageLandscape",
          "languages_id",
          "footerContent",
        ],
      });
    const files = await $directus.files.readByQuery({
      filter: {
        id: {
          _in: [
            landingPageTranslations.data.find((d) => d.languages_id == "en-US")
              .heroImageLandscape,
            landingPageTranslations.data.find((d) => d.languages_id == "de-DE")
              .heroImageLandscape,
          ],
        },
      },
    });

    commit(
      "CHANGE_META_DATA",
      landingPageTranslations.data.map((d) => {
        return {
          description: d.metaDescription,
          image: files.data.find((f) => f.id == d.heroImageLandscape), //d.heroImageLandscape,
          languages_id: d.languages_id,
        };
      })
    );

    const lp = await $directus.items("landingpage").readOne(1);
    commit("CHANGE_SOCIAL_MEDIA", lp.social_media_links);

    commit(
      "FOOTER_CONTENT",
      landingPageTranslations.data.map((d) => {
        return {
          content: d.footerContent,
          languages_id: d.languages_id,
        };
      })
    );

    const legalPage = await $directus.items("Legal_Pages").readByQuery({
      filter: {
        path: { _in: ["imprint", "privacy"] },
      },
    });
    const legalPageTranslations = await $directus
      .items("Legal_Pages_translations")
      .readByQuery({
        filter: {
          Legal_Pages_id: { _in: legalPage.data.map((d) => d.id) },
          //  languages_code: currentLocale.iso//'en-US'
        },
        fields: ["Legal_Pages_id", "languages_code", "title"],
      });

    let pageTitleTranslations = legalPageTranslations.data.map(
      (translation) => {
        translation.path = legalPage.data.find(
          (p) => p.id === translation.Legal_Pages_id
        ).path;
        return translation;
      }
    );

    const faqPageTranslations = await $directus
      .items("FAQ_translations")
      .readByQuery({
        fields: ["FAQ_id", "languages_code", "title"],
      });
    pageTitleTranslations.push(
      ...faqPageTranslations.data.map((translation) => {
        translation.path = "faq";
        return translation;
      })
    );
    commit("CHANGE_PAGE_TITLES", pageTitleTranslations);
  },
};
