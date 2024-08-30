import Keycloak from 'keycloak-js';

export const useAuth = (config) => {
  const loggedIn = ref(false);
  const ready = ref(false);
  const error = ref(false);
  const userInfo = ref(null);
  const loginTried = ref(false);
  let keycloak = null;

  onMounted(async () => {
    function checkLoginTrials() {
      const loginTriedValue = sessionStorage.getItem('loginTried');
      if (loginTriedValue) {
        return JSON.parse(loginTriedValue);
      }
      return false;
    }

    function setLoginTrials() {
      sessionStorage.setItem('loginTried', true);
    }

    function clearLoginTrials() {
      sessionStorage.removeItem('loginTried');
    }

    window.onfocus = async function () {
      if (!keycloak.authenticated && !checkLoginTrials()) {
        setLoginTrials(true);
        keycloak.login({ prompt: 'none' });
      }
    };

    keycloak = new Keycloak({
      url: config.url,
      realm: config.realm,
      clientId: config.clientId,
    });
    keycloak.onAuthSuccess = async () => {
      await keycloak?.loadUserInfo();
      userInfo.value = keycloak?.userInfo;
      loggedIn.value = true;
    };
    keycloak.onAuthError = (e) => {
      loggedIn.value = false;
      clearLoginTrials();
    };
    keycloak.onAuthLogout = () => {
      userInfo.value = null;
      loggedIn.value = false;
    };
    keycloak.onReady = (authenticated) => {
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
      const result = await keycloak?.init({
        onLoad: 'check-sso',
      });
    } catch (e) {
      error.value = true;
      ready.value = true;
      clearLoginTrials();
    }
  });

  async function logout(redirect) {
    clearLoginTrials();
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
