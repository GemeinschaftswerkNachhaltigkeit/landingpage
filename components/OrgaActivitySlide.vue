<template>
  <div class="card-wrapper">
    <a class="card" :href="url" target="_blank" :class="{ expired: showAsExpired(item, item.activityType) }">
      <div class="expired-badge" v-if="showAsExpired(item, item.activityType)">
        {{ $t('labels.expiredEvent') }}
      </div>
      <div class="logo-column">
        <div class="logo-wrapper">
          <div class="logo">
            <img v-if="logoUrl" class="logo-img" :src="logoUrl" :alt="item?.name || 'Logo'" />
          </div>
        </div>
      </div>

      <div class="content-column">
        <header class="card-header">
          <div class="type">
            <div class="type-label  accent-font" :class="item.activityType === 'DAN' ? 'dan' : 'activity'"
              v-if="item.activityType">
              {{ $t('activityType.' + item.activityType) }}
            </div>
            <div class="type-label  accent-font" :class="item.activityType === 'DAN' ? 'dan' : 'activity'"
              v-else="item.activityType">
              {{ $t('labels.projectN') }}
            </div>

          </div>
        </header>
        <h3 class="title">
          {{ item?.name }}
        </h3>
        <div class="winner-badge accent-font" v-if="item.projectSustainabilityWinner">
          <div class="icon">
            <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.675 11.7L6.55 8.85L4.25 7H7.1L8 4.2L8.9 7H11.75L9.425 8.85L10.3 11.7L8 9.925L5.675 11.7ZM2 21V13.275C1.36667 12.575 0.875 11.775 0.525 10.875C0.175 9.975 0 9.01667 0 8C0 5.76667 0.775 3.875 2.325 2.325C3.875 0.775 5.76667 0 8 0C10.2333 0 12.125 0.775 13.675 2.325C15.225 3.875 16 5.76667 16 8C16 9.01667 15.825 9.975 15.475 10.875C15.125 11.775 14.6333 12.575 14 13.275V21L8 19L2 21ZM8 14C9.66667 14 11.0833 13.4167 12.25 12.25C13.4167 11.0833 14 9.66667 14 8C14 6.33333 13.4167 4.91667 12.25 3.75C11.0833 2.58333 9.66667 2 8 2C6.33333 2 4.91667 2.58333 3.75 3.75C2.58333 4.91667 2 6.33333 2 8C2 9.66667 2.58333 11.0833 3.75 12.25C4.91667 13.4167 6.33333 14 8 14ZM4 18.025L8 17L12 18.025V14.925C11.4167 15.2583 10.7877 15.5207 10.113 15.712C9.43767 15.904 8.73333 16 8 16C7.26667 16 6.56233 15.904 5.887 15.712C5.21233 15.5207 4.58333 15.2583 4 14.925V18.025Z"
                fill="#C8D400" />
            </svg>
          </div>
          <div class="label">{{ $t('labels.winner') }}</div>
        </div>
        <div class="infos">
          <div class="description">
            <p class="description-text">{{ excerpt(item?.description) }}</p>
          </div>
          <div class="details">
            <h4 class="info-title">{{ $t('labels.info') }}</h4>

            <div class="details-entries">
              <div class="content-row">
                <div class="content">


                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_14290_32805" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_14290_32805)">
                      <path
                        d="M12 16.475C13.65 15.1417 14.896 13.8583 15.738 12.625C16.5793 11.3917 17 10.2333 17 9.15C17 8.21667 16.8293 7.42067 16.488 6.762C16.146 6.104 15.725 5.57067 15.225 5.162C14.725 4.754 14.1833 4.45833 13.6 4.275C13.0167 4.09167 12.4833 4 12 4C11.5167 4 10.9833 4.09167 10.4 4.275C9.81667 4.45833 9.275 4.754 8.775 5.162C8.275 5.57067 7.85433 6.104 7.513 6.762C7.171 7.42067 7 8.21667 7 9.15C7 10.2333 7.42067 11.3917 8.262 12.625C9.104 13.8583 10.35 15.1417 12 16.475ZM12 19C9.65 17.2667 7.89567 15.5833 6.737 13.95C5.579 12.3167 5 10.7167 5 9.15C5 7.96667 5.21267 6.929 5.638 6.037C6.06267 5.14567 6.60833 4.4 7.275 3.8C7.94167 3.2 8.69167 2.75 9.525 2.45C10.3583 2.15 11.1833 2 12 2C12.8167 2 13.6417 2.15 14.475 2.45C15.3083 2.75 16.0583 3.2 16.725 3.8C17.3917 4.4 17.9377 5.14567 18.363 6.037C18.7877 6.929 19 7.96667 19 9.15C19 10.7167 18.4207 12.3167 17.262 13.95C16.104 15.5833 14.35 17.2667 12 19ZM12 11C12.55 11 13.021 10.804 13.413 10.412C13.8043 10.0207 14 9.55 14 9C14 8.45 13.8043 7.979 13.413 7.587C13.021 7.19567 12.55 7 12 7C11.45 7 10.9793 7.19567 10.588 7.587C10.196 7.979 10 8.45 10 9C10 9.55 10.196 10.0207 10.588 10.412C10.9793 10.804 11.45 11 12 11ZM5 22V20H19V22H5Z"
                        fill="#19486A" />
                    </g>
                  </svg>


                  <p class="text">
                    <mark>{{ dateRangeString(item.period, $i18n.locale.value, t) }}</mark>
                  </p>
                </div>
              </div>
              <div class="content-row">
                <div class="content">


                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_14290_32805" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_14290_32805)">
                      <path
                        d="M12 16.475C13.65 15.1417 14.896 13.8583 15.738 12.625C16.5793 11.3917 17 10.2333 17 9.15C17 8.21667 16.8293 7.42067 16.488 6.762C16.146 6.104 15.725 5.57067 15.225 5.162C14.725 4.754 14.1833 4.45833 13.6 4.275C13.0167 4.09167 12.4833 4 12 4C11.5167 4 10.9833 4.09167 10.4 4.275C9.81667 4.45833 9.275 4.754 8.775 5.162C8.275 5.57067 7.85433 6.104 7.513 6.762C7.171 7.42067 7 8.21667 7 9.15C7 10.2333 7.42067 11.3917 8.262 12.625C9.104 13.8583 10.35 15.1417 12 16.475ZM12 19C9.65 17.2667 7.89567 15.5833 6.737 13.95C5.579 12.3167 5 10.7167 5 9.15C5 7.96667 5.21267 6.929 5.638 6.037C6.06267 5.14567 6.60833 4.4 7.275 3.8C7.94167 3.2 8.69167 2.75 9.525 2.45C10.3583 2.15 11.1833 2 12 2C12.8167 2 13.6417 2.15 14.475 2.45C15.3083 2.75 16.0583 3.2 16.725 3.8C17.3917 4.4 17.9377 5.14567 18.363 6.037C18.7877 6.929 19 7.96667 19 9.15C19 10.7167 18.4207 12.3167 17.262 13.95C16.104 15.5833 14.35 17.2667 12 19ZM12 11C12.55 11 13.021 10.804 13.413 10.412C13.8043 10.0207 14 9.55 14 9C14 8.45 13.8043 7.979 13.413 7.587C13.021 7.19567 12.55 7 12 7C11.45 7 10.9793 7.19567 10.588 7.587C10.196 7.979 10 8.45 10 9C10 9.55 10.196 10.0207 10.588 10.412C10.9793 10.804 11.45 11 12 11ZM5 22V20H19V22H5Z"
                        fill="#19486A" />
                    </g>
                  </svg>


                  <p class="text">
                    <mark>{{ locationString(item.location, t) }}</mark>
                  </p>
                </div>
              </div>
              <div class="content-row" v-if="item?.impactArea">
                <div class="content">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_14290_32814" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_14290_32814)">
                      <path
                        d="M11.0008 23V21C8.91745 20.7666 7.13012 19.9043 5.63878 18.413C4.14678 16.921 3.28411 15.1333 3.05078 13.05H1.05078V11.05H3.05078C3.28411 8.96664 4.14678 7.17931 5.63878 5.68798C7.13012 4.19598 8.91745 3.33331 11.0008 3.09998V1.09998H13.0008V3.09998C15.0841 3.33331 16.8718 4.19598 18.3638 5.68798C19.8551 7.17931 20.7174 8.96664 20.9508 11.05H22.9508V13.05H20.9508C20.7174 15.1333 19.8551 16.921 18.3638 18.413C16.8718 19.9043 15.0841 20.7666 13.0008 21V23H11.0008ZM12.0008 19.05C13.9341 19.05 15.5841 18.3666 16.9508 17C18.3174 15.6333 19.0008 13.9833 19.0008 12.05C19.0008 10.1166 18.3174 8.46664 16.9508 7.09998C15.5841 5.73331 13.9341 5.04998 12.0008 5.04998C10.0674 5.04998 8.41745 5.73331 7.05078 7.09998C5.68411 8.46664 5.00078 10.1166 5.00078 12.05C5.00078 13.9833 5.68411 15.6333 7.05078 17C8.41745 18.3666 10.0674 19.05 12.0008 19.05Z"
                        fill="#19486A" />
                    </g>
                  </svg>
                  <p class="text">
                    <mark>{{ $t('labels.' + item.impactArea) }}</mark>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </a>
  </div>
