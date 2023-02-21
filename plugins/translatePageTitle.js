export default ({ $$i18n, $store }, inject) => {
  inject("translatePageTitle", function (path) {
    if (!path) return null;

    const translatedTitle = this.$store.state.pageTitles
      .filter((d) => d.languages_code == this.$currentLocaleIso())
      .find((t) => t.path == path);
    return translatedTitle ? translatedTitle.title : null;
  });

  inject("currentLocaleIso", function () {
    const currentLocale = this.$i18n.locales.find(
      (i) => i.code === this.$i18n.locale
    );
    return currentLocale.iso;
  });

  inject("translateFooterContent", function (directusItems) {
    const item = directusItems.filter(
      (d) => d.languages_id == this.$currentLocaleIso()
    )[0];
    return item ? item.content : null;
  });
};
