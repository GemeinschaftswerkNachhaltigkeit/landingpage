<template>
  <div class="select-wrapper" v-click-outside="handleOutsideClick">
    <div class="labeled-select-field-wrapper" :class="{ labeled: !!label }">
      <label class="select-label" for="select" v-if="label">{{ label }}</label>
      <div class="select-field-wrapper">
        <input readonly id="select" :placeholder="placeholder" class="select-field control" :class="{ accent: accent }"
          type="text" :value="values" @click="toggleSelect()">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" />
          </svg>
          <div class="count-badge" v-if="countBadge && count > 1">
            {{ count }}
          </div>
        </div>
      </div>
      <div class="hint" v-if="withHint">{{ hint }}</div>
    </div>

    <div class="options-wrapper">
      <div class="options" v-if="!selectHidden" :class="{ right: optionsLeft }">
        <div v-for="option in options" :key="option.key" class="option">
          <input :id="'option' + option.key" type="checkbox" v-model="selectedSdgs" :value="option.key"
            @change="goalToggledHandler">
          <label :for="'option' + option.key">{{ option.label }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const vClickOutside = useClickOutside();

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
  },
  accent: {
    type: Boolean,
    default: false,
  },
  withHint: {
    type: Boolean,
  },
  hint: {
    type: String,
  },
  heroImagePortrait: {
    type: String,
  },
  formTitle: {
    type: String,
  },
  options: {
    type: Array,
    required: true,
  },
  optionsLeft: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  valuesMapper: {
    type: Function,
  },
  countBadge: {
    type: Boolean,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectPlaceholder = ref('')
const selectHidden = ref(true)
const selectedSdgs = ref([])

const values = computed(() => {
  if (!props.valuesMapper) {
    return props.modelValue.join(",");
  } else {
    return props.valuesMapper(props.modelValue);
  }
})

const count = computed(() => {
  return props.modelValue.length;
})

function handleOutsideClick() {
  if (!selectHidden.value) {
    selectHidden.value = true;
  }
}
function toggleSelect() {
  selectHidden.value = !selectHidden.value;
}
function goalToggledHandler() {
  emit("update:modelValue", selectedSdgs.value);
}
</script>


<style lang="scss" scoped>
.select-wrapper {
  width: 100%;
  flex-shrink: 1;
  flex-grow: 1;

  .labeled-select-field-wrapper {
    &.labeled {
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow: hidden;
    }

    .select-label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
    }

    .hint {
      height: 9px;
      font-size: 0.8rem;
      line-height: 120%;
    }

    .select-field-wrapper {
      position: relative;

      .select-field {
        display: block;
        box-sizing: border-box;
        padding: 13px 20px;
        border: 2px solid var(--gw-blue-dark);
        border-radius: 0;
        width: 100%;
        position: relative;
        padding-right: 3rem;
        background: transparent;
        color: var(--gw-blue-dark);

        &.accent {
          border-color: var(--gw-magenta);
        }

        cursor: pointer;

        &::placeholder {
          color: var(--gw-blue-dark);
        }

        &:focus,
        &:hover {
          outline: none;
        }
      }

      .icon {
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          fill: var(--gw-blue-dark);
        }

        .count-badge {
          position: absolute;
          right: 2px;
          top: 2px;
          background: var(--gw-magenta);
          color: white;
          width: 16px;
          height: 16px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .options-wrapper {
    position: relative;

    .options {
      max-height: 200px;
      overflow: auto;
      border: 2px solid var(--gw-blue-dark);
      border-radius: 0;
      color: var(--gw-blue-dark);
      outline: none;
      font-family: "AzeretMono", monospace;
      display: flex;
      flex-direction: column;
      background: white;
      position: absolute;

      &.right {
        right: 0;
      }

      z-index: 100;

      .option {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.8rem;
        height: 3rem;
        padding: 0 16px;
        flex-shrink: 0;

        &:hover,
        *:hover {
          cursor: pointer;
        }

        &:hover {
          background: transparentize($color: #19486a, $amount: 0.9);
        }

        label {
          width: fit-content;
          height: 100%;
          flex-grow: 1;
          display: flex;
          align-items: center;
        }

        input {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
  }

  @media screen and (min-width: 700px) {
    .options-wrapper {
      .options {
        .option {
          label {
            white-space: nowrap;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1000px) {
    .labeled-select-field-wrapper {
      .select-label {
        font-size: 15px;
      }
    }
  }
}
</style>