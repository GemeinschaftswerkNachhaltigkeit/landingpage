<template>
  <a class="card" :style="{ height: height || null }"
    :href="$config.appUrl + '/organisations/' + item.organisation?.id + '/' + item.id">
    <article>
      <div class=" logo">
        <img :src="logoUrl" alt="logo" v-if="item.logo" />
      </div>
      <a v-if="item?.organisation?.id" class="orga-link"
        :href="config.appUrl + '/organisations/' + item.organisation?.id">{{
          item.organisation?.name }}</a>
      <h3 class="title">{{ item.name }}</h3>
      <div class="description" v-if="fullText" v-html="item.description"></div>
      <div class="description" v-else>{{ excerpt(item.description) }}</div>
    </article>
    <footer class="footer">
      <div class="content-row">
        <div class="content">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path
              d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"
              fill="currentColor" />
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
                fill="currentColor" />
            </g>
          </svg>
          <p class="text">
            <mark>{{ locationString(item.location, t) }}</mark>
          </p>
        </div>
      </div>


    </footer>
  </a>
</template>

<script setup>
import { excerpt, locationString, dateRangeString } from '../utils/card'
const config = useRuntimeConfig();
const { t } = useI18n();
const { $i18n } = useNuxtApp();

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

const logoUrl = computed(() => { return props.item.logo ? config.privateAssetsUrl + '/files/' + props.item.logo : null })


</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: white;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, .2);

  article {
    flex-grow: 1;
    padding: 16px 24px 40px 24px;

    .description {
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
    }

    .logo {
      width: 88px;
      height: 88px;
      margin-bottom: 24px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border: 2px solid var(--light-gray);

      }
    }

    .orga-link {
      display: inline-block;
      margin-bottom: 32px;
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

  footer.footer {
    position: relative;
    height: 72px;
    flex-shrink: 0;
    padding-inline: 16px;
    background: var(--gw-blue-light);
    display: flex;
    align-items: center;
    gap: 12px;

    .badge {
      position: absolute;
      top: 0%;
      transform: translateY(-50%);
      left: 32px;
      background: var(--gw-orange);
      color: white;
      height: 28px;
      padding-inline: 8px;
      display: flex;
      align-items: center;
    }

    .content-row {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 0 0 50%;

      p {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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