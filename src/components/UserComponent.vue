<template>
  <div>
    <h1>User Management</h1>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="signUp">
        <input v-model="signUpData.username" placeholder="Username" required />
        <input v-model="signUpData.email" placeholder="Email" required />
        <input v-model="signUpData.password" type="password" placeholder="Password" required />
        <input v-model="signUpData.name" placeholder="Name" required />
        <input v-model="signUpData.nickname" placeholder="Nickname" required />
        <input v-model="signUpData.introduce" placeholder="Introduce" />
        <button type="submit">Sign Up</button>
      </form>
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
        email: '',
        password: '',
        name: '',
        nickname: '',
        introduce: '',
        image: ''
      }
    };
  },
  methods: {
    async signUp() {
      // 유효성 검사
      const namePattern = /^[a-zA-Z가-힣]*$/;
      const nicknamePattern = /^[a-zA-Z가-힣0-9]*$/;
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

      if (!namePattern.test(this.signUpData.name)) {
        alert('Name must contain only letters');
        return;
      }
      if (!nicknamePattern.test(this.signUpData.nickname)) {
        alert('Nickname must contain only letters and numbers');
        return;
      }
      if (!passwordPattern.test(this.signUpData.password)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        return;
      }

      try {
        const response = await axios.post('/signup', this.signUpData);
        console.log(response.data);
        alert('Sign Up Successful!');
      } catch (error) {
        console.error(error.response.data);
      }
    }
  }
};
</script>

<style scoped>
/* 스타일을 여기에 추가할 수 있습니다 */
</style>
