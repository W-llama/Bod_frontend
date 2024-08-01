<template>
  <div class="app-container">
    <ChallengeSideBar class="sidebar" />
    <main class="main-content">
      <header>
        <h1>인증신청 목록</h1>
      </header>
      <div class="verification-list">
        <div v-for="verification in verifications" :key="verification.id" class="verification-item">
          <h2 class="verification-title">{{ verification.challengeTitle }}</h2>
          <p class="verification-date">신청일: {{ verification.date }}</p>
          <img :src="verification.image" :alt="verification.challengeTitle" class="verification-image">
          <div class="btn-group">
            <button @click="cancelVerification(verification.id)" class="btn">인증취소</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChallengeSideBar from "@/components/ChallengeSideBar.vue";

export default {
  name: 'VerificationList',
  components: { ChallengeSideBar },
  computed: {
    ...mapGetters(['accessToken']),
  },
  data() {
    return {
      verifications: []
    };
  },
  methods: {
    getToken() {
      const tokenWithPrefix = localStorage.getItem('accessToken')?.trim();
      if (tokenWithPrefix && tokenWithPrefix.startsWith('Bearer ')) {
        return tokenWithPrefix.replace('Bearer ', '').trim();
      }
      return tokenWithPrefix || ''; // Ensure an empty string is returned if no token
    },
    async fetchVerifications() {
      try {
        const token = this.getToken();
        console.log('Token:', token);
        if (!this.isValidJWT(token)) {
          throw new Error('Invalid token format');
        }
        const response = await axios.get('http://localhost:8080/api/verifications/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.verifications = response.data.data;
      } catch (error) {
        console.error('Failed to fetch verifications:', error);
      }
    },
    isValidJWT(token) {
      const segments = token.split('.');
      console.log('Token Segments:', segments);
      return segments.length === 3; // Validate JWT structure
    }
  },
  created() {
    this.fetchVerifications();
  }
};
</script>

<style scoped>

body, html {
  font-family: 'Noto Sans KR', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px; /* Sidebar width */
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  color: white;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  flex-grow: 1;
  margin-left: 280px;
  padding: 5rem;
  max-width: 2000px;/* Center the content horizontally */
}

.verification-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 items per row */
  gap: 1rem;
  margin: 0 auto; /* Center the grid items */
  width: 100%; /* Full width of its container */
  max-width: 1000px; /* Adjust to reduce the width */
}

.verification-item {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  color: white;
}

.verification-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.verification-date {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.verification-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
}

header {
  background: transparent;
  text-align: center;
  color: white;
  padding: 1rem 0;
  margin-bottom: 2rem;
}


.btn-group {
  display: flex;
  gap: 0.5rem;
}

.btn {
  flex: 1;
  display: inline-block;
  background-color: #ffd166; /* Light yellow color */
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.btn:hover {
  background-color: #ffdc80; /* Slightly darker yellow on hover */
}


</style>