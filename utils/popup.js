const DISABLE_POPUP_TIME = 'disable-popup-time';
const ONE_DAY = 24 * 60 * 60 * 1000; //h * min * sec * milliSec
const DAYS_CLOSED = 14;

export const disabelOnClose = (key = DISABLE_POPUP_TIME) => {
  if (process.client) {
    const closeTime = new Date().getTime();
    const disablePopUpTime = localStorage.getItem(key);
    if (!disablePopUpTime) {
      localStorage.setItem(key, closeTime + ONE_DAY * DAYS_CLOSED);
    }
  }
};

export const isDisabled = (key = DISABLE_POPUP_TIME) => {
  if (process.client) {
    const currentTime = new Date().getTime();
    const disablePopUpTime = localStorage.getItem(key);
    let disabled = false;
    if (disablePopUpTime) {
      if (disablePopUpTime > currentTime) {
        disabled = true;
      }
    }
    if (!disabled) {
      localStorage.removeItem(key);
    }
    return disabled;
  }
};

export const openAfter = (after = 0, cb) => {
  const openAfterInMs = after * 1000;

  setTimeout(() => {
    cb();
  }, openAfterInMs);
};
