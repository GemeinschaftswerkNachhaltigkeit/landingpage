<template>
  <div class="initiator-badge" v-if="item.initiator">
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path
          d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"
        />
      </svg>
    </div>
    <div class="label">{{ $t('labels.initiator') }}</div>
  </div>
  <div class="winner-badge accent-font" v-if="item.projectSustainabilityWinner">
    <div class="icon">
      <svg
        width="16"
        height="21"
        viewBox="0 0 16 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.675 11.7L6.55 8.85L4.25 7H7.1L8 4.2L8.9 7H11.75L9.425 8.85L10.3 11.7L8 9.925L5.675 11.7ZM2 21V13.275C1.36667 12.575 0.875 11.775 0.525 10.875C0.175 9.975 0 9.01667 0 8C0 5.76667 0.775 3.875 2.325 2.325C3.875 0.775 5.76667 0 8 0C10.2333 0 12.125 0.775 13.675 2.325C15.225 3.875 16 5.76667 16 8C16 9.01667 15.825 9.975 15.475 10.875C15.125 11.775 14.6333 12.575 14 13.275V21L8 19L2 21ZM8 14C9.66667 14 11.0833 13.4167 12.25 12.25C13.4167 11.0833 14 9.66667 14 8C14 6.33333 13.4167 4.91667 12.25 3.75C11.0833 2.58333 9.66667 2 8 2C6.33333 2 4.91667 2.58333 3.75 3.75C2.58333 4.91667 2 6.33333 2 8C2 9.66667 2.58333 11.0833 3.75 12.25C4.91667 13.4167 6.33333 14 8 14ZM4 18.025L8 17L12 18.025V14.925C11.4167 15.2583 10.7877 15.5207 10.113 15.712C9.43767 15.904 8.73333 16 8 16C7.26667 16 6.56233 15.904 5.887 15.712C5.21233 15.5207 4.58333 15.2583 4 14.925V18.025Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="label">{{ $t('labels.winner') }}</div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
});
</script>

<style scoped lang="scss">
.winner-badge {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--gw-blue-dark);
  font-weight: 600;
  line-height: 14px;
  font-size: 12px;

  .icon {
    display: flex;
    align-items: center;
    color: var(--project-n);
  }
}
.initiator-badge {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--gw-blue-dark);
  font-weight: 600;
  line-height: 14px;
  font-size: 12px;
  .icon {
    display: flex;
    align-items: center;
    color: var(--gw-orange);
  }
}
</style>
