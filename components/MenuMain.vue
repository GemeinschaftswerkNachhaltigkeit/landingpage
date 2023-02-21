<template>
  <div :id="id" class="menu menu-main" :class="{ footer: inFooter }">



    <template v-if="inFooter">
      <MenuEntry inFooter :url="$config.appUrl + '/map'" external groupLine>{{ $t("menu.map") }}</MenuEntry>
      <MenuEntry inFooter :url="$config.appUrl + '/marketplace/search'" external groupLine>{{
        $t("menu.marketplace")
      }}</MenuEntry>
      <MenuEntry inFooter :url="localePath('about')" blue @menuClicked="closeDropdownMenu">{{
        $t("menu.project")
      }}</MenuEntry>
      <MenuEntry inFooter :url="localePath('roadmap')" blue @menuClicked="closeDropdownMenu">{{
        $t("menu.roadmap")
      }}</MenuEntry>
      <MenuEntry inFooter :url="localePath('partner')" blue @menuClicked="closeDropdownMenu" groupLine>{{
        $t("menu.partner")
      }}</MenuEntry>
      <MenuEntry inFooter :url="localePath('projekt-nachhaltigkeit')" blue @menuClicked="closeSidebar">
        {{
          $t("menu.projectN")
        }}</MenuEntry>
      <MenuEntry inFooter :url="localePath('action-days')" blue @menuClicked="closeSidebar">
        {{
          $t("menu.dan")
        }}</MenuEntry>
    </template>
    <template v-else>
      <MenuEntry :url="$config.appUrl + '/map'" external groupLine>{{ $t("menu.map") }}</MenuEntry>
      <MenuEntry :url="$config.appUrl + '/marketplace/search'" external groupLine>{{
        $t("menu.marketplace")
      }}</MenuEntry>
      <CollapsableMenuEntry :isActive="projectDrowdownActive()" :title="$t('menu.about')" class="mobile">
        <MenuEntry :url="localePath('about')" enforceUnderlineAlways blue @menuClicked="closeSidebar">{{
          $t("menu.project")
        }}</MenuEntry>
        <MenuEntry :url="localePath('roadmap')" enforceUnderlineAlways blue @menuClicked="closeSidebar">{{
          $t("menu.roadmap")
        }}</MenuEntry>
        <MenuEntry :url="localePath('partner')" enforceUnderlineAlways blue @menuClicked="closeSidebar">{{
          $t("menu.partner")
        }}</MenuEntry>
      </CollapsableMenuEntry>
      <CollapsableMenuEntry isNew :isActive="activitiesDrowdownActive()" :title="$t('menu.activities')" class="mobile">
        <MenuEntry :url="localePath('projekt-nachhaltigkeit')" enforceUnderlineAlways blue @menuClicked="closeSidebar">
          {{
            $t("menu.projectN")
          }}</MenuEntry>
        <MenuEntry :url="localePath('action-days')" enforceUnderlineAlways blue @menuClicked="closeSidebar">
          {{
            $t("menu.dan")
          }}</MenuEntry>
      </CollapsableMenuEntry>
      <DropdownMenuEntry :isActive="projectDrowdownActive()" :title="$t('menu.about')" class="desktop"
        :open="open === 'project'" @openMenu="openDropdownMenu('project')"
        @closeMenu="() => closeDropdownMenu('project')">
        <MenuEntry :url="localePath('about')" enforceUnderlineAlways blue @menuClicked="closeDropdownMenu('project')">{{
          $t("menu.project")
        }}</MenuEntry>
        <MenuEntry :url="localePath('roadmap')" enforceUnderlineAlways blue @menuClicked="closeDropdownMenu('project')">
          {{
            $t("menu.roadmap")
          }}</MenuEntry>
        <MenuEntry :url="localePath('partner')" enforceUnderlineAlways blue @menuClicked="closeDropdownMenu('project')">
          {{
            $t("menu.partner")
          }}</MenuEntry>
      </DropdownMenuEntry>
      <DropdownMenuEntry isNew :isActive="activitiesDrowdownActive()" :title="$t('menu.activities')" class="desktop"
        :open="open === 'activities'" @openMenu="openDropdownMenu('activities')"
        @closeMenu="() => closeDropdownMenu('activities')">
        <MenuEntry :url="localePath('projekt-nachhaltigkeit')" enforceUnderlineAlways blue
          @menuClicked="closeDropdownMenu('activities')">{{
            $t("menu.projectN")
          }}</MenuEntry>
        <MenuEntry :url="localePath('action-days')" enforceUnderlineAlways blue
          @menuClicked="closeDropdownMenu('activities')">
          {{
            $t("menu.dan")
          }}</MenuEntry>

      </DropdownMenuEntry>
    </template>
    <div class="user">
      <a :href="$config.appUrl + '/account'" v-if="user" class="user">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q10.35 13 12 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q20 16.35 20 17.2V20Zm2-2h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q13.4 15 12 15t-2.775.337Q7.85 15.675 6.5 16.35q-.225.125-.362.35-.138.225-.138.5Zm6-8q.825 0 1.413-.588Q14 8.825 14 8t-.587-1.412Q12.825 6 12 6q-.825 0-1.412.588Q10 7.175 10 8t.588 1.412Q11.175 10 12 10Zm0-2Zm0 10Z" />
          </svg>
        </div>
        {{ user?.firstName + ' ' + user?.lastName }}
      </a>
    </div>
  </div>
