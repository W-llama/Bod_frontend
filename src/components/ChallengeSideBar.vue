<template>
  <aside class="sidebar">
    <div class="sidebar-logo">챌린저스</div>
    <div class="sidebar-profile">
      <img :src="user.profileImage" :alt="user.name" class="sidebar-profile-image" />
      <div class="sidebar-profile-name">{{ user.name }}</div>
      <div class="sidebar-profile-email">{{ user.email }}</div>
      <div class="sidebar-stats">
        <div class="sidebar-stat-item">
          <div class="sidebar-stat-value">{{ user.totalChallenges }}</div>
          <div class="sidebar-stat-label">총 챌린지</div>
        </div>
        <div class="sidebar-stat-item">
          <div class="sidebar-stat-value">{{ user.completedChallenges }}</div>
          <div class="sidebar-stat-label">완료</div>
        </div>
      </div>
    </div>
    <div class="sidebar-points">
      <div class="sidebar-points-value">{{ user.points }} P</div>
      <div class="sidebar-points-label">획득한 포인트</div>
    </div>
    <ul class="sidebar-menu">
      <li><a href="/challenges" :class="{ active: isActive('/challenges') }">비밀번호 변경</a></li>
      <li><a href="/settings" :class="{ active: isActive('/settings') }">설정</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      user: {
        name: '홍길동',
        email: 'hong@example.com',
        profileImage: 'https://source.unsplash.com/random/100x100?portrait',
        totalChallenges: 15,
        completedChallenges: 10,
        currentStreak: 7,
        points: 3500,
      }
    }
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    }
  }
}
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.sidebar-profile-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.sidebar-profile-email {
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
</style>
