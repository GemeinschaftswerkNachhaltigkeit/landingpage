<template>
  <div class="tabs">
    <p class="label">{{ t('labels.tabHeading') }}:</p>
    <div class="actions">
      <div class="overlay"></div>
      <HighlightedItemsCardTypeFilterTab
        v-for="typeValue in types"
        :active="activeType === typeValue"
        :info="!!getInfoContent(typeValue, content)"
        @click="$emit('change', typeValue)"
        @showInfo="showInfo(typeValue)"
      >
        {{ t('labels.' + typeValue) }}
      </HighlightedItemsCardTypeFilterTab>
    </div>
  </div>
  <PopUp :open="!!infoPopupOpen" @popup-closed="closeInfo">
    <InfoPopUpContent :content="getInfoContent(infoPopupOpen, content)">
    </InfoPopUpContent>
  </PopUp>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  activeType: {
    type: String,
  },
  content: {
    type: Object,
  },
});

const types = ref(['orga', 'event', 'marketplace']);
const infoPopupOpen = ref(null);

function getInfoContent(type, content) {
  if (type === 'orga') {
    return content.organisation_info_text;
  }
  if (type === 'event') {
    return content.event_info_text;
  }
  if (type === 'marketplace') {
    return content.marketplace_info_text;
  }
}

function showInfo(type, e) {
  infoPopupOpen.value = type;
}

function closeInfo() {
  infoPopupOpen.value = null;
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px 0 16px 0;
  max-width: 100vw;
  width: 100%;

  p.label {
    font-weight: bold;
    margin: 0 40px 0 0;
    flex-shrink: 0;
    width: fit-content;
  }

  .actions {
    box-shadow: 0 -2px 0 0 var(--light-gray2) inset;
    display: flex;
    overflow: auto;
    flex-grow: 1;
    position: relative;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
