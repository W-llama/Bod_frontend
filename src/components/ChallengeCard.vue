<template>
  <section class="challenges">
    <div class="container">
      <ChallengeCard
          v-for="challenge in challenges"
          :key="challenge.id"
          :imageSource="challenge.imageSource"
          :altText="challenge.altText"
          :title="challenge.title"
          :description="challenge.description"
      />
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import ChallengeCard from './ChallengeCard.vue';

export default {
  components: {
    ChallengeCard
  },
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
      const apiUrl = 'http://localhost:8080/api/challenges?page=1'; // Adjust URL as per your backend setup
      axios.get(apiUrl)
      .then(response => {
        this.challenges = response.data.data; // Assuming response structure has a 'data' field
      })
      .catch(error => {
        console.error('Error fetching challenges:', error);
      });
    }
  }
};
</script>

<style scoped>
.challenges {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
}
</style>
