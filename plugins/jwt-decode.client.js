import { jwtDecode } from 'jwt-decode';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      decodeJwt: (token) => jwtDecode(token),
    },
  };
});
