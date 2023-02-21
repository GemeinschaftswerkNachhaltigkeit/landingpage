<template>      
    <form
      @submit.prevent="sendMessage"
      class="search-form">
      <div class="labeled-input">
        <label for="query">{{$t('labels.query')}}</label>
        <input id="query" class="control" v-model="query" />
        <div class="hint">{{$t('hints.query')}}</div>
      </div>
      <div class="labeled-input">
        <label for="query">{{$t('labels.location')}}</label>
        <input id="location" class="control"  v-model="location" />
        <div class="hint">{{$t('hints.location')}}</div>
      </div>

      
      <div class="control">      
        <Select 
          :label="$t('labels.sdgsSearchForm')"
          :options="sdgOptions" 
          accent
          v-model="sustainabilityGoals"></Select>
      </div>
      <div class="control">      
        <Select 
          :label="$t('labels.thematicFocus')"
          :options="focusOptions"
          v-model="thematicFocus"
          :valuesMapper="focusValuesMapper"
          accent
          countBadge
          optionsLeft></Select>
      </div>
      <button class="submit-btn" type="submit">{{ $t('btn.search') }}</button>

    </form>
</template>
<style lang="scss" scoped>
.search-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  width: 100%;

  .labeled-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    min-width: 150px;
    flex-grow: 1;

    label {
      font-size: 12px;
    }

    input {
      border-color: var(--gw-magenta);
    }

    .control {
      flex-grow: 1;
    }
  }

  .hint {
    height: 20px;
    font-size: 9px;
    line-height: 120%;
  }

  .control {
    width: 100%;
    flex-shrink: 1;
  }

  .submit-btn {
    min-width: 150px;
    letter-spacing: 1.25px;
    font-weight: 700;
  }

  @media screen and (min-width: 950px) {
    flex-direction: row;
  }
  @media screen and (min-width: 1000px) {
    .labeled-input {
      label {
        font-size: 15px;
      }
    }
  }
}
</style>
<script>
import { thematicFocusEntries } from "../models/thematic-focus";
import * as qs from "query-string";
export default {
  data() {
    return {
      loading: false,
      success: false,
      errored: false,
      query: "",
      location: "",
      sustainabilityGoals: [],
      thematicFocus: [],
    };
  },
  computed: {
    sdgOptions() {
      return Array.from({ length: 17 }, (_, i) => i + 1).map((goal) => ({
        key: goal,
        label: goal + " " + this.$i18n.t("SDGS.goal_" + goal),
      }));
    },
    focusOptions() {
      return Object.keys(thematicFocusEntries).map((key) => {
        return {
          key: key,
          label: this.$i18n.t("thematicFocus." + thematicFocusEntries[key]),
        };
      });
    },
  },
  methods: {
    focusValuesMapper(values) {
      return values.map((v) => this.$i18n.t("thematicFocus." + v));
    },
    sendMessage() {
      const queryParameter = qs.stringify({
        query: this.query,
        location: this.location,
        sdgs: this.sustainabilityGoals,
        thematicFocus: this.thematicFocus,
      });
      const url = `${this.$config.appUrl}/map?${queryParameter}`;
      window.location.href = url;
    },
  },
};
</script>