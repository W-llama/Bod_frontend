<template>
    <Header />
  <div class="challenge-list">
    <h1>챌린지 카테고리</h1>

    <!-- Category buttons -->
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

    <!-- Challenge cards -->
    <div class="challenge-grid">
      <div v-for="challenge in challenges" :key="challenge.id" class="challenge-card">
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

    <!-- Pagination buttons -->
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
        apiUrl = `/api/challenges?page=${page}`;
      } else {
        const categoryEnum = this.mapCategoryToBackendEnum(this.selectedCategory);
        apiUrl = `/api/challenges/category?page=${page}&category=${categoryEnum}`;
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
    }
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
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-weight: 600;
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

.challenge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.challenge-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
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

.challenge-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.challenge-description {
  font-size: 0.9em;
  color: #666;
}

.challenge-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 0.8em;
  color: #888;
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
