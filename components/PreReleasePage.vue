<template>
  <div class="pre-release-page">
    <div  class="pre-release-wrapper">
      <div class="pre-release-section content-section">
      <div class="content-section-wrapper">
        <div class="pre-release-info">
          <h1>{{title}}</h1>
        <div class="content" v-html="content"></div>
        </div>
      </div>
    </div>
    <div class="image">
        <svg width="1440" height="400" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="1267.95" cy="368.907" rx="177.914" ry="172.253" fill="#4C9F38"/>
        <rect x="886.869" y="359.541" width="248.285" height="248.285" transform="rotate(-62.6071 886.869 359.541)" fill="#A21942"/>
        <path d="M867.895 138.906L1040.9 461.218L616.083 404.247L867.895 138.906Z" fill="#19486A"/>
        <ellipse cx="580.218" cy="334.803" rx="142.736" ry="138.288" fill="#D1FFFF"/>
        <rect x="235.148" y="233.504" width="215.01" height="215.01" transform="rotate(-30.3836 235.148 233.504)" fill="#F5FD00"/>
        <path d="M284.753 148.224L278.793 513.983L-64.4287 257.251L284.753 148.224Z" fill="#DD1367"/>
        </svg>
      </div>
    </div>
    <div class="orga-form-wrapper">
      <section class="form-section">
        <div class="form-content" v-html="formContent"></div>
        <SignUpForm
          :participationDeclarationId="participation_declaration"
        ></SignUpForm>
        
      </section>
      <div class="image">
        <content-section-image :id="bgImage" :alt="alt"></content-section-image>
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
    content: {
      type: String,
      default: "",
    },
    bgImage: {
      type: String,
      default: "",
    },
    formContent: {
      type: String,
      default: "",
    },
    participation_declaration: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.pre-release-wrapper {
  height: 700px;

  position: relative;

  .pre-release-section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .pre-release-info {
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;

    h1 {
      text-align: center;
    }

    .content {
      text-align: center;
      max-width: 60ch;
      line-height: 20px;
      padding: 0;
    }
  }
  .image {
    position: absolute;
    left: 00%;
    right: 0;
    bottom: -160px;
    z-index: -1;
    svg {
      width: 100%;
    }
  }

  @media screen and (min-width: 1000px) {
    .image {
      bottom: -120px;
    }
  }
}
.orga-form-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .form-content {
    padding-top: 32px;
    padding-bottom: 32px;
    line-height: 20px;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>