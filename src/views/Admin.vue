<template>
  <div class="container">
    <aside class="sidebar">
      <div class="logo">챌린저스 관리자</div>
      <nav>
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link
                to="/admin"
                class="nav-link"
                :class="{ active: isActive('dashboard') }"
                @click.native="setActive('dashboard')"
            >대시보드</router-link>
          </li>
          <li class="nav-item">
            <router-link
                to="/admin/users"
                class="nav-link"
                :class="{ active: isActive('members') }"
                @click.native="setActive('members')"
            >회원 관리</router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="main-content">
      <header class="header">
        <h1 class="page-title">대시보드</h1>
        <div class="user-info">
          <span>관리자님, 안녕하세요!</span>
        </div>
      </header>

      <div class="stats-grid">
        <div class="stat-card" v-for="(value, key) in stats" :key="key">
          <div class="stat-value">{{ value }}</div>
          <div class="stat-label">{{ labels[key] }}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2 class="card-title">챌린지 관리</h2>
        </div>
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="챌린지 제목으로 검색" class="search-input">
          <button class="search-btn" @click="searchChallenges">검색</button>
        </div>


        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>카테고리</th>
            <th>상태</th>
            <th>시작일</th>
            <th>종료일</th>
            <th>작업</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="challenge in filteredChallenges" :key="challenge.challengeId">
            <td>{{ challenge.challengeId }}</td>
            <td>{{ challenge.title }}</td>
            <td>{{ challenge.category }}</td>
            <td>{{ challenge.conditionStatus }}</td>
            <td>{{ formatDate(challenge.startTime) }}</td>
            <td>{{ formatDate(challenge.endTime) }}</td>
            <td>
              <button @click="viewChallengeDetail(challenge.challengeId)" class="btn btn-get">조회하기</button>
              <button @click="editChallenge(challenge)" class="btn">수정하기</button>
              <button @click="deleteChallenge(challenge.challengeId)" class="btn btn-delete">삭제하기</button>
            </td>
          </tr>
          </tbody>
        </table>

        <button class="create-btn" @click="openCreateModal">
          <i class="fas fa-plus"></i> 새 챌린지 만들기
        </button>
      </div>

      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">이전</button>
        <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">다음</button>
      </div>
    </main>

    <!-- 모달 컴포넌트 -->
    <EditChallengeModal
        :isVisible="isEditModalVisible"
        :challenge="selectedChallenge"
        @close="isEditModalVisible = false"
        @update-success="fetchChallenges"
    />

    <CreateChallengeModal
        :isVisible="isCreateModalVisible"
        @close="isCreateModalVisible = false"
        @create-success="fetchChallenges"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from '../axios';
import EditChallengeModal from '../components/EditChallengeModal.vue';
import CreateChallengeModal from '../components/CreateChallengeModal.vue';

