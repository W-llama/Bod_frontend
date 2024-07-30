<template>
  <div id="app">
    <Header />
    <main>
      <div class="challenge-content">
        <h1>{{ challenge.title }}</h1>
        <p>챌린지 생성일 : {{ challenge.createAt }}</p>
        <p>기간: {{ formatDate(challenge.startTime) }} - {{ formatDate(challenge.endTime) }}</p>
        <p>상태: {{ challenge.conditionStatus }}</p>
        <p>카테고리: {{ challenge.category }}</p>
        <img :src="challenge.image" :alt="challenge.title" class="challenge-image">
        <div class="challenge-description">
          <h2>챌린지 소개</h2>
          <p>{{ challenge.content }}</p>
        </div>
        <ChallengeVerifications :verifications="verifications" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import ChallengeVerifications from './ChallengeVerification.vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'ChallengeContent',
  components: {
    Footer,
    Header,
    ChallengeVerifications
  },
  data() {
    return {
      challenge: {
        title: '',
        startTime: '',
        endTime: '',
        category: '',
        conditionStatus: '',
        completionRate: 0,
        image: '',
        content: '',
        createAt: ''
      },
      verifications: []
    };
  },
  methods: {
    formatDate(dateStr) {
      return dateStr.slice(0, 10);
    },
    fetchChallengeDetails(challengeId) {
      axios.get(`http://localhost:8080/api/challenges/${challengeId}`)
      .then(response => {
        this.challenge = response.data.data;
        this.fetchVerifications(challengeId);
      })
      .catch(error => {
        console.error('Error fetching challenge details:', error);
      });
    },
    fetchVerifications(challengeId) {
      axios.get(`http://localhost:8080/api/challenges/${challengeId}/verifications?page=1`)
      .then(response => {
        this.verifications = response.data.data;
      })
      .catch(error => {
        console.error('Error fetching verifications:', error);
      });
    }
  },
  created() {
    const challengeId = this.$route.params.challengeId;
    this.fetchChallengeDetails(challengeId);
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

header {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

main {
  padding: 40px 200px;
}

.challenge-content {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 50px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.challenge-content h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 8px;
}

.challenge-content p {
  font-size: 18px;
  margin-bottom: 8px;
}

.challenge-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.challenge-description {
  margin-bottom: 18px;
}

h2 {
  font-size: 22px;
  color: #333;
  margin-top: 0;
}
</style>
