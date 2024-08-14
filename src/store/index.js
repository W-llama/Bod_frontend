import { createStore } from 'vuex';
import axios from '@/axios';
import router from "@/router";
import header from "@/components/Header.vue";

export default createStore({
  state: {
    isAuthenticated: false,
    accessToken: '',
    userProfile: null,
    refreshToken: null,
    PasswordData:null,
    totalChallengesCount: null,
    totalCompletedChallengesCount: null,
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    userProfile: state => state.userProfile,
    PasswordData: state => state.PasswordData,
    accessToken: state => state.accessToken,
    totalChallengesCount: state => state.totalChallengesCount,
    totalCompletedChallengesCount: state => state.totalCompletedChallengesCount,
  },
  mutations: {
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
      localStorage.setItem('accessToken', token);
    },
    setUserProfile(state, profile) {
      state.userProfile = profile;
    },
    setNewPassword(state, password) {
      state.PasswordData = password;
    },
    setTotalChallengesCount(state, count) {
      state.totalChallengesCount = count;
    },
    setTotalCompletedChallengesCount(state, count) { // 수정된 메서드 이름
      state.totalCompletedChallengesCount = count;
    },
    clearAuth(state) {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.userProfile = null;
    },
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
        } else {
          throw new Error('로그인 실패! 액세스 토큰을 받지 못했습니다.');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            throw new Error('회원탈퇴한 유저입니다.');
          } else if (error.response.status === 404) {
            throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
          } else {
            throw new Error('로그인 실패! 오류: ' + error.message);
          }
        } else {
          throw new Error('로그인 실패! 오류: ' + error.message);
        }
      }
    },
    async logout({ commit }) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.delete('/logout', {
          headers: {
            Authorization: accessToken,
          },
        });
        localStorage.removeItem('accessToken');
        commit('clearAuth');
        await router.push('/');
        alert('로그아웃이 완료되었습니다.');
      } catch (error) {
        alert('로그아웃 실패! 오류: ' + error.message);
      }
    },
    checkAuth({ commit }) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        commit('setAccessToken', accessToken);
        commit('setAuthenticated', true);
      } else {
        commit('clearAuth');
      }
    },
    async withDraw({ commit }, withDrawData) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.delete(`/withdraw?username=${withDrawData.currentUserName}&password=${withDrawData.currentPassword}`, {
          headers: {
            Authorization: accessToken,
          },
        });
        localStorage.removeItem('accessToken');
        alert('회원탈퇴가 완료되었습니다.');
      } catch (error) {
        alert('회원탈퇴 실패! 오류: ' + error.message);
      }
    },
    async fetchUserProfile({ commit }) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('/users/profile', {
          headers: {
            Authorization: accessToken,
          },
        });
        commit('setUserProfile', response.data.data);
      } catch (error) {
        console.error('프로필 조회 실패:', error);
        alert('프로필 조회에 실패했습니다. 다시 로그인 해주세요.');
      }
    },
    async updateProfile({ commit }, profileData) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put('/users/profile', profileData, {
          headers: {
            Authorization: accessToken,
          },
        });
        commit('setUserProfile', response.data.data);
        alert('프로필이 성공적으로 수정되었습니다.');
      } catch (error) {
        console.error('프로필 수정 실패:', error);
        alert('프로필 수정에 실패했습니다.');
      }
    },
    async updateProfileImage({ commit }, imageData) {
      try {
        const formData = new FormData();
        formData.append('profileImage', imageData);
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put('/users/profile/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: accessToken,
          },
        });
        commit('setUserProfile', response.data.data);
      } catch (error) {
        console.error('프로필 이미지 수정 실패:', error);
        alert('프로필 이미지 수정 실패: ' + error.message);
      }
    },
    async changePassword({commit}, oldPassword, newPassword) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response =await axios.put('/users/profile/password', oldPassword, newPassword, {
          headers: {
            Authorization: accessToken,
          },
        });
        commit('setNewPassword', response.data.data);
        console.log(oldPassword, newPassword);
      } catch (error) {
        console.error('비밀번호 변경 실패:', error);
        throw error;
      }
    },
    async fetchTotalChallengesCount({ commit }) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('/users/challenges/count', {
          headers: {
            Authorization: accessToken,
          },
        });
        commit('setTotalChallengesCount', response.data.data);
      } catch (error) {
        console.error('챌린지 갯수 가져오는 것을 실패:', error);
      }
    },
    async fetchTotalCompletedChallengesCount({ commit }) { // 수정된 메서드 이름
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('/users/challenges/completed/count', {
          headers: {
            Authorization: accessToken,
          },
        });
        commit('setTotalCompletedChallengesCount', response.data.data);
      } catch (error) {
        console.log('완료한 챌린지들의 갯수 가져오는 것을 실패:', error);
      }
    },
    async fetchToken({ commit }) {
      try {
        const token = localStorage.getItem('accessToken');
        commit('setAccessToken', token);
      } catch (error) {
        console.error('Failed to fetch token:', error);
        throw error;
      }
    },
  },
});
