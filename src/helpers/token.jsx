const tokenLocalStorage = {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
  remove: (key) => localStorage.removeItem(key),
};

const userLocalStorage = {
  get: () => localStorage.getItem('user'),
  set: (user) => localStorage.setItem('user', user),
  remove: () => localStorage.removeItem('user'),
};

export const getAccessToken = () => tokenLocalStorage.get('access_token');
export const setAccessToken = (token) => tokenLocalStorage.set('access_token', token);
export const removeAccessToken = () => tokenLocalStorage.remove('access_token');

export const getRefreshToken = () => tokenLocalStorage.get('refresh_token');
export const setRefreshToken = (token) => tokenLocalStorage.set('refresh_token', token);
export const removeRefreshToken = () => tokenLocalStorage.remove('refresh_token');

export const getUsername = () => userLocalStorage.get();
export const setUser = (username) => userLocalStorage.set(username);
export const removeUser = () => userLocalStorage.remove();
