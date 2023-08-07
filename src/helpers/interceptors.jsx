import axios from 'axios';
import { links } from '../service/links';
import { getAccessToken, getRefreshToken } from './token';

const urlRefresh = links.REFRESH_TOKEN;

const refreshToken = async function refreshToken() {
  try {
    const response = await axios.post(urlRefresh, {
      refresh_token: getRefreshToken(),
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error('Не удалось обновить токен');
  }
};

export const api = axios.create({
  baseURL: links.BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401 && getRefreshToken()) {
      try {
        const newAccessToken = await refreshToken();

        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
