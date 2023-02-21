<template>
  <div class="logos-wrapper">
    <div><h2 class="title" v-if="title">{{title}}</h2></div>
    <div class="logos">
      <div class="logo" v-for="logo in logos" :key="logo.directus_files_id">
        <img 
          :src="$imageURL(logo.directus_files_id, {width: 150, format:'png', quality: 80})"
          :alt="files.find((f) => f.id == logo.directus_files_id).title"/>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    logos: {
      type: Array,
      default: [],
    },
    files: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
.logos-wrapper {
  width: 100%;
  .title {
    margin: 0;
  }
  display: grid;
  gap: 24px;
  grid-auto-rows: min-content;
  .logos {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    gap: 24px;

    .logo {
      height: 150px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
}
</style>