<template>
    <Header />
  <div class="container">
    <h1>챌린지 카테고리</h1>

    <div class="category-list">
      <button
          v-for="category in backendCategories"
          :key="category"
          @click="selectCategory(category)"
          :class="['category-btn', { active: selectedCategory === category }]"
      >
        {{ category }}
      </button>
    </div>

    <div class="challenges">
      <div v-for="challenge in challenges" :key="challenge.id" class="challenge-card" @click="viewChallengeDetails(challenge.id)">
        <img :src="challenge.image" :alt="challenge.title" class="challenge-image">
        <div class="challenge-content">
          <h2 class="challenge-title">{{ challenge.title }}</h2>
          <p class="challenge-description">{{ challenge.content }}</p>
          <div class="challenge-meta">
<!--            <span>{{ challenge.duration }}</span>-->
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button v-for="pageNumber in totalPages" :key="pageNumber"
              @click="fetchChallenges(pageNumber)"
              :class="{ active: currentPage === pageNumber }">
        {{ pageNumber }}
      </button>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'ChallengeList',
  components: {Footer, Header},
  data() {
    return {
      backendCategories: ['전체', '건강', '공부', '취미', '경제', '기타'], // Adjusted to match backend enum values
      selectedCategory: '전체',
      challenges: [],
      currentPage: 1,
      totalPages: 0
    };
  },
  mounted() {
    this.fetchChallenges(this.currentPage); // Fetch challenges for initial page
  },
  methods: {
    fetchChallenges(page) {
      let apiUrl = '';
      if (this.selectedCategory === '전체') {
        apiUrl = `http://localhost:8080/api/challenges?page=${page}`;
      } else {
        const categoryEnum = this.mapCategoryToBackendEnum(this.selectedCategory);
        apiUrl = `http://localhost:8080/api/challenges/category?page=${page}&category=${categoryEnum}`;
      }
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.challenges = data.data;
        this.totalPages = data.totalPages; // Assuming your backend sends total pages info
        this.currentPage = page;
      })
      .catch(error => {
        console.error('Error fetching challenges:', error);
      });
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.fetchChallenges(1); // Reset to page 1 when category changes
    },
    mapCategoryToBackendEnum(category) {
      switch (category) {
        case '건강':
          return 'HEALTH';
        case '공부':
          return 'STUDY';
        case '취미':
          return 'HOBBY';
        case '경제':
          return 'ECONOMY';
        case '기타':
          return 'ETC';
        default:
          return ''; // Handle other cases if necessary
      }
    },
    viewChallengeDetails(challengeId) {
      this.$router.push(`/challenges/${challengeId}`);
    }
  }
};
</script>

<style scoped>

body, html {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: white;
  text-align: center;
  margin-bottom: 30px;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
}

.category-btn {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover, .category-btn.active {
  background-color: white;
  color: #667eea;
}

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
  margin-bottom: 20px;
  width: calc(32% - 20px);
  max-width: calc(32% - 20px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 260px;
}

@media (max-width: 1024px) {
  .challenge-card {
    width: calc(33.33% - 20px);
    max-width: calc(33.33% - 20px);
  }
}

@media (max-width: 768px) {
  .challenge-card {
    width: calc(50% - 20px);
    max-width: calc(50% - 20px);
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button:hover, .pagination button.active {
  background-color: white;
  color: #667eea;
}

</style>
