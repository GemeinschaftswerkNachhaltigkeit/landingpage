import Keycloak from 'keycloak-js';

export const useAuth = (config) => {
  const loggedIn = ref(false);
  const ready = ref(false);
  const error = ref(false);
  const userInfo = ref(null);
  let keycloak = null;

  onMounted(async () => {
    window.onfocus = async function () {
      console.log('focus', keycloak);
      keycloak = new Keycloak({
        url: config.url,
        realm: config.realm,
        clientId: config.clientId,
      });
      console.log('########### MOUNT: Initializing keycloak');
      keycloak.onAuthSuccess = async () => {
        console.log('########### onAuthSuccess');
        await keycloak?.loadUserInfo();
        userInfo.value = keycloak?.userInfo;
        loggedIn.value = true;
      };
      keycloak.onAuthError = (e) => {
        console.log('########### onAuthError', e);
        loggedIn.value = false;
      };
      keycloak.onReady = (authenticated) => {
        console.log('########### onReady: authenticated', authenticated);
        loggedIn.value = !!authenticated;
        ready.value = true;
      };

      keycloak.onTokenExpired = async () => {
        try {
          await keycloak?.updateToken(30);
        } catch (error) {
          console.log(error);
        }
      };
      try {
        await keycloak?.init({
          onLoad: 'check-sso',
        });
        console.log('########### Init success');
      } catch (e) {
        console.log('########### Init error', e);
        error.value = true;
        ready.value = true;
      }
    };
  });

  async function logout(redirect) {
    await keycloak?.logout({
      redirectUri: redirect,
    });
  }

  return {
    loggedIn: loggedIn,
    ready: ready,
    error: error,
    userInfo: userInfo,
    logout: logout,
  };
};
