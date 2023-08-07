export const getAccessToken = () => localStorage.getItem('access_token');
export const setAccessToken = (token) => localStorage.setItem('access_token', token);
export const removeAccessToken = () => localStorage.removeItem('access_token');

export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const setRefreshToken = (token) => localStorage.setItem('refresh_token', token);
export const removeRefreshToken = () => localStorage.removeItem('refresh_token');

export const getUsername = () => localStorage.getItem('user');
export const setUser = (user) => localStorage.setItem('user', user);
export const removeUser = () => localStorage.removeItem('user');
