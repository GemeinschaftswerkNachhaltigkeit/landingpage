import qs from 'query-string';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      stringify: (values) => qs.stringify(values),
    },
  };
});
