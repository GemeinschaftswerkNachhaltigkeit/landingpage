<template>
  <div class="search-header">
    <section class="content-section">
      <div class="content-section-wrapper">
        <div class="content">
          <div class="title-lines">
            <h1 class="title">{{ title }}</h1>
            <h2 class="keywords">{{ keywords }}</h2>
          </div>

          <form class="search-bar" @submit.prevent="handleSubmit">
            <div class="search-input">
              <input type="text" :placeholder="$t('labels.searchPlaceholder')" v-model="searchTerm" />
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
                    fill="currentColor" />
                </svg>
              </div>
            </div>

            <button type="submit" mat-flat-button color="accent">
              {{ $t('btn.search') }}
            </button>
          </form>
          <div v-if="true" class="text dark-bg" v-html="content"></div>
        </div>
      </div>

    </section>
    <div class="image">
      <img :src="$imageURL(image, { format: 'png', quality: 80 })" />
      <svg class="desktop-mask" viewBox="0 0 116 274" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 274L-1.4606e-05 0L116 -4.15783e-06L20.0088 137.285L116 274L0 274Z" />
      </svg>

      <svg class="mobile-mask" viewBox="0 0 375 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M189.5 51.4999L7.80438e-06 1.72827L0 91L375 91L375 0.884766L189.5 51.4999Z" />
      </svg>
    </div>
  </div>
</template>





<script setup>
const { $imageURL } = useNuxtApp();
const { $config } = useNuxtApp();


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

const searchTerm = ref('')

function handleSubmit() {
  window.location.href = $config.appUrl + '/search?query=' + searchTerm.value
}
</script>

<style lang="scss" scoped>
.search-header {
  margin-top: 0px;
  background-color: var(--gw-blue-dark);
  color: white;
  min-height: 210px;

  .title,
  .keywords {
    display: block;
    background: none;
  }




  .content-section {
    padding-block: 0;
  }

  .content-section-wrapper {
    padding-block: 32px;
    width: 100%;
  }

  .image {
    width: 100%;
    height: 210px;
    min-height: 210px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }

    .desktop-mask {
      display: none;
    }

    .mobile-mask {
      width: 100%;
      position: absolute;
      bottom: -2px;
      left: 0;
      display: block;
      fill: var(--light-gray);
    }
  }

  .content {
    max-width: none;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .title-lines {
      order: 1;

      .title {
        margin: 0;
        font-size: 18px;
        line-height: 22px;
        font-weight: bold;
        font-family: 'AzeretMono';
      }

      .keywords {
        color: var(--gw-yellow);
        font-size: 18px;
        line-height: 22px;
        font-weight: bold;
        font-family: 'AzeretMono';
        margin: 0;
      }
    }

    .text {
      order: 2;
    }

    .search-bar {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      order: 3;
      flex-direction: column;

      .search-input {
        flex-grow: 1;
        flex-shrink: 1;
        position: relative;
        width: 100%;

        input {
          border: none;
          height: 48px;
          min-width: 0;
          padding: 0 32px 0 48px;
          outline: none;
          width: 100%;
          max-width: 100%;
        }

        input::placeholder {
          color: #737373;
          font-size: .8rem;
          line-height: .8rem;
          letter-spacing: 0px;
        }

        .icon {
          position: absolute;
          left: 16px;
          top: 50%;
          display: flex;
          align-items: center;
          transform: translateY(-50%);
          color: var(--gw-blue-dark);
        }
      }

      button {
        height: 48px;
        width: 100%;
        flex-shrink: 2;
        min-width: 126px;
      }
    }
  }
}

@media (min-width: 800px) {
  .search-header {
    position: relative;

    .image {
      width: 20%;
      height: auto;
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: left;
        display: block;
      }

      .desktop-mask {
        position: absolute;
        bottom: 0;
        height: 100%;
        display: block;
        fill: var(--gw-blue-dark);
      }

      .mobile-mask {
        display: none;
      }
    }

    .content {
      max-width: 68ch;

      .title-lines {
        .title {
          font-size: 24px;
          line-height: 29px;
        }

        .keywords {
          font-size: 32px;
          line-height: 38px;
        }
      }

      .search-bar {
        flex-direction: row;
        order: 1;

        button {
          width: 126px;
        }
      }
    }
  }
}

@media (min-width: 1200px) {
  .search-header {
    .image {
      width: 40%;
    }
  }
}
</style>