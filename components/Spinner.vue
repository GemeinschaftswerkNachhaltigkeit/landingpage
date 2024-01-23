<template>
  <div class="spinner">
    <div class="shapes"></div>
  </div>
</template>

<style scoped lang="scss">
.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 80px;

  .shapes {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background: var(--gw-magenta);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    animation-name: loading;
    animation-duration: 2.4s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.3, 1, 0, 1);
  }



  @keyframes loading {
    33% {
      opacity: 1;
      border-radius: 0;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      background: var(--gw-yellow);
    }

    66% {
      border-radius: 0;
      clip-path: polygon(50% 0, 50% 0, 100% 100%, 0 100%);
      background: var(--gw-blue-dark);
    }
  }
}
</style>