</template>

<script>
import CollapsableMenuEntry from "./Menu/CollapsableMenuEntry.vue";
import DropdownMenuEntry from "./Menu/DropdownMenuEntry.vue";
import MenuEntry from "./Menu/MenuEntry.vue";

export default {
  components: { CollapsableMenuEntry, MenuEntry, DropdownMenuEntry },
  props: {
    id: {
      type: String,
      required: true,
    },
    inFooter: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      open: "",
    };
  },

  methods: {
    projectDrowdownActive() {
      return this.isActive(["/about", "/partner", "/roadmap"]);
    },
    activitiesDrowdownActive() {
      return this.isActive(["/projekt-nachhaltigkeit", "/action-days"]);
    },
    isActive(paths) {
      if (process.client) {
        return paths.includes(
          window.location.pathname
        );
      } else {
        return false;
      }
    },
    openDropdownMenu(type) {
      this.open = type;
    },
    closeDropdownMenu(type) {
      if (type === this.open) {
        this.open = "";
      }
    },
    closeSidebar() {
      this.$emit("closeSidebar");
    },
  },
};
</script>

<style scoped lang="scss">
.menu-main {
  display: flex;
  padding: 0;
  padding-right: 24px;
  gap: 16px;

  &.footer {
    padding: 0;
    display: grid;
    gap: 16px;

    a {
      font-weight: 400;
      color: white;
      font-size: 16px;
      text-transform: none;

      &:hover {
        text-decoration: underline;
      }

      &.nuxt-link-active {
        text-decoration: underline;
      }
    }
  }
}

.menu-main {
  .user {
    display: flex;
    align-items: center;
    margin-left: auto;
    white-space: nowrap;

    .icon {
      display: flex;
      align-items: center;
      fill: var(--gw-blue-dark);
    }
  }
}

#sidenav-menu-main.menu-main {
  .user {
    margin-left: 0;
  }
}

.menu-main a {
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  position: relative;
  line-height: 20px;
  font-weight: 600;
  font-size: 14px;
}

.menu-main a.nuxt-link-active,
.menu-main a:hover {
  font-weight: 700;
}

.menu-main a.nuxt-link-active:after,
.menu-main a:hover:after {
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

.desktop {
  display: none;
}

.mobile {
  display: block;
}

@media screen and (min-width: 1350px) {
  .menu-main {
    padding: 0 64px;
    padding-right: 24px;
    gap: 64px;
  }

  .desktop {
    display: block;
  }

  .mobile {
    display: none;
  }
}
</style>