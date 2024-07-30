<template>
  <div class="container">
    <aside class="sidebar">
      <div class="logo">챌린저스 관리자</div>
      <nav>
        <ul class="nav-menu">
          <li class="nav-item">
            <a href="#" class="nav-link" :class="{ active: isActive('dashboard') }" @click="setActive('dashboard')">대시보드</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" :class="{ active: isActive('members') }" @click="setActive('members')">회원 관리</a>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="main-content">
      <header class="header">
        <h1 class="page-title">대시보드</h1>
        <div class="user-info">
          <img src="https://i.pravatar.cc/150?img=68" alt="User Avatar" class="user-avatar">
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
          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="챌린지 검색" class="search-input">
            <button @click="searchChallenges" class="search-btn">검색</button>
          </div>
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
              <button @click="getChallenge(challenge.challengeId)" class="btn btn-get">조회하기</button>
              <button @click="editChallenge(challenge.challengeId)" class="btn">수정하기</button>
              <button @click="deleteChallenge(challenge.challengeId)" class="btn btn-delete">삭제하기</button>
            </td>
          </tr>
          </tbody>
        </table>

        <button class="create-btn" @click="createNewChallenge">
          <i class="fas fa-plus"></i> 새 챌린지 만들기
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      activeTab: 'dashboard',
      searchQuery: '',
      stats: {
        totalChallenges: 60,
        beforeChallenges: 10,
        todoChallenges: 35,
        completeChallenges: 15
      },
      labels: {
        totalChallenges: '총 챌린지 수',
        beforeChallenges: '대기중인 챌린지 수',
        todoChallenges: '진행중인 챌린지 수',
        completeChallenges: '마감된 챌린지 수'
      },
      challenges: []
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
        const response = await axios.get('/admins/challenges');
        console.log('API Response:', response);
        if (response.status === 200 && response.data) {
          this.challenges = response.data.data || [];
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
      console.log('Searching for:', this.searchQuery);
    },
    getChallenge(id) {
      console.log('Getting challenge:', id);
    },
    editChallenge(id) {
      console.log('Editing challenge:', id);
    },
    deleteChallenge(id) {
      console.log('Deleting challenge:', id);
    },
    createNewChallenge() {
      console.log('Creating new challenge');
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString(); // Format date as needed
    }
  },
  created() {
    this.fetchChallenges();
  }
};
</script>

<style scoped>
/* Add your scoped CSS here or import a separate stylesheet */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #2d3748;
  --background-color: #f7fafc;
  --white: #ffffff;
  --gray-100: #f7fafc;
  --gray-200: #edf2f7;
  --gray-300: #e2e8f0;
  --gray-400: #cbd5e0;
  --gray-500: #a0aec0;
  --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
  color: var(--white);
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
  color: var(--white);
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: var(--transition);
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
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-color);
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: var(--white);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.card {
  background-color: var(--white);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 1.5rem;
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
  color: var(--text-color);
}

.search-bar {
  display: flex;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.375rem 0 0 0.375rem;
  font-size: 0.875rem;
}

.search-btn {
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0 0.375rem 0.375rem 0;
  cursor: pointer;
  transition: var(--transition);
}

.search-btn:hover {
  background-color: var(--secondary-color);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
}

th, td {
  padding: 1rem;
  text-align: left;
}

th {
  background-color: var(--gray-100);
  font-weight: 600;
  color: var(--text-color);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

tr {
  background-color: var(--white);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

tr:hover {
  transform: translateY(-2px);
}

.btn {
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.875rem;
}

.btn:hover {
  background-color: var(--secondary-color);
}

.btn-get {
  background-color: #10680c;
}

.btn-get:hover {
  background-color: #09920e;
}

.btn-delete {
  background-color: #e53e3e;
}

.btn-delete:hover {
  background-color: #c53030;
}

.create-btn {
  display: inline-flex;
  align-items: center;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
}

.create-btn i {
  margin-right: 0.5rem;
}

.create-btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
