import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'https://localhost:8443/api', // Backend server URL
  timeout: 5000,
  withCredentials: true, // 자격 증명 포함
});

instance.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
      const accessToken = response.headers['authorization'];
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        store.commit('setAccessToken', accessToken);
        store.commit('setAuthenticated', true);
      }
      return response;
    },
    async error => {
      if (error.response && error.response.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
);

export default instance;
