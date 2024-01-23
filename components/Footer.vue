<template>
  <footer class="footer">
    <section class="content-section">
      <div class="content-section-wrapper footer-content">
        <div>
          <Logo :id="'footer-logo'" :bg="'blue_white'" :width="300" />
          <div class="footer-html" v-html="footerContent"></div>
        </div>
        <div class="main-menu">
          <template v-if="!hideMenu">
            <h5 class="footer-title">{{ $t("footerMenuLabels.main") }}</h5>
            <MenuMain inFooter :id="'footer-menu-main'" :items="menuItems" />
          </template>
        </div>
        <div class="secondary-menu">
          <template v-if="!hideMenu">
            <div>
              <h5 class="footer-title">{{ $t("footerMenuLabels.account") }}</h5>
              <div class="menu-account">
                <div>
                  <a class="button btn-accent reg-btn" :href="$config.appUrl + '/account?forceRegistration'">{{
                    $t("btn.registration")
                  }}</a>
                </div>
                <div>
                  <a class="button primary-btn login-btn" :href="$config.appUrl + '/account'">{{
                    $t("btn.login")
                  }}</a>
                </div>

              </div>
            </div>
          </template>
          <div>
            <h5 class="footer-title">{{ $t("footerMenuLabels.social") }}</h5>
            <nav class="menu-social accent-font">
              <div v-for="(item) in socialMediaLinks" :key="item.Text">
                <a :href="item.Link" class="logo" target="_blank" rel="noreferrer noopener">
                  {{ item.Text }}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <section class="content-section accent-font">
      <div class="content-section-wrapper">
        <div class="footer-bottom">
          <div class="footer__copyright">{{ $t("footerMenuLabels.copyright", { year: year }) }}</div>
          <nav class="bottom-menu" id="footer-menu-legal">
            <a :href="$assetURL(paticipactionDeclaration)">{{ $t("participationDeclaration") }}</a>
            <NuxtLink :to="localePath('imprint')">{{
              $t("page.imprint")
            }}</NuxtLink>
            <NuxtLink :to="localePath('privacy')">{{
              $t("page.privacy")
            }}</NuxtLink>
          </nav>

        </div>
      </div>
    </section>
  </footer>
</template>



<script setup>
const props = defineProps({
  hideMenu: {
    type: Boolean,
    default: false,
  },
  paticipactionDeclaration: {
    type: String,
    default: '',
  },
  socialMediaLinks: {
    type: Array,
    default: []
  },
  footerContent: {
    type: String,
    default: ""
  },
  menuItems: {
    type: Array,
    default: []
  }
});



const year = computed(() => {
  return new Date().getFullYear();
});
</script>

<style scoped lang="scss">
.footer {
  background-color: var(--gw-blue-dark);
  padding: 56px 0;
  color: white;
  display: grid;
  gap: 32px;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .content-section-wrapper {
    width: 100%;
  }

  .content-section {
    padding: 0;
  }

  .footer-content {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;


    .footer-html {
      margin-top: 38px;
    }

    .footer-title {
      background: none;
      color: var(--gw-yellow);
      font-size: 12px;
      font-weight: 700;
      margin: 0;
      padding-bottom: 10px;
      display: block;
    }

    .secondary-menu {
      display: grid;
      gap: 32px;
      grid-auto-rows: min-content;

      .menu-account {
        display: grid;
        gap: 4px;

        .login-btn {
          justify-content: flex-start;
          padding: 0;
          font-size: 16px;
          font-weight: 400;
        }

        .reg-btn {
          height: 36px;
          line-height: 36px;
          display: inline-block;
          font-size: 14px;
          font-weight: 400;
          padding: 0 16px;
        }
      }

      .menu-social {
        display: grid;
        gap: 4px;

        a {
          line-height: 20px;
        }
      }
    }
  }

  .footer-bottom {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    justify-content: flex-start;
    font-size: 12px;
    gap: 16px;

    .bottom-menu {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
}

@media only screen and (min-width: 1100px) {
  .footer {
    .footer-content {
      gap: 128px;
      grid-template-columns: 4fr repeat(2, minmax(250px, 1fr));
    }

    .footer-bottom {
      flex-direction: row;
      align-items: center;
      height: 30px;
      justify-content: space-between;

      .bottom-menu {
        flex-direction: row;
      }
    }
  }
}
</style>