<template>
  <div id="app" class="app-container">
    <main class="main-content">
      <ChallengeSideBar @edit-profile="showProfileEditModal = true" @profile-updated="updateUserProfile"/>
      <div class="container">
        <h1>나의 챌린지 현황</h1>
        <div class="kanban-board">
          <div class="kanban-column">
            <h2>시작 전</h2>
            <div v-for="challenge in beforeChallenges" :key="challenge.challengeId" class="kanban-card">
              <img :src="challenge.image" alt="명상 챌린지" class="kanban-card-image">
              <div class="kanban-card-title">{{ challenge.title }}</div>
              <div class="kanban-card-period">{{ formatDate(challenge.startTime) }} ~ {{ formatDate(challenge.endTime) }}</div>
              <!-- <a :href="'/challenge/' + challenge.challengeId" class="btn">상세보기</a> -->
            </div>
          </div>
          <div class="kanban-column">
            <h2>진행 중</h2>
            <div v-for="challenge in ongoingChallenges" :key="challenge.challengeId" class="kanban-card">
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
              <div class="kanban-card-title">{{ challenge.title }}</div>
              <div class="kanban-card-period">{{ formatDate(challenge.startTime) }} ~ {{ formatDate(challenge.endTime) }}</div>
              <div>완료일: {{ formatDate(challenge.createAt) }}</div>
              <!-- <a :href="'/challenge/' + challenge.challengeId" class="btn">결과보기</a> -->
            </div>
          </div>
        </div>
      </div>
    </main>
    <VerificationModal
        v-if="showVerificationModal"
        :challengeId="selectedChallengeId"
        :token="userToken"
        @close="showVerificationModal = false"
    />
    <ProfileEditModal
        v-if="showProfileEditModal"
        :userProfile="userProfile"
        @close="showProfileEditModal = false"
        @profile-updated="updateUserProfile"
    />
  </div>
</template>

<script>
import VerificationModal from '@/components/VerificationFrom.vue';
import ChallengeSideBar from '@/components/ChallengeSideBar.vue';
import ProfileEditModal from '@/components/ProfileEditModal.vue';
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ChallengeMyPage',
  components: {
    VerificationModal,
    ChallengeSideBar,
    ProfileEditModal
  },
  data() {
    return {
      showVerificationModal: false,
      showProfileEditModal: false,
      selectedChallengeId: null,
    };
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  async created() {
    try {
      await this.fetchChallenges();
    } catch (error) {
      console.error('Data fetching error:', error);
      alert('데이터를 가져오는 중 오류가 발생했습니다.');
    }
  },

  methods: {
    ...mapActions(['fetchUserProfile', 'fetchTotalChallengesCount', 'fetchTotalCompletedChallengesCount']),
    async fetchChallenges() {
      try {
        const token = this.userToken;
        if (typeof token !== 'string' || !/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/.test(token)) {
          console.error('Invalid token format');
          alert('Invalid token format. Please log in again.');
          return;
        }
        const tokenWithoutPrefix = token.startsWith('Bearer ') ? token.substring(7) : token;

        const response = await axios.get('http://localhost:8080/api/users/profile/challenges', {
          headers: {
            Authorization: `Bearer ${tokenWithoutPrefix}`,
          }
        });
        const data = response.data.data || {};
        this.completedChallenges = data.completedChallenges?.content || [];
        this.ongoingChallenges = data.ongoingChallenges?.content || [];
        this.beforeChallenges = data.beforeChallenges?.content || [];
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          alert(`Error: ${error.response.status} - ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
          console.error('Error request data:', error.request);
          alert('No response received from the server. Please try again later.');
        } else {
          console.error('Error message:', error.message);
          alert('An error occurred while making the request.');
        }
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    isActive(path) {
      return this.$route.path === path;
    },
    openVerificationModal(challengeId) {
      this.selectedChallengeId = challengeId;
      this.showVerificationModal = true;
    },
    async updateUserProfile() {
      try {
        await this.fetchUserProfile();
        await this.fetchTotalChallengesCount();
        await this.fetchTotalCompletedChallengesCount();
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
h1, h2 {
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
