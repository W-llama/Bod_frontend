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
    this.fetchChallenges();
  },
  methods: {
    fetchChallenges() {
      axios.get('http://localhost:8080/api/challenges/top10')
      .then(response => {
        this.challenges = response.data.data;
      })
      .catch(error => {
        console.error('Error fetching challenges:', error);
      });
    },
    viewChallengeDetails(challengeId) {
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