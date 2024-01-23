import jwt_decode from 'jwt-decode';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      decodeJwt: (token) => jwt_decode(token),
    },
  };
});
