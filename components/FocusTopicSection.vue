<template>
  <section class="foucs-topic-section">
    <h3 class="subtitle">{{ subtitle }}</h3>
    <h2 class="title">{{ title }}</h2>
    <a :href="linkUrl" class="accent-font link">{{ linkText }} <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_15743_2594" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <rect width="16" height="16" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_15743_2594)">
          <path d="M6.26536 12L5.33203 11.0667L8.3987 8L5.33203 4.93333L6.26536 4L10.2654 8L6.26536 12Z" fill="#DD1367" />
        </g>
      </svg>
    </a>

    <component v-if="fetchedItem" :is="comp" :item="fetchedItem" no-image-placeholder show-sdgs full-text full-width
      v-bind="{ 'height': 'auto' }">
    </component>
  </section>
</template>

<script setup>
import HighlightedOrgaCard from '../components/HighlightedItemsOrgaCard.vue'
import HighlightedEventCard from '../components/HighlightedItemsEventCard.vue'
import HighlightedMarketplaceCard from '../components/HighlightedItemsMarketplaceCard.vue'
const config = useRuntimeConfig();
const fetchedItem = ref(null);

const props = defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  linkText: {
    type: String,
  },
  linkUrl: {
    type: String,
  },
  item: {
    type: String,
  },
  itemType: {
    type: String,
  }


})

const comp = computed(() => {
  if (props.itemType === 'organisation') {
    return HighlightedOrgaCard
  }
  if (props.itemType === 'event') {
    return HighlightedEventCard
  }
  if (props.itemType === 'marketplace') {
    return HighlightedMarketplaceCard
  }
  return HighlightedOrgaCard
})

onMounted(async () => {
  if (props.item) {
    try {
      const urls = {
        organisation: config.privateApiUrl + '/organisations/' + props.item,
        event: config.privateApiUrl + '/activities/' + props.item,
        marketplace: config.privateApiUrl + '/marketplace/' + props.item
      }
      fetchedItem.value = await $fetch(urls[props.itemType])
      console.log(fetchedItem.value)
    } catch (e) {
      fetchedItem.value = null;
    }

  }
})


</script>

<style lang="scss" scoped>
section {
  display: grid;
  gap: 0px;
  width: 100%;


  &.foucs-topic-section {
    padding-bottom: 0;
    padding-top: 0;
    margin-bottom: -200px;

    @media screen and (min-width: 1000px) {
      margin-bottom: -10vw;
    }

    @media screen and (min-width: 1800px) {
      margin-bottom: -20vw;
    }
  }

  .subtitle {
    font-size: 14px;
    line-height: 24px;
    background: none;
    font-weight: 100;
    font-family: Verdana, sans-serif;
    letter-spacing: .2px;
    margin-bottom: 4px;
  }

  .title {
    font-size: 28px;
    line-height: 34px;
    background: none;
    margin-bottom: 16px;
  }

  a.link {
    color: var(--gw-magenta);
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 100;
    margin-bottom: 24px;
  }
}
</style>