export default {
  components: {
    EditChallengeModal,
    CreateChallengeModal
  },
  data() {
    return {
      activeTab: 'dashboard',
      searchQuery: '',
      currentPage: 1,
      pageSize: 100,
      totalPages: 1,
      totalChallenges: 0,
      challenges: [],
      stats: {
        totalChallenges: 0,
        beforeChallenges: 0,
        todoChallenges: 0,
        completeChallenges: 0
      },
      labels: {
        totalChallenges: '총 챌린지 수',
        beforeChallenges: '대기중인 챌린지 수',
        todoChallenges: '진행중인 챌린지 수',
        completeChallenges: '마감된 챌린지 수'
      },
      isEditModalVisible: false,
      isCreateModalVisible: false,
      selectedChallenge: null
    };
  },
  computed: {
    filteredChallenges() {
      if (!this.searchQuery) {
        return this.challenges;
      }
      return this.challenges.filter(challenge =>
          challenge.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchChallenges() {
      try {
        const response = await axios.get('/admins/challenges', {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
          }
        });
        if (response.status === 200 && response.data) {
          this.challenges = response.data.data || [];
          this.totalChallenges = this.challenges.length;

          this.stats.beforeChallenges = 0;
          this.stats.todoChallenges = 0;
          this.stats.completeChallenges = 0;

          this.challenges.forEach(challenge => {
            switch (challenge.conditionStatus) {
              case 'BEFORE':
                this.stats.beforeChallenges += 1;
                break;
              case 'TODO':
                this.stats.todoChallenges += 1;
                break;
              case 'COMPLETE':
                this.stats.completeChallenges += 1;
                break;
            }
          });

          this.stats.totalChallenges =
              this.stats.beforeChallenges +
              this.stats.todoChallenges +
              this.stats.completeChallenges;

          this.totalPages = Math.ceil(this.totalChallenges / this.pageSize);
        } else {
          console.error('Failed to fetch challenges:', response.data.msg || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    },
    setActive(tab) {
      this.activeTab = tab;
    },
    isActive(tab) {
      return this.activeTab === tab;
    },
    searchChallenges() {
      this.currentPage = 1;
      this.fetchChallenges();
    },
    viewChallengeDetail(id) {
      this.$router.push({ name: 'adminChallengeDetail', params: { challengeId: id } });
    },
    editChallenge(challenge) {
      this.selectedChallenge = challenge;
      this.isEditModalVisible  = true;
    },
    async deleteChallenge(id) {
      // 확인 대화상자를 띄우고 사용자의 응답을 확인합니다.
      const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
      if (isConfirmed) {
        try {
          const response = await axios.delete(`/admins/challenges/${id}`);
          if (response.status === 200) {
            this.fetchChallenges(); // 목록을 새로고침하여 삭제된 챌린지가 반영되도록 합니다.
            console.log('Challenge deleted successfully');
          } else {
            console.error('Failed to delete challenge:', response.data.msg || 'Unknown error');
          }
        } catch (error) {
          console.error('Error deleting challenge:', error);
        }
      } else {
        console.log('Challenge deletion canceled');
      }
    },
    openCreateModal() {
      this.isCreateModalVisible = true;
    },
    createNewChallenge() {
      this.isCreateModalVisible = true;
    },
    changePage(pageNumber) {
      if (pageNumber > 0 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.fetchChallenges();
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  },
  created() {
    this.fetchChallenges();
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f7fafc;
  color: #2d3748;
  line-height: 1.6;
}

.container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  color: #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.nav-menu {
  list-style-type: none;
  padding: 0;
}

.nav-item {
  margin-bottom: 0.5rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
}




.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  text-align: center;

}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.875rem;
  color: #4a5568;
}

.card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  font-size: 0.70rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  height: 30px;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #e2e8f0; /* gray-300 */
  border-radius: 0.375rem;
  flex-grow: 1;
  margin-right: 0.5rem;
}

.search-btn {
  background-color: #667eea; /* primary-color */
  color: #ffffff; /* white */
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease; /* transition */
  line-height: 1.5; /* 텍스트 라인 높이 설정 */
  display: inline-flex; /* 버튼을 인라인 플렉스로 설정 */
  align-items: center; /* 아이템들을 수직으로 가운데 정렬 */
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
}

.search-btn:hover {
  background-color: #764ba2; /* secondary-color */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f9f9f9;
}

.btn {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 0.5rem;
  font-size: 0.70rem;
}

.btn:hover {
  background-color: #2b6cb0;
}

.btn-delete {
  background-color: #e53e3e;
}

.btn-delete:hover {
  background-color: #c53030;
}

.create-btn {
  background-color: #48bb78;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1rem;
}

.create-btn i {
  margin-right: 0.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pagination button {
  background-color: #edf2f7;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0 0.5rem;
}

.pagination button:disabled {
  background-color: #e2e8f0;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 500px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

form div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

button {
  background-color: #4a5568;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #2d3748;
}
</style>
