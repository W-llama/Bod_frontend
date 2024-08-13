<template>
  <div id="app" class="container">
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
        <h1 class="page-title">회원 관리</h1>
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
          <h2 class="card-title">전체 회원 목록</h2>
        </div>
        <div class="search-bar">
          <input type="text" class="search-input" v-model="searchQuery" placeholder="이름 또는 이메일로 검색">
          <button class="search-btn" @click="searchMembers">검색</button>
        </div>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>가입일</th>
            <th>상태</th>
            <th>역할</th>
            <th>포인트</th>
            <th>관리</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="member in filteredMembers" :key="member.userId">
            <td>{{ member.userId }}</td>
            <td>{{ member.name }}</td>
            <td>{{ member.email }}</td>
            <td>{{ formatDate(member.createdAt) }}</td>
            <td>{{ member.userStatus }}</td>
            <td>{{ member.userRole }}</td>
            <td>{{ member.point }}</td>
            <td>
              <button @click="openEditModal(member)" class="btn">포인트 관리</button>
              <button @click="openManageRoleModal(member)" class="btn btn-secondary">상태 관리</button>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">이전</button>
          <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">다음</button>
        </div>
      </div>
    </main>

    <!-- 회원 정보 수정 모달 -->
    <div class="modal" v-if="showEditModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">회원 정보 수정</h3>
          <span class="close" @click="closeEditModal">&times;</span>
        </div>
        <div class="form-group">
          <label for="point">포인트</label>
          <input type="number" id="point" v-model="editingMember.point">
        </div>
        <button @click="saveEditedMember" class="btn">저장</button>
      </div>
    </div>

    <!-- 상태 관리 모달 -->
    <div class="modal" v-if="showManageRoleModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">상태 관리</h3>
          <span class="close" @click="closeManageRoleModal">&times;</span>
        </div>
        <div class="form-group">
          <label for="role">상태</label>
          <select id="role" v-model="editingMember.userStatus">
            <option value="ACTIVE">ACTIVE</option>
            <option value="WITHDRAW">WITHDRAW</option>
          </select>
        </div>
        <button @click="saveRoleChange" class="btn">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      pageSize: 10, // Default page size adjusted to 10 as per backend
      totalPages: 1,
      members: [],
      stats: {
        usersCount: 0,
        activeUsersCount: 0,
        withdrawUsersCount: 0,
        adminUsersCount: 0,
        userUsersCount: 0
      },
      labels: {
        usersCount: '총 유저',
        activeUsersCount: '활성화된 유저',
        withdrawUsersCount: '차단된 유저',
        adminUsersCount: '관리자',
        userUsersCount: '일반 유저'
      },
      showEditModal: false,
      showManageRoleModal: false,
      editingMember: {},
      activeTab: 'members'
    };
  },
  computed: {
    filteredMembers() {
      if (this.searchQuery) {
        return this.members.filter(member =>
            member.name.includes(this.searchQuery) ||
            member.email.includes(this.searchQuery)
        );
      }
      return this.members;
    }
  },
  methods: {
    async getUserCounts() {
      try {
        const response = await axios.get('/admins/users/counts');
        const { data } = response;
        if (data && data.data) {
          this.stats = data.data;
        }
      } catch (error) {
        console.error('Error fetching user counts:', error);
      }
    },
    searchMembers() {
      console.log('검색어:', this.searchQuery);
      // 여기에 검색 로직 구현
      this.fetchMembers();
    },
    openEditModal(member) {
      this.editingMember = { ...member };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editingMember = {};
    },
    saveEditedMember() {
      axios.put(`/admins/users/${this.editingMember.userId}`, {
        point: this.editingMember.point
      })
      .then(response => {
        console.log('수정된 회원 정보:', response.data);
        this.fetchMembers();
        this.getUserCounts();
        this.closeEditModal();
      })
      .catch(error => {
        console.error('회원 정보 수정에 실패했습니다:', error);
      });
    },
    openManageRoleModal(member) {
      this.editingMember = { ...member };
      this.showManageRoleModal = true;
    },
    closeManageRoleModal() {
      this.showManageRoleModal = false;
      this.editingMember = {};
    },
    saveRoleChange() {
      axios.put(`/admins/users/${this.editingMember.userId}/status`, {
        userStatus: this.editingMember.userStatus
      })
      .then(response => {
        console.log('회원 상태 수정 성공:', response.data);
        this.closeManageRoleModal();
        this.fetchMembers();
        this.getUserCounts();
      })
      .catch(error => {
        console.error('회원 상태 수정 실패:', error);
      });
    },
    fetchMembers() {
      axios.get('/admins/users', {
        params: {
          page: this.currentPage,
          size: this.pageSize,
        }
      })
      .then(response => {
        const data = response.data.data;
        this.members = data.content;
        this.totalPages = data.totalPages;

        // 유저id 기준으로 오름차순 정렬
        this.members.sort((a, b) => a.userId - b.userId);
      })
      .catch(error => {
        console.error('회원 목록을 가져오는 데 실패했습니다:', error);
      });
    },
    changePage(pageNumber) {
      if (pageNumber > 0 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.fetchMembers();
      }
    },
    setActive(tab) {
      this.activeTab = tab;
    },
    isActive(tab) {
      return this.activeTab === tab;
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  },
  async mounted() {
    await this.getUserCounts(); // Fetch user counts on mount
    this.fetchMembers(); // Fetch members on mount
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
  grid-template-columns: repeat(3, minmax(100px, 1fr));
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
  border-bottom: 1px solid #edf2f7; /* gray-200 */
}

th {
  background-color: #f7fafc; /* gray-100 */
}

.pagination {
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 0;
}

.page-item {
  margin: 0 0.25rem;
}

.page-link {
  color: #667eea; /* primary-color */
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0; /* gray-300 */
  border-radius: 0.375rem;
  transition: all 0.3s ease; /* transition */
}

.page-link:hover, .page-link.active {
  background-color: #667eea; /* primary-color */
  color: #ffffff; /* white */
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #ffffff; /* white */
  padding: 2rem;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow */
  width: 400px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.close {
  font-size: 1.5rem;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0; /* gray-300 */
  border-radius: 0.375rem;
}

.btn {
  background-color: #3182ce; /* primary-color */
  color: #ffffff; /* white */
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease; /* transition */
  margin-right: 0.5rem;
  font-size: 0.65rem;
}

.btn:hover {
  background-color: #2b6cb0; /* secondary-color */
}

.btn-secondary {
  background-color: #e53e3e; /* gray-400 */
}

.btn-secondary:hover {
  background-color: #c53030; /* gray-500 */
}
</style>
