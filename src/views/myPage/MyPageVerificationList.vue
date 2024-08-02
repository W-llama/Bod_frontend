<template>
  <div class="app-container">
    <MyPageSideBar @edit-profile="showProfileEditModal = true" @profile-updated="updateUserProfile"/>
    <main class="main-content">
      <header>
        <h1>인증 신청 목록</h1>
      </header>
      <div class="verification-list">
        <div v-for="verification in verifications" :key="verification.id" class="verification-item">
          <img :src="verification.verificationImageUrl" alt="챌린지 인증 이미지" class="verification-image">
          <h2 class="verification-title">{{ verification.challengeTitle }}</h2>
          <p class="verification-date">신청일: {{ verification.createdAt }}</p>
          <div class="btn-group">
            <button @click="cancelVerification(verification.verificationId)" class="btn">인증취소</button>
          </div>
        </div>
      </div>
    </main>
    <ProfileEditModal
        v-if="showProfileEditModal"
        @close="showProfileEditModal = false"
        @profile-updated="updateUserProfile"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import MyPageSideBar from '@/components/myPage/MyPageSideBar.vue';
import ProfileEditModal from '@/components/myPage/ProfileEditModal.vue';
import axios from '@/axios';

export default {
  name: 'VerificationList',
  components: {
    ProfileEditModal,
    MyPageSideBar
  },
  data() {
    return {
      showProfileEditModal: false,
      verifications: []
    };
  },
  async created() {
    await this.fetchVerifications();
  },
  methods: {
    ...mapActions(['fetchUserProfile']),
    async fetchVerifications() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('/verifications/users', {
          headers: {
            Authorization: accessToken
          },
        });
        this.verifications = response.data.data.content;
      } catch (error) {
        console.error('Failed to fetch verifications:', error);
      }
    },
    async cancelVerification(verificationId) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.delete(`/verifications/${verificationId}`, {
          headers: {
            Authorization: accessToken
          }
        });
        alert('인증이 취소되었습니다.');
        window.location.reload(); // 페이지 새로고침
      } catch (error) {
        console.error('Failed to cancel verification:', error);
        alert('인증 취소 중 오류가 발생했습니다.');
      }
    },
    async updateUserProfile() {
      try {
        await this.fetchUserProfile();
      } catch (error) {
        console.error('Profile update failed:', error);
        alert('프로필 업데이트 중 오류가 발생했습니다.');
      }
    }
  }
};
</script>

<style scoped>
body, html {
  font-family: 'Noto Sans KR', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  color: white;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  flex-grow: 1;
  margin-left: 280px;
  padding: 5rem;
  max-width: 2000px;
}

header {
  background: transparent;
  text-align: center;
  color: white;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.verification-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
}

.verification-item {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  color: white;
}

.verification-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.verification-date {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.verification-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.btn-group {
  display: flex;
  gap: 0.5rem;
}

.btn {
  flex: 1;
  display: inline-block;
  background-color: #ffd166;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.btn:hover {
  background-color: #ffdc80;
}
</style>
