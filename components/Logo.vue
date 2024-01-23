<template>
  <div class="logo" :style="{ width: width + 'px' }" :key="$i18n.locale" :class="$i18n.locale">
    <NuxtLink :to="localePath('index')" title="Home" :id="id" class="logo">
      <img :src="logo()" alt="Logo" loading="eager" />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
}
</style>

<script setup>
import logoDe from "~/assets/img/logo_de.svg?url";
import logoEn from "~/assets/img/logo_en.svg?url";
import logoDarkDe from "~/assets/img/logo_de_blue.svg?url";
import logoDarkEn from "~/assets/img/logo_en_blue_white.svg?url";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  bg: {
    type: String,
    required: false,
  },
  width: {
    type: Number,
    default: 140,
  },
});
const { $i18n } = useNuxtApp();

function logo() {
  let logo = "";
  if (props.bg === undefined) {
    logo = $i18n.locale.value === "de" ? logoDe : logoEn;
  } else {
    logo = $i18n.locale.value === "de" ? logoDarkDe : logoDarkEn;
  }
  return logo
};
</script>
