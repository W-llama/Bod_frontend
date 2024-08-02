<template>
  <div id="app" class="app-container">
    <MyPageSlideBar @edit-profile="showProfileEditModal = true" @profile-updated="updateUserProfile" />
    <main class="main-content">
      <div class="container">
        <h1 class="page-title">나의 챌린지 현황</h1>
        <div class="kanban-board">
          <div class="kanban-column">
            <h2>시작 전</h2>
            <div v-if="beforeChallenges.length === 0" class="no-data">신청한 목록이 없습니다.</div>
            <div v-else>
              <div v-for="challenge in beforeChallenges" :key="challenge.challengeId" class="kanban-card">
                <img :src="challenge.image" alt="카드 이미지" class="kanban-card-image" />
                <div class="kanban-card-title">{{ challenge.title }}</div>
                <div class="kanban-card-period">{{ formatDate(challenge.startTime) }} ~ {{ formatDate(challenge.endTime) }}</div>
              </div>
            </div>
          </div>
          <div class="kanban-column">
            <h2>진행 중</h2>
            <div v-if="ongoingChallenges.length === 0" class="no-data">신청한 목록이 없습니다.</div>
            <div v-else>
              <div v-for="challenge in ongoingChallenges" :key="challenge.challengeId" class="kanban-card">
                <img :src="challenge.image" alt="카드 이미지" class="kanban-card-image" />
                <div class="kanban-card-title">{{ challenge.title }}</div>
                <div class="kanban-card-period">{{ formatDate(challenge.startTime) }} ~ {{ formatDate(challenge.endTime) }}</div>
                <div class="kanban-card-progress">
                  <progress :value="challenge.completionRate" max="100"></progress>
                  <span>{{ challenge.completionRate }}%</span>
                </div>
                <button class="btn" @click="openVerificationModal(challenge.challengeId)">인증하기</button>
              </div>
            </div>
          </div>
          <div class="kanban-column">
            <h2>완료</h2>
            <div v-if="completedChallenges.length === 0" class="no-data">신청한 목록이 없습니다.</div>
            <div v-else>
              <div v-for="challenge in completedChallenges" :key="challenge.challengeId" class="kanban-card">
                <img :src="challenge.image" alt="카드 이미지" class="kanban-card-image" />
                <div class="kanban-card-title">{{ challenge.title }}</div>
                <div class="kanban-card-period">{{ formatDate(challenge.startTime) }} ~ {{ formatDate(challenge.endTime) }}</div>
                <div>완료일: {{ formatDate(challenge.createAt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <VerificationModal v-if="showVerificationModal"
                       :challengeId="selectedChallengeId"
                       @close="showVerificationModal = false" />

    <ProfileEditModal v-if="showProfileEditModal"
                      @close="showProfileEditModal = false"
                      @profile-updated="updateUserProfile" />
  </div>
</template>

<script>
import VerificationModal from '@/components/myPage/VerificationModal.vue';
import MyPageSlideBar from '@/components/myPage/MyPageSideBar.vue';
import ProfileEditModal from '@/components/myPage/ProfileEditModal.vue';
import { mapActions } from 'vuex';
import axios from "@/axios";

export default {
  name: 'MyPage',
  components: {
    VerificationModal,
    MyPageSlideBar,
    ProfileEditModal,
  },
  data() {
    return {
      showVerificationModal: false,
      showProfileEditModal: false,
      selectedChallengeId: null,
      beforeChallenges: [],
      ongoingChallenges: [],
      completedChallenges: [],
    };
  },
  async created() {
    await this.fetchChallenges();
  },
  methods: {
    ...mapActions(['fetchUserProfile']),
    async fetchChallenges() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('/users/profile/challenges', {
          headers: {
            Authorization: accessToken,
          },
        });
        const challengeSlices = response.data.data;
        this.beforeChallenges = challengeSlices.beforeChallenges.content;
        this.ongoingChallenges = challengeSlices.ongoingChallenges.content;
        this.completedChallenges = challengeSlices.completedChallenges.content;
      } catch (error) {
        console.error('Failed to fetch challenge list:', error);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    openVerificationModal(challengeId) {
      this.selectedChallengeId = challengeId;
      this.showVerificationModal = true;
    },
    async updateUserProfile() {
      try {
        await this.fetchUserProfile();
      } catch (error) {
        console.error('Profile update failed:', error);
        alert('프로필 업데이트 중 오류가 발생했습니다.');
      }
    },
  },
};
</script>

<style scoped>
body,
html {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f4f7f6;
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
  margin: 0;
}

.app-container {
  display: flex;
  width: 100%;
}

.main-content {
  flex-grow: 1;
  margin-left: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.container {
  width: 100%;
  max-width: 1050px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.page-title {
  margin-bottom: 1rem;
  color: white;
  text-align: center;
}

.kanban-board {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.kanban-column {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  min-width: 300px;
  max-width: 300px;
  padding: 1rem;
}

.kanban-column h2 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.no-data {
  color: white;
  text-align: center;
  margin-top: 1rem;
}

.kanban-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: move;
}

.kanban-card-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.kanban-card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.kanban-card-period {
  color: #666;
  margin-bottom: 10px;
}

.kanban-card-progress {
  margin-top: 0.5rem;
}

progress {
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #ddd;
}

progress::-webkit-progress-bar {
  background-color: #ddd;
  border-radius: 5px;
}

progress::-webkit-progress-value {
  background-color: #667eea;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background-color: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  text-align: center;
}

.btn:hover {
  background-color: #764ba2;
}
</style>
