<template>
  <div :id="id" class="menu-account">
    <div class="logged-out" v-if="!loggedIn">
      <a class="link" :href="$config.appUrl + '/account'">{{
        $t("btn.login")
      }}</a>
      <a class="button btn-accent" :href="$config.appUrl + '/account?forceRegistration'">{{
        $t("btn.registration")
      }}</a>
    </div>
    <button v-else class="link logout-link" @click="logout">{{
      $t("btn.logout")
    }}</button>

  </div>
</template>
<style scoped lang="scss">
.menu-account {
  display: flex;
  align-items: center;

  .logged-out {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .link {
    height: 20px;
    line-height: 20px;
    margin: 0 16px;
    margin-left: 0;
    text-decoration: none;
    font-weight: 600;
    position: relative;
    font-size: 14px;
    text-transform: uppercase;

    &:hover:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.51em;
      background-color: var(--gw-yellow);
      z-index: -10;
      -webkit-transition: all 0.1s linear;
      -moz-transition: all 0.1s linear;
      transition: all 0.1s linear;
    }
  }

  .logout-link {
    text-transform: uppercase;
    padding: 0;
  }

  button,
  .button {
    text-transform: none;

    font-weight: normal;
    font-size: 14px;
    line-height: 36px;
    letter-spacing: normal;
    white-space: nowrap;

    padding: 0 16px;
  }

  @media screen and (min-width: 1280px) {
    .link {
      margin-left: 16px;
    }
  }
}
</style>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    loggedIn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
