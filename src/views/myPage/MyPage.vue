<template>
  <div id="app" class="app-container">
    <MyPageSlideBar @edit-profile="showProfileEditModal = true" @profile-updated="updateUserProfile" />
    <main class="main-content">
      <div class="container">
        <h1 class="page-title">나의 챌린지 현황</h1>
        <div class="kanban-board">
          <KanbanColumn
              title="시작 전"
              :challenges="beforeChallenges"
              noDataMessage="신청한 목록이 없습니다."
              imageMode="before"
          />
          <KanbanColumn
              title="진행 중"
              :challenges="ongoingChallenges"
              noDataMessage="신청한 목록이 없습니다."
              imageMode="ongoing"
              @verification="openVerificationModal"
          />
          <KanbanColumn
              title="완료"
              :challenges="completedChallenges"
              noDataMessage="신청한 목록이 없습니다."
              imageMode="completed"
          />
        </div>
        <div class="pagination-container">
          <button @click="prevPage" :disabled="page === 0">이전</button>
          <span>Page {{ page + 1 }}</span>
          <button @click="nextPage" :disabled="!hasMore">다음</button>
        </div>
      </div>
    </main>
    <VerificationModal
        v-if="showVerificationModal"
        :challengeId="selectedChallengeId"
        @close="showVerificationModal = false"
    />
    <ProfileEditModal
        v-if="showProfileEditModal"
        @close="showProfileEditModal = false"
        @profile-updated="updateUserProfile"
    />
  </div>
</template>

<script>
import VerificationModal from '@/components/myPage/VerificationModal.vue';
import MyPageSlideBar from '@/components/myPage/MyPageSideBar.vue';
import ProfileEditModal from '@/components/myPage/ProfileEditModal.vue';
import KanbanColumn from "@/components/myPage/KanbanColumn.vue";
import { mapActions } from 'vuex';
import axios from "@/axios";

export default {
  name: 'MyPage',
  components: {
    VerificationModal,
    MyPageSlideBar,
    ProfileEditModal,
    KanbanColumn,
  },
  data() {
    return {
      showVerificationModal: false,
      showProfileEditModal: false,
      selectedChallengeId: null,
      beforeChallenges: [],
      ongoingChallenges: [],
      completedChallenges: [],
      page: 0,
      hasMore: true,

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
          params: {
            page: this.page,
            size: 10,
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
    nextPage() {
      if (this.hasMore) {
        this.page += 1;
        this.fetchChallenges();
      }
    },
    prevPage() {
      console.log('Previous Page Clicked');
      if (this.page > 0) {
        this.page -= 1;
        this.fetchChallenges();
      }
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

.kanban-column h2 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
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

.pagination-container {
  text-align: center;
  margin-top: 20px;
}

.pagination-container button {
  padding: 10px 20px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  transition: background-color 0.3s ease;
}

.pagination-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-container span {
  font-size: 18px;
  margin: 0 10px;
}

</style>
