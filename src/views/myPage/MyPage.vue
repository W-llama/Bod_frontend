<template>
  <div id="app" class="app-container">
    <main class="main-content">
      <MyPageSlideBar @edit-profile="showProfileEditModal = true" @profile-updated="updateUserProfile" />
      <div class="container">
        <h1>나의 챌린지 현황</h1>
        <div class="kanban-board">
          <div class="kanban-column">
            <h2>시작 전</h2>
            <div v-for="challenge in beforeChallenges" :key="challenge.challengeId" class="kanban-card">
              <img :src="challenge.image" alt="카드 이미지" class="kanban-card-image" />
              <div class="kanban-card-title">{{ challenge.title }}</div>
              <div class="kanban-card-period">{{ formatDate(challenge.startTime) }} ~ {{ formatDate(challenge.endTime) }}</div>
            </div>
          </div>
          <div class="kanban-column">
            <h2>진행 중</h2>
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
          <div class="kanban-column">
            <h2>완료</h2>
            <div v-for="challenge in completedChallenges" :key="challenge.challengeId" class="kanban-card">
              <img :src="challenge.image" alt="카드 이미지" class="kanban-card-image" />
              <div class="kanban-card-title">{{ challenge.title }}</div>
              <div class="kanban-card-period">{{ formatDate(challenge.startTime) }} ~ {{ formatDate(challenge.endTime) }}</div>
              <div>완료일: {{ formatDate(challenge.createAt) }}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <VerificationModal v-if="showVerificationModal"
                       :challengeId="selectedChallengeId"
                       :token="userToken"
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
import { mapActions} from 'vuex';
import axios from "@/axios";

export default {
  name: 'ChallengeMyPage',
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
      userToken: localStorage.getItem('accessToken'),
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

/* App container to manage layout */
.app-container {
  display: flex;
  padding-top: 4rem; /* Adjust for header height if necessary */
  margin-left: 280px; /* Offset for sidebar */
  min-height: 100vh;
}

/* Sidebar styles */
.sidebar {
  width: 280px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  color: white;
  position: fixed; /* Fixed position */
  height: calc(100vh - 15rem); /* Full height minus header height */
  top: 4rem; /* Start below the header */
  left: 0;
  z-index: 1000; /* Ensure it stays above content */
  overflow-y: auto; /* Allows for scrolling if sidebar content overflows */
}

.sidebar-logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.sidebar-menu li {
  margin-bottom: 1rem;
}

.sidebar-menu a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.sidebar-menu a:hover,
.sidebar-menu a.active {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Main content styles */
.main-content {
  padding: 2rem;
  flex-grow: 1;
  position: relative;
  overflow: auto; /* Allows for scrolling */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header styles */
header {
  background: transparent;
  color: white;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

/* Typography */
h1,
h2 {
  color: white;
  margin-bottom: 1rem;
}

/* Kanban board styles */
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

/* Button styles */
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
