<template>
  <div>
    <div>TEST</div>
    <h1>{{ title }}</h1>
  </div>

</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
})
</script>

<style>

</style>