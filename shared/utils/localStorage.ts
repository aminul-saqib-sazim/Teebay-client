export const setInLocalStorage = <T>(data: T, keyName: string) =>
  window.localStorage.setItem(keyName, JSON.stringify(data));
