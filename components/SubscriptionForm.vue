<template>
  <div v-if="success" class="form-success">
    <p>{{ $t('form.submit.success') }}</p>
  </div>
  <form v-else v-on:submit.prevent="handleSubmit" class="subscription-form">
    <div v-if="!loading && error" class="form-error">
      <p>{{ $t('form.submit.error') }}</p>
    </div>


    <input type="text" :placeholder="$t('placeholder.name') + ' *'" required v-model="name" />
    <input type="text" :placeholder="$t('placeholder.organisation')" v-model="organisation" />
    <input type="text" :placeholder="$t('placeholder.position')" v-model="position" />
    <input type="email" :placeholder="$t('placeholder.email') + ' *'" required v-model="email" />
    <div class="select-wrapper">
      <label class="hidden">
        {{ $t('form.contactOptions.tech') }}
      </label>
      <select class="station-select" v-model="station" required>
        <option value="" disabled selected>{{ $t('placeholder.station') + ' *' }}</option>
        <option :disabled="!option.active" v-for="option in options" :value="option.key">{{ option.title }}</option>
      </select>

    </div>

    <span class="privacy">
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
const organisation = ref("")
const position = ref("")
const email = ref("")
const station = ref("")
const privacyConsent = ref("")
const loading = ref(false)
const error = ref(false)
const success = ref(false)

const props = defineProps({
  endpoint: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    default: []
  },
  stations: {
    type: Object,
    default: {}
  },
  lang: {
    type: String,
    default: ""
  },
  formKey: {
    type: String,
    default: ""
  }
})

const emit = defineEmits(['success'])


async function handleSubmit() {
  loading.value = true
  error.value = false;
  success.value = false;
  const enStations = props.stations["en-US"] || [];
  const deStations = props.stations["de-DE"] || [];
  const selectedEnStation = enStations.find(s => s.key === station.value)
  const selectedDeStation = deStations.find(s => s.key === station.value)
  const userLang = props.lang + '';
  console.log(props.lang)
  console.log(userLang)
  const formKeyValue = props.formKey + '';
  const payload = JSON.stringify({
    name: name.value,
    organisation: organisation.value,
    email: email.value,
    position: position.value,
    privacyConsent: privacyConsent.value,
    attributes: {
      station: {
        key: station.value,
        en: selectedEnStation?.title || '',
        de: selectedDeStation?.title || ''
      }
    }
  })
  try {
    await $fetch(config.publicApiUrl + "/" + props.endpoint, {
      method: 'POST',
      body: {
        formKey: props.formKey,
        userLanguage: userLang,
        payload
      }
    })
    success.value = true;
    emit('success')
  } catch (e) {
    error.value = true;
  }
  loading.value = false
}


</script>

<style scoped lang="scss">
.form-success {
  text-align: center;
}

.subscription-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;

  input {
    width: 100%;
  }


  .select-wrapper {
    width: 100%;
    max-width: 100%;

    .station-select {
      width: 100%;
      max-width: 100%;

      option {
        width: 200px;
      }
    }
  }

  .privacy {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;

    input {
      width: auto;
    }
  }

}
</style>