</template>

<script setup>
import { excerpt, locationString, dateRangeString } from '../utils/card'
const config = useRuntimeConfig();
const { t } = useI18n();
const { $i18n } = useNuxtApp();

const props = defineProps({
  item: {
    type: Object
  }
})


const logoUrl = computed(() => { return props.item.logo ? config.privateAssetsUrl + '/files/' + props.item.logo : null })
const url = computed(() => {
  const path = props.item.activityType ? `/organisations/${props.item.organisation.id}/` : '/organisations/'
  return config.appUrl + path + props.item.id
})


function isexpiredEvent(period) {
  if (!period || period.permanent) {
    return false;
  }
  const nowTs = new Date().getTime();
  const { end } = period;
  const endTs = new Date(end).getTime();

  return nowTs - endTs > 0;
}



function showAsExpired(entity, activity = false) {
  return activity && entity
    ? isexpiredEvent(entity.period)
    : false;
}

</script>

<style lang="scss" scoped>
$card-height: 300px;
$text-color: var(--gw-blue-dark);

.card-wrapper {
  padding: 24px 12px;
}

.card {
  width: 100%;
  height: 100%;
  padding-bottom: 32px;
  display: grid;
  grid-template-columns: 7rem 1fr;
  position: relative;
  gap: 12px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, .12);
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: var(--light-gray);

  }

  overflow: hidden;
  transition: transform 200ms;

  &.expired {
    opacity: .7;
  }

  .expired-badge {
    z-index: 200;
    position: absolute;
    left: 16px;
    top: 16px;
    color: white;
    background-color: var(--gw-blue-dark);
    transform: rotate(-5deg);
    padding: 8px 24px;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
  }

  .logo-column {
    padding: 32px 0 32px 32px;
    position: relative;

    .logo-wrapper {
      height: 72px;
      width: 72px;
      z-index: 10;
    }
  }

  .content-column {
    display: grid;
    gap: 8px;
    grid-auto-rows: min-content;
    position: relative;
    z-index: 10;
    padding: 32px 32px 32px 0;


    .card-header {
      display: grid;
      grid-template-columns: 1fr;
      position: relative;
      z-index: 40;
      box-shadow: none;
      background: transparent;
      padding: 0;
      height: auto;

      .type {
        display: inline-block;
        margin-bottom: 32;
      }
    }

    .title {
      color: $text-color;
      margin: 0;
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
      hyphens: auto;
      background: none;
      height: fit-content;
    }



    .infos {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;

      .description {
        .description-text {
          font-size: 12px;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
          margin: 0;
          margin-bottom: 12px;
        }
      }

      .details {
        display: grid;
        gap: 10px;

        .info-title {
          color: $text-color;
          font-weight: bold;
          font-size: 12px;
          line-height: 18px;
          margin: 0;
          background: none;
        }

        .details-entries {
          display: grid;
          gap: 10px;
          height: fit-content;
        }

        .text {
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
}

.winner-badge {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--gw-blue-dark);
  font-weight: 600;
  line-height: 14px;
  font-size: 12px;

  .icon {
    display: flex;
    align-items: center;
  }
}

.type-label {
  border: none;
  display: block;
  padding: 7px 8px;
  height: 100%;
  line-height: 14px;
  width: fit-content;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  max-width: 200px;
  color: white;

  &.orga {
    background-color: var(--gw-orange);
  }

  &.activity {
    background-color: var(--gw-green);
  }

  &.dan {
    background-color: var(--dan-blue);
  }


}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;

  .logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

}




.content-row {
  position: relative;


  p {
    margin: 0;
  }

  mark {
    box-decoration-break: clone;
    background: transparent;
    box-shadow: 0 -7px 0 inset var(--gw-blue-light), 0 4px 0 var(--gw-blue-light);
    color: var(--gw-blue-dark);
  }

  .content {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      flex-shrink: 0;
    }
  }

  .decorator {
    z-index: 0;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 16px;
    background-color: var(--gw-blue-light);
  }
}

@media screen and (min-width: 650px) {
  .card {
    .content-column {
      display: grid;
      gap: 20px;

      .card-header {
        grid-template-columns: 2fr 1fr;

        .type {
          display: inline-block;
          margin-bottom: 0;
        }
      }

      .infos {
        grid-template-columns: 2fr 1fr;
        gap: 24px;
      }
    }
  }
}
</style>
