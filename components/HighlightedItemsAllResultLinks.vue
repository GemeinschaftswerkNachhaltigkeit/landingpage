<template>
  <div>
    <a v-if="resultType === 'orga'" :href="$config.public.appUrl + '/map'">{{
      t('labels.orgaLink')
    }}</a>
    <a v-if="resultType === 'event'" :href="$config.public.appUrl + '/events'">{{
      t('labels.eventsLink')
    }}</a>
    <a v-if="resultType === 'marketplace'" :href="$config.public.appUrl + '/marketplace/search'">{{
      t('labels.marketplaceLink')
    }}</a>
  </div>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  resultType: {
    type: String
  },

})



</script>

<style lang="scss" scoped>
div {
  padding-block: 32px;
  text-align: center;

  a {
    color: var(--gw-magenta);
  }
}
</style>