<template>
  <div class="login-container">
    <div class="background-shape"></div>
    <div class="logo">
      <img src="https://challengers.co.kr/logo.png" alt="챌린저스 로고">
    </div>
    <h1>환영합니다!</h1>
    <form @submit.prevent="login">
      <div class="input-group">
        <input type="text" v-model="loginData.username" required placeholder=" ">
        <label for="username">아이디</label>
      </div>
      <div class="input-group">
        <input type="password" v-model="loginData.password" required placeholder=" ">
        <label for="password">비밀번호</label>
      </div>
      <button type="submit">로그인</button>
    </form>
    <div class="social-login">
      <button class="social-btn google-btn" @click="googleLogin">
        <i class="fab fa-google"></i> Google
      </button>
      <button class="social-btn naver-btn" @click="naverLogin">
        <i class="fas fa-n"></i> 네이버
      </button>
    </div>
    <div class="links">
      <router-link to="/signup">회원가입</router-link>
      <a href="https://challengers.co.kr/forgot-password">비밀번호 찾기</a>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', this.loginData);
        alert('로그인이 완료되었습니다.');
        console.log(response.data);
      } catch (error) {
        console.error(error.response.data);
        alert('로그인 실패!');
      }
    },
    googleLogin() {
      alert('Google 로그인 기능은 Google OAuth 구현이 필요합니다.');
    },
    naverLogin() {
      alert('네이버 로그인 기능은 네이버 아이디로 로그인 API 구현이 필요합니다.');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

body, html {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 400px;
  padding: 40px;
  position: relative;
}

.background-shape {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  border-radius: 50%;
  z-index: -1;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo img {
  width: 120px;
  height: auto;
}

h1 {
  color: #333;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 600;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

.input-group {
  position: relative;
  margin-bottom: 25px;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: none;
  border-bottom: 2px solid #ddd;
  background-color: transparent;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

label {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 16px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

input:focus + label,
input:not(:placeholder-shown) + label {
  top: -10px;
  left: 0;
  font-size: 12px;
  color: #667eea;
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.social-login {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 5px;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.google-btn {
  background-color: #DB4437;
  color: white;
}

.naver-btn {
  background-color: #1EC800;
  color: white;
}

.social-btn i {
  margin-right: 10px;
}

.links {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
}

.links a {
  color: #667eea;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s ease;
}

.links a:hover {
  color: #764ba2;
}
</style>
