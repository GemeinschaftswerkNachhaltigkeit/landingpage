<template>
  <div v-if="success" class="form-success">
    <p>{{ $t('form.submit.success') }}</p>
  </div>
  <form v-else v-on:submit.prevent="handleSubmit" class="contact-form">
    <div v-if="!loading && error" class="form-error">
      <p>{{ $t('form.submit.error') }}</p>
    </div>

    <div class="contactAnnonymus">
      <span>{{ $t('form.contactAnnonymus') }}</span>
      <label class="switch">
        <input type="checkbox" v-model="contactAnnonymus">
        <span class="slider round"></span>
      </label>
    </div>
    <div v-if="contactAnnonymus === false">
      <input type="text" :placeholder="$t('placeholder.name') + '*'" required v-model="name" />
      <input type="email" :placeholder="$t('placeholder.email') + '*'" required v-model="email" />
    </div>
    <div class="select-wrapper">
      <label class="hidden">
        {{ $t('form.contactOptions.tech') }}
      </label>
      <select class="long" v-model="contactOption">
        <option value="tech">{{ $t('form.contactOptions.tech') }}</option>
        <option value="content">{{ $t('form.contactOptions.content') }}</option>
        <option value="idea">{{ $t('form.contactOptions.idea') }}</option>
      </select>
      <select class="short" v-model="contactOption">
        <option value="tech">{{ $t('form.contactOptions.short.tech') }}</option>
        <option value="content">{{ $t('form.contactOptions.short.content') }}</option>
        <option value="idea">{{ $t('form.contactOptions.short.idea') }}</option>
      </select>
    </div>

    <textarea :placeholder="$t('placeholder.message') + '*'" rows="8" required v-model="message"></textarea>

    <!-- <span class="formFieldRequired">*  {{$t('form.required')}}</span>-->

    <span class="formPrivacyAgreement">
      <input v-model="privacyConsent" type="checkbox" id="agreePrivacyContact" name="privacy" value="true" required>
      <i18n-t for="agreePrivacyContact" tag="label" keypath="agreePrivacy" class="title accent-font" scope="global">
        <template v-slot:privacyLink>
          <NuxtLink :to="localePath('privacy')" target="_blank">{{ $t('page.privacy') }}</NuxtLink>
        </template>
      </i18n-t>

    </span>
    <button type="submit" :disabled="loading">{{ $t('btn.submit') }} {{
      loading ? "..." : ""
    }}</button>

  </form>
  <!--</div>-->
</template>


<script setup>

const config = useRuntimeConfig();

const name = ref("")
const email = ref("")
const message = ref("")
const privacyConsent = ref("")
const contactOption = ref("tech")
const contactAnnonymus = ref(false)
const loading = ref(false)
const error = ref(null)
const success = ref(false)


async function handleSubmit() {
  loading.value = true
  error.value = null;
  success.value = null;
  try {
    await $fetch(config.public.publicApiUrl + "/contact-form", {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        message: message.value,
        privacyConsent: privacyConsent.value,
        contactType: contactOption.value,
      }
    })
  } catch (error) {
    error.value = error
  }
  success.value = true;
  loading.value = false
}


</script>

<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: red;*/
  border: 2px solid var(--muted);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 1px;
  bottom: 1px;
  background-color: var(--muted);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked+.slider {
  /* background-color: green;*/
  border: 2px solid var(--gw-blue-dark);
}

input:checked+.slider:before {
  background-color: var(--gw-blue-dark);
}

input:focus+.slider {
  box-shadow: 0 0 1px var(--gw-blue-dark);
}

input:checked+.slider:before {
  -webkit-transform: translateX(19px);
  -ms-transform: translateX(19px);
  transform: translateX(19px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.contact-form>div {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
}

.contact-form .select-wrapper {
  overflow: hidden;
}

.contact-form .select-wrapper select,
.contact-form>div>input {
  flex: 1 1 100%;
}

.contactAnnonymus {
  margin-top: 1em;
}

select {
  &.long {
    display: none;
  }
}

@media screen and (min-width: 1500px) {
  select {
    &.long {
      display: block;
    }

    &.short {
      display: none;
    }
  }
}
</style>