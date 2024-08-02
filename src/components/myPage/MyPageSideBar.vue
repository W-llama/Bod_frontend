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
      <div class="sidebar-points-value">{{ userProfile && userProfile.point }}</div>
      <div class="sidebar-points-label">획득한 포인트</div>
    </div>
    <ul class="sidebar-menu">
      <li><router-link to="/myPage">챌린지 조회</router-link></li>
      <li><router-link to="/myPage/verificationList">인증신청 목록 조회</router-link></li>
      <li><router-link to="/myPage/password">비밀번호 변경</router-link></li>
      <li><router-link to="/myPage/withDraw">회원 탈퇴</router-link></li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MyPageSideBar',
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
  width: 250px; /* 사이드바의 너비를 줄입니다 */
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem; /* 패딩을 줄입니다 */
  color: white;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-logo {
  font-size: 1.2rem; /* 폰트 크기를 줄입니다 */
  font-weight: 700;
  margin-bottom: 1.5rem; /* 마진을 줄입니다 */
  text-align: center;
}

.sidebar-profile {
  text-align: center;
  margin-bottom: 1.5rem;
}

.sidebar-profile-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem; /* 마진을 줄입니다 */
}

.sidebar-profile-name {
  font-size: 1.5rem; /* 폰트 크기를 줄입니다 */
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.sidebar-profile-introduce {
  font-size: 1rem; /* 폰트 크기를 줄입니다 */
  opacity: 0.8;
  margin-bottom: 1rem; /* 마진을 줄입니다 */
}

.sidebar-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.5rem; /* 마진을 줄입니다 */
}

.sidebar-stat-item {
  text-align: center;
}

.sidebar-stat-value {
  font-size: 1rem; /* 폰트 크기를 줄입니다 */
  font-weight: 600;
}

.sidebar-stat-label {
  font-size: 0.7rem; /* 폰트 크기를 줄입니다 */
  opacity: 0.8;
}

.sidebar-points {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 0.5rem; /* 패딩을 줄입니다 */
  margin-bottom: 0.5rem; /* 마진을 줄입니다 */
  text-align: center;
}

.sidebar-points-value {
  font-size: 1.2rem; /* 폰트 크기를 줄입니다 */
  font-weight: 700;
  color: #ffd166;
}

.sidebar-points-label {
  font-size: 1rem;
  opacity: 0.9;
}

.sidebar-menu {
  list-style-type: none;
  padding: 0;
}

.sidebar-menu li {
  margin-bottom: 0.5rem; /* 마진을 줄입니다 */
}

.sidebar-menu a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.3rem 0.5rem; /* 패딩을 줄입니다 */
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
  padding: 0.3rem 0.5rem; /* 패딩을 줄입니다 */
  border: none;
  border-radius: 5px;
  font-size: 0.9rem; /* 폰트 크기를 줄입니다 */
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  text-align: center;
  margin-top: 0.5rem; /* 마진을 줄입니다 */
}

.btn:hover {
  background-color: #5a67d8;
}
</style>
