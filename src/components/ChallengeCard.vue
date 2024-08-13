<template>
  <div>
    <section id="challenges" class="popular-challenges">
      <div class="container">
        <h2>인기 있는 챌린지 TOP 10</h2>
        <div class="challenges">
          <div v-for="challenge in challenges" :key="challenge.id" class="challenge-card" @click="viewChallengeDetails(challenge.id)">
            <img :src="challenge.image" :alt="challenge.title" class="challenge-image">
            <div class="challenge-content">
              <h2>{{ challenge.title }}</h2>
              <h3 style="text-align: center;">
                참가인원 : {{ challenge.joinedUsers }}명 &nbsp; &nbsp; 인원제한 : {{ challenge.limitedUsers }}명
              </h3>
              <p>{{ challenge.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'ChallengeCard',
  data() {
    return {
      challenges: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchChallenges();
  },
  methods: {
    fetchChallenges() {
      axios.get('/challenges/top10')
      .then(response => {
        this.challenges = response.data.data.map(challenge => ({
          id: challenge.id,
          title: challenge.title,
          content: challenge.content,
          image: challenge.imageUrl,
          joinedUsers: challenge.joinedUsers,
          limitedUsers: challenge.limitedUsers
        }));
        this.loading = false;
      })
      .catch(error => {
        this.error = 'Error fetching challenges';
        console.error('Error fetching challenges:', error);
        this.loading = false;
      });
    },
    viewChallengeDetails(challengeId) {
      this.$router.push(`/challenges/${challengeId}`);
    }
  }
};
</script>

<style scoped>
.popular-challenges {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  margin: 50px;
}

.popular-challenges h2 {
  font-size: 32px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.challenges {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
}

.challenge-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  width: calc(33.33% - 20px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

@media (max-width: 1024px) {
  .challenge-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .challenge-card {
    width: calc(100% - 20px);
  }
}

.challenge-card:hover {
  transform: translateY(-5px);
}

.challenge-image {
  width: 100%;
  height: 200px;
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
