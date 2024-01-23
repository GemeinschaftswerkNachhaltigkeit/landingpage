<template>
  <section class="wrapper">
    <div class="slider-wrapper">
      <section class="content-section filters">

        <div class="overlay"></div>
        <div class="content-section-wrapper">
          <HighlightedItemsCardTypeFilter :activeType="type" @change="setType"></HighlightedItemsCardTypeFilter>
        </div>
      </section>
      <section class="content-section">
        <div>
          <div class="content-section-wrapper cards" v-if="type">
            <component v-if="!loading" v-for="result in   results  " :is="comp" v-bind="{ item: result }">
            </component>
            <Spinner v-else></Spinner>
          </div>
          <HighlightedItemsAllResultLinks :result-type="type"></HighlightedItemsAllResultLinks>
        </div>
      </section>
    </div>

  </section>
</template>





<script setup>
import HighlightedOrgaCard from '../components/HighlightedItemsOrgaCard.vue'
import HighlightedEventCard from '../components/HighlightedItemsEventCard.vue'
import HighlightedMarketplaceCard from '../components/HighlightedItemsMarketplaceCard.vue'

const config = useRuntimeConfig();
const route = useRoute()
const router = useRouter()

const props = defineProps({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  keywords: {
    type: String,
  },
  content: {
    type: String,
  },
})

const queryParams = route.query
const typeParam = queryParams['type'];
const type = ref(isValidType(typeParam) ? typeParam : 'orga')
const loading = ref(false);
const results = ref([])
const comp = computed(() => {
  if (type.value === 'orga') {
    return HighlightedOrgaCard
  }
  if (type.value === 'event') {
    return HighlightedEventCard
  }
  if (type.value === 'marketplace') {
    return HighlightedMarketplaceCard
  }
  return HighlightedOrgaCard
})

function setType(newType) {
  router.push({
    path: route.path,
    query: { type: newType },
  })
  type.value = newType
  loadSlides()
}

function isValidType(type) {
  return type === 'orga' || type === 'event' || type === 'marketplace'
}

async function loadSlides() {
  loading.value = true;
  const urls = {
    orga: config.privateApiUrl + '/organisations?size=3&sort=createdAt,desc',
    event: config.privateApiUrl + '/activities?size=3&sort=createdAt,desc',
    marketplace: config.privateApiUrl + '/marketplace?size=3'
  }
  try {
    const response = await $fetch(urls[type.value])
    if (response) {
      results.value = response.content;
    }
    loading.value = false;
  } catch (error) {
    results.value = [];
    loading.value = false;
  }

}

onMounted(async () => {
  loadSlides()
})
</script>

<style lang="scss" scoped>
section.wrapper {
  padding: 0;
  background-color: var(--light-gray);
  padding-block-end: 80px;

  .slider-wrapper {
    // width: 100%;

    .content-section {
      padding-block: 0;


      &.filters {
        position: relative;

        .overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 60px;
          z-index: 10;
          box-shadow: -40px 0 30px 0 var(--light-gray) inset, 40px 0 30px 0 var(--light-gray) inset;
          pointer-events: none;
        }
      }

      .content-section-wrapper {
        flex-grow: 1;
      }
    }
  }

  .cards {
    min-height: 530px;
    display: flex;
    flex-direction: column;

    gap: 24px;
    padding-block-start: 32px;
    padding-block-end: 64px;
  }

  @media screen and (min-width: 500px) {
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      place-content: center;

      gap: 32px;
      padding-block-start: 32px;
      padding-block-end: 64px;
    }
  }

  @media screen and (min-width: 2400px) {
    .cards {
      grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    }
  }

}
</style>