<template>
  <template v-if="show(data?.feature)">
    <slot />
  </template>
</template>

<script setup>
const { getItems } = useDirectusItems();

const props = defineProps({
  feature: {
    type: String
  }
})

const { data } = await useAsyncData(props.feature, async () => {

  let feature = {};
  try {
    feature = await getItems({
      collection: 'features',
      params: {
        filter: {
          feature: props.feature
        }
      }
    })

  } catch (error) {
    console.log('DIRECTUS Fetch Error', error)
  }
  return {
    feature: feature[0] || null,
  }
});

function show(feature) {
  if (!feature) {
    return true;
  }
  if (feature && feature.active) {
    return inRange(feature.start, feature.end);
  }
  return false;
}

function inRange(start, end) {
  const currentTime = new Date().getTime();
  let startTime = null;
  let endTime = null;
  if (start) {
    startTime = new Date(start).getTime();
  }
  if (end) {
    endTime = new Date(end).getTime();
  }

  if (startTime && !endTime) {
    return currentTime >= startTime;
  }

  if (endTime && !startTime) {
    return currentTime < endTime;
  }

  if (startTime && endTime) {
    return currentTime >= startTime && currentTime < endTime;
  }
  return true;
}
</script>