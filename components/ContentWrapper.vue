<template>
  <div class="content-wrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  margin: 0 auto;
  max-width: 90vw;

}

@media screen and (min-width: 1800px) {

  .content-wrapper {
    max-width: 70vw;
  }
}
</style>