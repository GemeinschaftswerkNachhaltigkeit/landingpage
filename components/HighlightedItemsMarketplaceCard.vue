<template>
  <a class="card" :style="{ height: height || null }" :href="$config.public.appUrl + '/marketplace/search/' + item.id">
    <div class="header">
      <div class="image" v-if="item.image">
        <img :src="imageUrl" alt="banner" />
      </div>
      <div class="header-text">
        <div v-if="marketplaceType" class="badge" :class="item.marketplaceType">
          {{ t('marketplaceType.' + marketplaceType) }}
        </div>
        <a v-if="item.organisation?.id" class="orga-link"
          :href="$config.public.appUrl + '/organisations/' + item.organisation?.id">{{
            item.organisation?.name }}</a>

      </div>
    </div>
    <article>
      <h3 class="title">{{ item.name }}</h3>
      <div class="description" v-if="fullText" v-html="item.description"></div>
      <div class="description" v-else>{{ excerpt(item.description) }}</div>
    </article>

  </a>
</template>

<script setup>
import { excerpt, locationString, dateRangeString } from '../utils/card'
const config = useRuntimeConfig();
const { t } = useI18n();

const props = defineProps({
  item: {
    type: Object
  },
  height: {
    type: String
  },
  fullText: {
    type: Boolean,
    default: false
  },
})

const imageUrl = computed(() => { return props.item.image ? config.public.privateAssetsUrl + '/files/' + props.item.image : null })
const marketplaceType = computed(() => {
  const marketplaceType = props.item.marketplaceType === 'OFFER'
    ? props.item.offerCategory
    : props.item.bestPractiseCategory
  return marketplaceType
})


</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: white;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, .2);

  .header {
    padding-inline: 32px;
    padding-block-start: 16px;
    padding-block-end: 8px;
    background: var(--gw-blue-light);
    display: flex;
    gap: 16px;
    height: auto;

    .header-text {
      min-width: 0;

      .badge {
        color: white;
        height: 28px;
        line-height: 28px;
        text-align: center;
        padding-inline: 8px;
        margin-block-end: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.OFFER {
          background-color: var(--gw-bordeauxe);
        }

        &.BEST_PRACTISE {
          background-color: var(--gw-yellow);
          color: var(--gw-blue-dark);
        }
      }

      .orga-link {
        display: block;
        margin-bottom: 32px;
      }
    }

    .image {
      width: 88px;
      height: 88px;
      border: 2px solid var(--light-gray);
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  article {
    padding: 48px 24px 40px 24px;

    .description {
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
    }

    .title {
      display: block;
      margin-bottom: 16px;
      font-weight: 700;
      background: none;
      font-size: 18px;
      line-height: 22px;
    }
  }
}

@media screen and (min-width: 800px) {
  .card {
    height: 460px;
    min-height: auto;

    article {
      flex-grow: 1;
      padding: 16px 32px 40px 32px;
    }
  }
}
</style>