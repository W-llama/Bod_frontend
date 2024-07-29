<template>
  <div>
    <section id="challenges" class="challenges">
      <div v-for="challenge in challenges" :key="challenge.id" class="challenge-card" @click="viewChallengeDetails(challenge.id)">
        <img :src="challenge.image" :alt="challenge.title" class="challenge-image">
        <div class="challenge-content">
          <h2>{{ challenge.title }}</h2>
          <p>{{ challenge.content }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChallengeCard',
  data() {
    return {
      challenges: []
    };
  },
  mounted() {
    this.fetchChallenges(); // 컴포넌트가 마운트되면 챌린지 목록을 가져옵니다
  },
  methods: {
    fetchChallenges() {
      axios.get('http://localhost:8080/api/challenges?page=1')
      .then(response => {
        this.challenges = response.data.data; // API에서 가져온 챌린지 데이터를 할당합니다
      })
      .catch(error => {
        console.error('Error fetching challenges:', error);
      });
    },
    viewChallengeDetails(challengeId) {
      // 챌린지 세부 정보 페이지로 라우팅합니다
      this.$router.push(`/challenges/${challengeId}`);
    }
  }
}
</script>


<style scoped>

.challenges {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 80px;
  padding: 120px 30px;
  max-width: 1600px;
  margin: 0 auto;
}

.challenge-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 30px;
  width: calc(25% - 30px);
  max-width: calc(25% - 30px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 240px;
}

@media (max-width: 1024px) {
  .challenge-card {
    width: calc(33.33% - 30px);
    max-width: calc(33.33% - 30px);
  }
}

@media (max-width: 768px) {
  .challenge-card {
    width: calc(50% - 30px);
    max-width: calc(50% - 30px);
  }
}

@media (max-width: 480px) {
  .challenge-card {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
}

.challenge-card:hover {
  transform: translateY(-5px);
}

.challenge-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.challenge-content {
  padding: 20px;
}

.challenge-card h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.challenge-card p {
  font-size: 16px;
  color: #666;
}

</style>