<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="profile-info">
        <img :src="profileImageUrl" alt="프로필 사진" class="profile-picture">
        <h1>{{ userProfile && userProfile.nickname }}</h1>
        <p>{{ userProfile && userProfile.introduce }}</p>
        <button @click="showProfileEditModal = true" class="btn">프로필 수정</button>
      </div>
      <ul class="sidebar-menu">
        <li><a href="#" class="active">대시보드</a></li>
        <li><a href="#">진행 중인 챌린지</a></li>
        <li><a href="#">완료한 챌린지</a></li>
        <li><a href="#">포인트 내역</a></li>
        <li><router-link to="/changePassword">설정</router-link></li>
      </ul>
    </aside>
    <div class="content-area">
      <div class="content-header">
        <h2>나의 챌린지 현황</h2>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>15</h3>
          <p>참여한 챌린지</p>
        </div>
        <div class="stat-card">
          <h3>8</h3>
          <p>완료한 챌린지</p>
        </div>
        <div class="stat-card">
          <h3>720</h3>
          <p>획득한 포인트</p>
        </div>
      </div>
      <h3>진행 중인 챌린지</h3>
      <div class="challenge-list">
        <div class="challenge-card">
          <img src="https://source.unsplash.com/random/400x200?fitness" alt="30일 운동 챌린지" class="challenge-image">
          <div class="challenge-content">
            <h3>30일 운동 챌린지</h3>
            <p>20일째 진행 중</p>
            <div class="progress-bar">
              <div class="progress" style="width: 66%;"></div>
            </div>
          </div>
        </div>
        <div class="challenge-card">
          <img src="https://source.unsplash.com/random/400x200?reading" alt="독서 마라톤" class="challenge-image">
          <div class="challenge-content">
            <h3>독서 마라톤</h3>
            <p>15일째 진행 중</p>
            <div class="progress-bar">
              <div class="progress" style="width: 50%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProfileEditModal
        v-if="showProfileEditModal"
        :userProfile="userProfile"
        @close="showProfileEditModal = false"
        @profile-updated="updateUserProfile"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileEditModal from '@/components/ProfileEditModal.vue';
import changePassword from "@/views/ChangePassword.vue";

export default {
  name: 'MyPage',
  components: {
    ProfileEditModal,
    changePassword
  },
  data() {
    return {
      showProfileEditModal: false
    };
  },
  computed: {
    ...mapGetters(['userProfile']),
    profileImageUrl() {
      const baseURL = 'https://bodchallenge.s3.ap-northeast-2.amazonaws.com/';
      return this.userProfile && this.userProfile.image
          ? `${baseURL}${this.userProfile.image}`
          : 'https://source.unsplash.com/random/200x200?portrait';
    }
  },
  methods: {
    ...mapActions(['fetchUserProfile', 'updateProfile']),
    updateUserProfile() {
      this.fetchUserProfile();
    }
  },
  created() {
    if (!this.userProfile) {
      this.updateUserProfile();
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body, html {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  transition: color 0.3s ease, transform 0.3s ease;
  padding: 8px 12px;
  border-radius: 15px;
}

.nav-links a:hover {
  color: #667eea;
  transform: translateY(-2px);
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  background-color: #667eea;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #5a6fd6;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.btn.secondary {
  background-color: transparent;
  border: 2px solid #667eea;
  color: #667eea;
}

.btn.secondary:hover {
  background-color: #667eea;
  color: white;
}

main {
  padding: 50px 0;
}

.dashboard {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
}

.sidebar {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.profile-info {
  text-align: center;
  margin-bottom: 30px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #667eea;
  margin-bottom: 15px;
}

.profile-info h1 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.profile-info p {
  margin: 5px 0;
  color: #666;
}

.sidebar-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 10px;
}

.sidebar-menu a {
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.sidebar-menu a:hover, .sidebar-menu a.active {
  background-color: #667eea;
  color: white;
}

.content-area {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.content-header h2 {
  margin: 0;
  font-size: 28px;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  font-size: 36px;
  margin: 0 0 10px 0;
  color: #667eea;
}

.stat-card p {
  margin: 0;
  color: #666;
}

.challenge-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.challenge-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.challenge-card:hover {
  transform: translateY(-5px);
}

.challenge-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.challenge-content {
  padding: 20px;
}

.challenge-content h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
}

.challenge-content p {
  margin: 0 0 15px 0;
  color: #666;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #667eea;
  border-radius: 5px;
  transition: width 0.3s ease;
}

footer {
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  padding: 20px 0;
  margin-top: 50px;
}

footer p {
  color: #666;
}
</style>
