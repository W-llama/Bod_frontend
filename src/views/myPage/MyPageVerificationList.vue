<template>
  <div class="app-container">
    <MyPageSideBar @edit-profile="showProfileEditModal = true" @profile-updated="updateUserProfile"/>
    <main class="main-content">
      <header>
        <h1>인증 신청 목록</h1>
      </header>
      <div class="verification-list" v-if="verifications.length > 0">
        <div v-for="verification in verifications" :key="verification.id" class="verification-item">
          <img :src="verification.verificationImageUrl" alt="챌린지 인증 이미지" class="verification-image">
          <h2 class="verification-title">{{ verification.challengeTitle }}</h2>
          <h2 class="verification-status">인증 상태 : {{formatStatus(verification.status)}}</h2>
          <p class="verification-date">신청일: {{formatDate(verification.createdAt)}}</p>
          <div class="btn-group" v-if="verification.status !== 'APPROVE'">
            <button @click="cancelVerification(verification.verificationId)" class="btn">인증취소</button>
          </div>
        </div>
      </div>
      <div v-else class="no-verifications">
        <p>인증 신청한 목록이 없습니다.</p>
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
  name: 'MyPageVerificationList',
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
        const response = await this.axiosGet('/verifications/users');
        this.verifications = response.data.data.content;
      } catch (error) {
        console.error('Failed to fetch verifications:', error);
      }
    },
    async cancelVerification(verificationId) {
      const confirmed = window.confirm('인증을 정말 취소하시겠습니까?');
      if (!confirmed) return;

      try {
        await this.axiosDelete(`/verifications/${verificationId}`);
        this.verifications = this.verifications.filter(
            verification => verification.verificationId !== verificationId
        );
        alert('인증이 취소되었습니다.');
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
    },
    formatDate(dateTimeString) {
      const [date, time] = dateTimeString.split('T');
      return `${date} ${time.split('.')[0]}`;
    },
    formatStatus(status) {
      const statusMap = {
        APPROVE: '승인',
        REJECT: '거절',
        PENDING: '대기',
      };
      return statusMap[status] || status;
    },
    axiosGet(url) {
      const accessToken = localStorage.getItem('accessToken');
      return axios.get(url, {
        headers: { Authorization: accessToken }
      });
    },
    axiosDelete(url) {
      const accessToken = localStorage.getItem('accessToken');
      return axios.delete(url, {
        headers: { Authorization: accessToken }
      });
    },
  }
};
</script>

<style scoped>
body, html {
  font-family: 'Noto Sans KR', sans-serif;
  background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
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

.main-content {
  flex-grow: 1;
  margin-left: 250px;
  padding: 5rem;
  max-width: 1200px;
}

header {
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  color: white;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-radius: 8px;
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
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  color: white;
  max-width: 250px;
  height: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.verification-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 1px;
}

.verification-status {
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1px;
}

.verification-date {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 1px;
}

.verification-image {
  width: 100%;
  height: 250px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.btn-group {
  display: flex;
  gap: 0.5rem;
}

.btn {
  background-color: #ffd166;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  width: 100%;
}

.btn:hover {
  background-color: #ffdc80;
}

.no-verifications {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  margin-top: 2rem;
}
</style>
