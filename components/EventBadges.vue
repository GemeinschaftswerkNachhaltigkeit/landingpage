<template>
  <div
    class="biodiversity-badge accent-font"
    v-if="
      (item.activityType || item.marketplaceType) && isBiodiversityTopic(item)
    "
  >
    <div class="icon">
      <img :src="biodiversity" />
    </div>
    <div class="label">{{ $t('labels.biodiversity') }}</div>
  </div>
</template>

<script setup>
import biodiversity from '~/assets/img/biodiversity.png?url';

defineProps({
  item: Object,
});

function isBiodiversityTopic(item) {
  return item.thematicFocus.includes('BIODIVERSITY');
}
</script>

<style scoped lang="scss">
.biodiversity-badge {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--gw-blue-dark);
  font-weight: 600;
  line-height: 14px;
  font-size: 12px;

  .icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    color: var(--biodiversity);
  }
}
</style>
