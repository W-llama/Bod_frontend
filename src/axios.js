import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'http://3.37.71.106:8080/api', // Spring Boot 서버 주소
  timeout: 5000,
});

// 요청 인터셉터 추가
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

// 응답 인터셉터 추가
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
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshTokenResponse = await axios.post('/api/refresh-token', null, {
            withCredentials: true,
          });

          const newAccessToken = refreshTokenResponse.data.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          store.commit('setAccessToken', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          store.commit('clearAuth');
          alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
);

export default instance;
