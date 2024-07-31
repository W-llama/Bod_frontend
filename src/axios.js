import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Spring Boot 서버 주소
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
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axios.post('http://localhost:8080/api/refresh-token', {}, { withCredentials: true });
          const newAccessToken = response.data.data.accessToken;

          localStorage.setItem('accessToken', newAccessToken);
          store.commit('setAccessToken', newAccessToken);

          axios.defaults.headers.common['Authorization'] = newAccessToken;
          originalRequest.headers['Authorization'] = newAccessToken;

          return axios(originalRequest);
        } catch (e) {
          console.error('리프레시 토큰이 만료되었습니다. 다시 로그인 해주세요.');
          store.commit('clearAuth');
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    }
);

export default instance;
