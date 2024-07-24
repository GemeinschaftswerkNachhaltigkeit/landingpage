<template>
  <div :id="id" class="menu menu-main" :class="{ footer: inFooter }">
    <template v-if="inFooter">
      <template v-for="(item, index) of items">
        <MenuEntry
          v-if="!item?.submenu"
          inFooter
          :url="getItemUrl(item, localePath)"
          :external="!item.lp"
          groupLine
          :isNew="item.new"
          >{{ item.name }}
        </MenuEntry>
        <template v-else>
          <div :class="{ group: index < items.length - 1 }">
            <MenuEntry
              v-for="subitem of item?.submenu"
              inFooter
              :url="getItemUrl(subitem, localePath)"
              :isNew="item.new"
              @menuClicked="closeDropdownMenu('project')"
            >
              {{ subitem.name }}
            </MenuEntry>
          </div>
        </template>
      </template>
    </template>
    <template v-else>
      <div v-for="item of items">
        <MenuEntry
          v-if="!item?.submenu"
          :url="getItemUrl(item, localePath)"
          :external="!item.lp"
          groupLine
          :isNew="item.new"
          @menuClicked="closeSidebar"
        >
          {{ item.name }}
        </MenuEntry>

        <template v-else>
          <DropdownMenuEntry
            :isNew="item.new"
            :isActive="dropdownActive(item.key)"
            :title="item.name"
            class="desktop"
            :open="open === item.key"
            @openMenu="openDropdownMenu(item.key)"
            @closeMenu="() => closeDropdownMenu(item.key)"
          >
            <MenuEntry
              v-for="subitem of item?.submenu"
              :url="getItemUrl(subitem, localePath)"
              enforceUnderlineAlways
              blue
              @menuClicked="closeDropdownMenu(item.key)"
            >
              {{ subitem.name }}
            </MenuEntry>
          </DropdownMenuEntry>
          <CollapsableMenuEntry
            :isNew="item.new"
            :isActive="dropdownActive(item.key)"
            :title="item.name"
            class="mobile"
          >
            <MenuEntry
              v-for="subitem of item?.submenu"
              :url="getItemUrl(subitem, localePath)"
              enforceUnderlineAlways
              blue
              @menuClicked="closeSidebar"
              >{{ subitem.name }}
            </MenuEntry>
          </CollapsableMenuEntry>
        </template>
      </div>
    </template>
    <div class="user accent-font">
      <MenuEntry
        groupLine
        :url="$config.public.appUrl + '/search'"
        :external="true"
        ariaLabel="search"
      >
        <div class="search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
              fill="currentColor"
            />
          </svg>

          <div class="text">{{ t('btn.search') }}</div>
        </div>
      </MenuEntry>
      <a
        :href="$config.public.appUrl + '/account'"
        v-if="user"
        class="user accent-font"
      >
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q10.35 13 12 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q20 16.35 20 17.2V20Zm2-2h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q13.4 15 12 15t-2.775.337Q7.85 15.675 6.5 16.35q-.225.125-.362.35-.138.225-.138.5Zm6-8q.825 0 1.413-.588Q14 8.825 14 8t-.587-1.412Q12.825 6 12 6q-.825 0-1.412.588Q10 7.175 10 8t.588 1.412Q11.175 10 12 10Zm0-2Zm0 10Z"
            />
          </svg>
        </div>
        {{ user?.firstName + ' ' + user?.lastName }}
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
  items: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(['closeSidebar']);
const open = ref(false);
const { $config } = useNuxtApp();
const { t } = useI18n();

function getItemUrl(item, localePath) {
  if (item.lp) {
    return localePath(
      item.target || { name: 'slug', params: { slug: item.slug } }
    );
  } else {
    return $config.public.appUrl + '/' + item.target;
  }
}

function isActive(paths) {
  if (process.client) {
    return paths.includes(window.location.pathname);
  } else {
    return false;
  }
}

function dropdownActive(type) {
  if (type === 'project-nachhaltigkeit') {
    return isActive(['/about', '/partner', '/roadmap']);
  }
  if (type === 'aktions-tage') {
    return isActive(['/projekt-nachhaltigkeit', '/aktions-tage']);
  }
}

function openDropdownMenu(type) {
  open.value = type;
}
function closeDropdownMenu(type) {
  if (type === open.value) {
    open.value = '';
  }
}
function closeSidebar() {
  emit('closeSidebar');
}
</script>

<style scoped lang="scss">
.menu-main {
  display: flex;
  padding: 0;
  padding-right: 24px;

  .search {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  &.footer {
    padding: 0;
    display: grid;
    gap: 0;

    a {
      font-weight: 400;
      color: white;
      font-size: 16px;
      text-transform: none;

      &:hover {
        text-decoration: underline;
      }

      &.router-link-active {
        text-decoration: underline;
      }
    }
  }

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

  .group {
    box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.5) inset;
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

.menu-main a.router-link-active,
.menu-main a:hover {
  font-weight: 700;
}

.menu-main a.router-link-active:after,
.menu-main a:hover:after {
  content: '';
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

@media screen and (min-width: 1600px) {
  .menu-main {
    padding: 0 64px;
    padding-right: 24px;
    gap: 32px;
    width: 100%;

    .search {
      display: flex;
      align-items: center;
      gap: 8px;

      .text {
        display: none;
      }
    }
  }

  .desktop {
    display: block;
  }

  .mobile {
    display: none;
  }
}
</style>
