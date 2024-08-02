<template>
  <div class="signup-container">
    <div class="background-shape"></div>
    <div class="logo">
      <img src="https://challengers.co.kr/logo.png" alt="챌린저스 로고">
    </div>
    <h1>회원가입</h1>
    <form @submit.prevent="signUp">
      <div class="input-group">
        <input type="text" v-model="signUpData.username" required placeholder=" ">
        <label for="username">아이디</label>
        <button type="button" @click="checkUsername" class="check-btn">중복 확인</button>
      </div>
      <span v-if="usernameError" :class="{ error: !usernameValid, success: usernameValid }">{{ usernameError }}</span>

      <div class="input-group">
        <input type="text" v-model="signUpData.name" required placeholder=" ">
        <label for="name">이름</label>
      </div>

      <div class="input-group">
        <input type="email" v-model="signUpData.email" required placeholder=" ">
        <label for="email">이메일</label>
        <button type="button" @click="checkEmail" class="check-btn">중복 확인</button>
      </div>
      <span v-if="emailError" :class="{ error: !emailValid, success: emailValid }">{{ emailError }}</span>

      <div class="input-group">
        <input type="password" v-model="signUpData.password" required placeholder=" ">
        <label for="password">비밀번호</label>
      </div>
      <span v-if="passwordError" class="error">{{ passwordError }}</span>

      <div class="input-group">
        <input type="password" v-model="signUpData.confirmPassword" required placeholder=" ">
        <label for="confirm-password">비밀번호 확인</label>
      </div>

      <div class="input-group">
        <input type="text" v-model="signUpData.nickname" required placeholder=" ">
        <label for="nickname">닉네임</label>
        <button type="button" @click="checkNickname" class="check-btn">중복 확인</button>
      </div>
      <span v-if="nicknameError" :class="{ error: !nicknameValid, success: nicknameValid }">{{ nicknameError }}</span>

      <button type="button" @click="toggleAdminKey" class="toggle-admin-btn">관리자 시크릿 키 추가</button>

      <div class="input-group" v-if="showAdminKey">
        <input type="password" v-model="signUpData.adminToken" placeholder=" ">
        <label for="adminToken">시크릿 키</label>
        <button type="button" @click="validateAdminToken" class="check-btn">검증</button>
      </div>
      <span v-if="adminTokenError" :class="{ error: !adminTokenValid, success: adminTokenValid }">{{ adminTokenError }}</span>

      <button type="submit">가입하기</button>
    </form>

    <div class="social-signup">
      <button class="social-btn google-btn" @click="googleSignUp">
        <i class="fab fa-google"></i> Google로 가입
      </button>
      <button class="social-btn naver-btn" @click="naverSignUp">
        <i class="fas fa-n"></i> 네이버로 가입
      </button>
    </div>
    <div class="links">
      <router-link to="/">이미 계정이 있으신가요? 메인페이지로 이동</router-link>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      signUpData: {
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        adminToken: ''
      },
      showAdminKey: false,
      usernameError: '',
      emailError: '',
      nicknameError: '',
      adminTokenError: '',
      passwordError: '',
      usernameValid: false,
      emailValid: false,
      nicknameValid: false,
      adminTokenValid: false
    };
  },
  watch: {
    'signUpData.password': function (newVal) {
      this.validatePassword();
      if (!newVal) {
        this.passwordError = '';
      }
    },
    'signUpData.confirmPassword': function (newVal) {
      this.validatePassword();
      if (!newVal) {
        this.passwordError = '';
      }
    },
    'signUpData.username': function (newVal) {
      if (!newVal) {
        this.usernameError = '';
      }
    },
    'signUpData.email': function (newVal) {
      if (!newVal) {
        this.emailError = '';
      }
    },
    'signUpData.nickname': function (newVal) {
      if (!newVal) {
        this.nicknameError = '';
      }
    }
  },
  methods: {
    toggleAdminKey() {
      this.showAdminKey = !this.showAdminKey;
    },
    async signUp() {
      if (!this.validatePassword()) {
        return;
      }

      try {
        const response = await axios.post('/signup', this.signUpData);
        alert('회원가입 성공!');
        console.log(response.data);
        this.$router.push('/');
      } catch (error) {
        console.error(error.response.data);
        alert('회원가입 실패!');
      }
    },
    async checkUsername() {
      if (!this.validateUsername()) return;
      try {
        const response = await axios.post('/signup/check-username', { username: this.signUpData.username });
        if (response.data.data) {
          this.usernameError = '아이디가 이미 존재합니다.';
          this.usernameValid = false;
        } else {
          this.usernameError = '아이디가 사용 가능합니다.';
          this.usernameValid = true;
        }
      } catch (error) {
        console.error(error.response.data);
      }
    },
    async checkEmail() {
      if (!this.validateEmail()) return;
      try {
        const response = await axios.post('/signup/check-email', { email: this.signUpData.email });
        if (response.data.data) {
          this.emailError = '이메일이 이미 존재합니다.';
          this.emailValid = false;
        } else {
          this.emailError = '이메일이 사용 가능합니다.';
          this.emailValid = true;
        }
      } catch (error) {
        console.error(error.response.data);
      }
    },
    async checkNickname() {
      if (!this.validateNickname()) return;
      try {
        const response = await axios.post('/signup/check-nickname', { nickname: this.signUpData.nickname });
        if (response.data.data) {
          this.nicknameError = '닉네임이 이미 존재합니다.';
          this.nicknameValid = false;
        } else {
          this.nicknameError = '닉네임이 사용 가능합니다.';
          this.nicknameValid = true;
        }
      } catch (error) {
        console.error(error.response.data);
      }
    },
    async validateAdminToken() {
      if (!this.signUpData.adminToken) {
        this.adminTokenError = '시크릿 키를 입력해주세요.';
        this.adminTokenValid = false;
        return;
      }
      try {
        const response = await axios.post('/signup/validate-admin-token', { adminToken: this.signUpData.adminToken });
        if (!response.data.data) {
          this.adminTokenError = '유효하지 않은 어드민 토큰입니다.';
          this.adminTokenValid = false;
        } else {
          this.adminTokenError = '유효한 어드민 토큰입니다.';
          this.adminTokenValid = true;
        }
      } catch (error) {
        console.error(error.response.data);
      }
    },
    validateUsername() {
      if (this.signUpData.username.length < 3 || this.signUpData.username.length > 13 || !/^[a-zA-Z0-9]*$/.test(this.signUpData.username)) {
        this.usernameError = '아이디는 3자 이상 13자 이하의 영문자와 숫자로 구성되어야 합니다.';
        this.usernameValid = false;
        return false;
      }
      this.usernameError = '';
      return true;
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.signUpData.email)) {
        this.emailError = '유효한 이메일 주소를 입력해주세요.';
        this.emailValid = false;
        return false;
      }
      this.emailError = '';
      return true;
    },
    validateNickname() {
      if (this.signUpData.nickname.length < 3 || this.signUpData.nickname.length > 13 || !/^[a-zA-Z가-힣0-9]*$/.test(
          this.signUpData.nickname)) {
        this.nicknameError = '닉네임은 3자 이상 13자 이하의 문자와 숫자로 구성되어야 합니다.';
        this.nicknameValid = false;
        return false;
      }
      this.nicknameError = '';
      return true;
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
      if (!passwordRegex.test(this.signUpData.password)) {
        this.passwordError = '비밀번호는 8자 이상 15자 이하, 대문자, 소문자, 숫자 및 특수 문자를 포함해야 합니다.';
        return false;
      }
      if (this.signUpData.password !== this.signUpData.confirmPassword) {
        this.passwordError = '비밀번호가 일치하지 않습니다.';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    googleSignUp() {
      window.location.href = 'http://3.37.71.106:8080/oauth2/authorization/google';
    },
    naverSignUp() {
      window.location.href = 'http://3.37.71.106:8080/oauth2/authorization/naver';
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

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

.signup-container {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 400px;
  padding: 40px;
  position: relative;
  margin: auto;
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
  display: flex;
  align-items: center; /* Align items vertically */
  flex-wrap: wrap; /* Allow items to wrap to the next line */
}

input {
  flex: 1; /* Take up remaining space */
  padding: 12px 15px;
  border: none;
  border-bottom: 2px solid #ddd;
  background-color: transparent;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-block;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.check-btn {
  width: 80px; /* Add width to the button */
  margin-left: 10px; /* Add margin to separate from the input */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  vertical-align: top;
}

.check-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  width: 100%; /* Ensure the error message takes up the full width */
}

.success {
  color: green;
  font-size: 12px;
  margin-top: 5px;
  width: 100%; /* Ensure the success message takes up the full width */
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

.toggle-admin-btn {
  background: #ff9a9e;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.toggle-admin-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.social-signup {
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
<img :src="userProfile && userProfile.image ? userProfile.image : 'https://source.unsplash.com/random/200x200?portrait'" alt="프로필 사진" class="profile-picture">
<h1>{{ userProfile && userProfile.nickname }}</h1>
<p>{{ userProfile && userProfile.introduce }}</p>
<button @click="showProfileEditModal = true" class="btn">프로필 수정</button>
