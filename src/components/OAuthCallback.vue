<template>
  <div>
    <h1>네이버 로그인 콜백 처리 중...</h1>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'OAuthCallback',
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      try {
        const response = await axios.post('/auth/naver', {
          code: code,
          state: state
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const accessToken = response.headers['authorization'];
        localStorage.setItem('accessToken', accessToken);
        this.$store.commit('setAccessToken', accessToken);
        this.$store.commit('setAuthenticated', true);
        this.$router.push('/');
      } catch (error) {
        console.error('네이버 로그인 실패:', error);
      }
    } else {
      console.error('네이버 로그인 콜백 처리 중 오류 발생: code 또는 state가 없습니다.');
    }
  }
};
</script>
