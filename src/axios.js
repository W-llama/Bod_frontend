import axios from 'axios';

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

export default instance;
