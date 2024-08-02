<template>
  <aside class="sidebar">
    <div class="sidebar-logo">챌린저스</div>
    <div class="sidebar-profile">
      <img :src="profileImageUrl" alt="프로필 사진" class="sidebar-profile-image">
      <div class="sidebar-profile-name">{{ userProfile && userProfile.nickname }}</div>
      <div class="sidebar-profile-introduce">{{ userProfile && userProfile.introduce }}</div>
      <button @click="$emit('edit-profile')" class="btn">프로필 수정</button>
      <div class="sidebar-stats">
        <div class="sidebar-stat-item">
          <div class="sidebar-stat-value">{{ totalChallengesCount }}</div>
          <div class="sidebar-stat-label">총 챌린지</div>
        </div>
        <div class="sidebar-stat-item">
          <div class="sidebar-stat-value">{{ totalCompletedChallengesCount }}</div>
          <div class="sidebar-stat-label">완료</div>
        </div>
      </div>
    </div>
    <div class="sidebar-points">
      <div class="sidebar-points-value">{{ userProfile && userProfile.points }}</div>
      <div class="sidebar-points-label">획득한 포인트</div>
    </div>
    <ul class="sidebar-menu">
      <li><a href="/myPage/MyPage" :class="{ active: isActive('/myPage/MyPage') }">챌린지 조회</a></li>
      <li><a href="/myPage/myPagePassword" :class="{ active: isActive('/myPage/myPagePassword') }">비밀번호 변경</a></li>
      <li><a href="/settings" :class="{ active: isActive('/settings') }">설정</a></li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ChallengeSideBar',

  computed: {
    ...mapGetters(['userProfile', 'totalChallengesCount', 'totalCompletedChallengesCount']),
    profileImageUrl() {
      const baseURL = 'https://bodchallenge.s3.ap-northeast-2.amazonaws.com/';
      return this.userProfile && this.userProfile.image
          ? `${baseURL}${this.userProfile.image}`
          : 'https://source.unsplash.com/random/200x200?portrait';
    }
  },
  methods: {
    ...mapActions(['fetchUserProfile', 'fetchTotalChallengesCount', 'fetchTotalCompletedChallengesCount']),
    isActive(route) {
      return this.$route.path === route;
    },
  },
  created() {
    if (!this.userProfile) {
      this.fetchUserProfile();
      this.fetchTotalChallengesCount();
      this.fetchTotalCompletedChallengesCount();
    }
  }
};
</script>

<style scoped>
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

.sidebar-logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.sidebar-profile {
  text-align: center;
  margin-bottom: 2rem;
}

.sidebar-profile-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.sidebar-profile-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.sidebar-profile-introduce {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.sidebar-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.sidebar-stat-item {
  text-align: center;
}

.sidebar-stat-value {
  font-size: 1.2rem;
  font-weight: 600;
}

.sidebar-stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

.sidebar-points {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.sidebar-points-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd166;
}

.sidebar-points-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.sidebar-menu {
  list-style-type: none;
  padding: 0;
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
  margin-top: 1rem;
}

.btn:hover {
  background-color: #5a67d8;
}
</style>
