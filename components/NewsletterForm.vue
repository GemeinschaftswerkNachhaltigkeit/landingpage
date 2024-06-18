<template>
  <form
    class="newsletter-form"
    action="https://seu2.cleverreach.com/f/333922-341577/wcs/"
    method="post"
    target="_blank"
  >
    <!--<form action="https://eu2.cleverreach.com/f/156911-329186/wcs/" method="post" >-->

    <input
      class="email-input"
      type="email"
      :placeholder="$t('placeholder.email') + '*'"
      name="email"
      required
    />

    <!-- <span class="formFieldRequired">*  {{$t('form.required')}}</span> -->

    <span class="formPrivacyAgreement">
      <input
        type="checkbox"
        id="agreePrivacyNewsletter"
        name="1033153[]"
        value="Datenschutz-Einverständnis:"
        required
      />
      <i18n-t
        for="agreePrivacyNewsletter"
        tag="label"
        keypath="agreePrivacy"
        class="title accent-font"
        scope="global"
      >
        <template v-slot:privacyLink>
          <NuxtLink :to="localePath('privacy')" target="_blank">{{
            $t('page.privacy')
          }}</NuxtLink>
        </template>
      </i18n-t>
    </span>
    <button type="submit" @click="handleNewsletterSent">
      {{ $t('btn.signUp') }}
    </button>
  </form>
</template>

<style scoped lang="scss">
.newsletter-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .email-input {
    width: 100%;
  }

  .formPrivacyAgreement {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    input {
      flex-grow: 0;
      flex-shrink: 0;
    }
  }
}
</style>

<script setup>
const emit = defineEmits(['submitted']);

function handleNewsletterSent() {
  emit('submitted');
}
</script>
