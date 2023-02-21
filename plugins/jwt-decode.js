import jwt_decode from "jwt-decode";

export default (context, inject) => {
  inject("decodeJwt", jwt_decode);
};
