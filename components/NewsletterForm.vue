<template>

  <form action="https://seu2.cleverreach.com/f/333922-341577/wcs/" method="post" target="_blank">
   <!--<form action="https://eu2.cleverreach.com/f/156911-329186/wcs/" method="post" >-->


    <input type="email" :placeholder="$t('placeholder.email')+'*'" name="email" required></input>

    <!-- <span class="formFieldRequired">*  {{$t('form.required')}}</span> -->

    <span class="formPrivacyAgreement">
        <input type="checkbox" id="agreePrivacyNewsletter" name="1033153[]" value="Datenschutz-Einverständnis:" required>
        <i18n
          for="agreePrivacyNewsletter"
          tag="label"
          path="agreePrivacy"
          class="title">
            <template v-slot:privacyLink>
              <NuxtLink :to="localePath('privacy')" target="_blank">{{$translatePageTitle('privacy')}}</NuxtLink>
            </template>
        </i18n>
    </span>
    <button type="submit" :disabled="loading">{{ $t('btn.signUp') }} {{ loading ? "..." : "" }}</button>
</form>


</template>

<style></style>

<script>
export default {
  data() {
    return {
      loading: false,
      success: false,
      errored: false,
      emailAddress: "",
      privacyConsent: "",
    };
  },
  methods: {
    sendMessage() {
      //https://dev.to/cwraytech/part-8-building-our-contact-form-in-nuxt-and-strapi-frontend-4e3f
      this.loading = true;
      this.$axios
        .post(this.$config.apiProxyPrefix + "/newsletters", {
          emailAddress: this.emailAddress,
          privacyConsent: this.privacyConsent,
        })
        .then((response) => {
          if (
            response.data.errorMessages &&
            response.data.errorMessages.length > 0
          ) {
            this.errored = true;
          } else {
            this.success = true;
            this.errored = false;
          }
        })
        .catch((error) => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
