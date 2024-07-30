import { createStore } from 'vuex';
import axios from '../axios';

export default createStore({
  state: {
    isAuthenticated: false,
    accessToken: '',
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
  },
  mutations: {
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    clearAuth(state) {
      state.isAuthenticated = false;
      state.accessToken = '';
    }
  },
  actions: {
    async login({ commit }, loginData) {
      try {
        const response = await axios.post('/login', loginData);
        const accessToken = response.headers['authorization'];

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          commit('setAccessToken', accessToken);
          commit('setAuthenticated', true);
          alert('로그인이 완료되었습니다.');
        } else {
          alert('로그인 실패! 액세스 토큰을 받지 못했습니다.');
        }
      } catch (error) {
        alert('로그인 실패! 오류: ' + error.message);
      }
    },
    async logout({ commit }) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.delete('/logout', {
          headers: {
            Authorization: accessToken,
          }
        });
        localStorage.removeItem('accessToken');
        commit('clearAuth');
        alert('로그아웃이 완료되었습니다.');
      } catch (error) {
        alert('로그아웃 실패! 오류: ' + error.message);
      }
    },
  },
});
