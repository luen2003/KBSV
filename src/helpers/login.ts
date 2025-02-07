export const setCookie = (name: string, value: string, expires?: number) => {
  try {
    if (expires) {
      const now = new Date();
      const time = now.getTime();
      const expireTime = time + expires * 1000;
      now.setTime(expireTime);
      document.cookie = `${name}=${value};expires=${now.toUTCString()};path=/`;
    } else {
      document.cookie = `${name}=${value};`;
    }
  } catch (e) {}
};

export const removeCookie = (name: string) => {
  try {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  } catch (e) {}
};

export const loadCookie = (
  name: string,
  callback: (cookie: string | undefined | null) => void
) => {
  try {
    const parts = document.cookie.split(";");
    const key = `${name}=`;
    const value = parts.find((part) => part.trim().startsWith(key));
    if (value != null && value !== undefined) {
      if (callback != null) {
        callback(value.trim().substr(key.length).trim());
      }
    } else {
      if (callback != null) {
        callback(undefined);
      }
    }
  } catch (e) {
    if (callback != null) {
      callback(null);
    }
  }
};
