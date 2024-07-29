// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Spring Boot 서버 주소
  timeout: 1000,
});

export default instance;
