import axios from 'axios';
import { links } from '../service/links';
import { getAccessToken, getRefreshToken } from './token';

const urlRefresh = links.REFRESH_TOKEN;

const refreshToken = async () => {
  try {
    const response = await axios.post(urlRefresh, {
      refresh_token: getRefreshToken(),
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error('Не удалось обновить токен');
  }
};

const createApiInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    async (config) => {
      const accessToken = getAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401 && getRefreshToken()) {
        try {
          const newAccessToken = await refreshToken();
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const api = createApiInstance(links.BASE_URL);
