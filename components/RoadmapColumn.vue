<template>
  <section class="column">
    <div>
      <div class="title-wrapper">
        <h3 class="title">{{ title }}</h3>
      </div>
      <div class="entries">
        <article v-for="(entry) in visibleEntries" class="entry" :key="entry.title">
          <div>
            <h4 class="title">{{ entry.title }}</h4>
          </div>
          <p class="content">
            {{ entry.content }}
          </p>
        </article>
      </div>
      <template v-if="invisibleEntries.length">
        <div class="entries">
          <expander :show="open">
            <div class="hidden-entries" v-if="open">
              <article v-for="(entry) in invisibleEntries" class="entry" :key="entry.title">
                <div>
                  <h4 class="title">{{ entry.title }}</h4>
                </div>
                <p class="content">
                  {{ entry.content }}
                </p>
              </article>
            </div>
          </expander>

        </div>

      </template>
    </div>
    <div class="show-more-wrapper">
      <div class="show-more" v-if="invisibleEntries.length">
        <button @click="toggleShowMore">
          <span v-if="!open">{{ $t('btn.showMore') }}</span>
          <span v-if="open">{{ $t('btn.showLess') }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  entries: {
    type: Array,
    default: [],
  },
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["toggle"])

const visibleEntries = computed(() => {
  return props.entries ? props.entries.slice(0, 3) : [];
})

const invisibleEntries = computed(() => {
  return props.entries ? props.entries.slice(3) : [];
})

function toggleShowMore() {
  emit("toggle");
}


</script>

<style lang="scss" scoped>
.title {
  margin: 0;
  padding: 0;
}

.ideas-title {
  display: inline-block;

  &::after {
    background-color: var(--gw-blue-light);
  }
}

.show-more-wrapper {
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: center;

  .show-more {
    display: flex;
    justify-content: center;
    height: fit-content;

    button {
      background: transparent;
      color: var(--gw-blue-navy);
      text-transform: none;
      text-decoration: underline;
      font-weight: normal;
    }
  }
}

.column {
  padding: 24px;
  display: flex;
  flex-direction: column;
  background: var(--gw-blue-light);

  .title-wrapper {
    padding-bottom: 24px;

    .title {
      font-size: 24px;

      &::after {
        display: none;
      }
    }
  }

  .entries,
  .hidden-entries {
    .entry {
      background: white;
      padding: 16px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 4px;
      margin-bottom: 24px;

      .title {
        font-size: 12px;
        background: none;
      }

      .content {
        font-size: 12px;
        margin: 0;
      }
    }
  }
}
</style>