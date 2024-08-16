<template>
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

    <div class="search-bar">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="챌린지 제목 검색..."
      />
      <button @click="performSearch">검색</button>
    </div>

    <div v-if="noChallenges" class="no-challenges">
      해당 카테고리에는 현재 등록된 챌린지가 없습니다.
    </div>

    <div v-else class="challenges">
      <div
          v-for="challenge in challenges"
          :key="challenge.id"
          class="challenge-card"
          @click="viewChallengeDetails(challenge.id)"
      >
        <img :src="challenge.imageUrl" :alt="challenge.title" class="challenge-image">
        <div class="challenge-content">
          <h2 class="challenge-title">{{ challenge.title }}</h2>
          <h3 class="challenge-users">
            참가인원 : {{ challenge.joinedUsers }}명 &nbsp; &nbsp; 인원제한 : {{ challenge.limitedUsers }}명
          </h3>
          <p class="challenge-description">{{ challenge.content }}</p>
        </div>
      </div>
    </div>

    <div v-if="!noChallenges" class="pagination">
      <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          @click="fetchChallenges(pageNumber)"
          :class="{ active: currentPage === pageNumber }"
      >
        {{ pageNumber }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'ChallengeList',
  data() {
    return {
      backendCategories: ['전체', '건강', '공부', '취미', '경제', '기타'],
      selectedCategory: '전체',
      searchQuery: '',
      challenges: [],
      currentPage: 1,
      itemsPerPage: 9,
      totalPages: 0,
      noChallenges: false
    };
  },
  mounted() {
    this.fetchChallenges(this.currentPage);
  },
  methods: {
    performSearch() {
      this.currentPage = 1;
      this.fetchChallenges(this.currentPage, true);
    },
    fetchChallenges(pageNumber) {
      this.currentPage = pageNumber;
      this.noChallenges = false;

      const zeroBasedPageNumber = pageNumber - 1;

      let apiUrl = '';
      if (this.searchQuery) {
        apiUrl = `/challenges/search?title=${encodeURIComponent(this.searchQuery)}&page=${zeroBasedPageNumber}&size=${this.itemsPerPage}`;
      } else if (this.selectedCategory === '전체') {
        apiUrl = `/challenges?page=${zeroBasedPageNumber}&size=${this.itemsPerPage}`;
      } else {
        const categoryEnum = this.mapCategoryToBackendEnum(this.selectedCategory);
        apiUrl = `/challenges/category?page=${zeroBasedPageNumber}&size=${this.itemsPerPage}&category=${categoryEnum}`;
      }

      axios.get(apiUrl)
      .then(response => {
        console.log('API Response:', response.data);
        if (response.data.data.content.length === 0) {
          this.noChallenges = true;
        } else {
          this.challenges = response.data.data.content;
          this.totalPages = response.data.data.totalPages;
        }
        console.log('Challenges:', this.challenges);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.noChallenges = true;
        } else {
          console.error('챌린지 조회 실패', error);
        }
      });
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1;
      this.fetchChallenges(this.currentPage);
    },
    mapCategoryToBackendEnum(category) {
      switch (category) {
        case '건강': return 'HEALTH';
        case '공부': return 'STUDY';
        case '취미': return 'HOBBY';
        case '경제': return 'ECONOMY';
        case '기타': return 'ETC';
        default: return '';
      }
    },
    viewChallengeDetails(challengeId) {
      this.$router.push(`/challenges/${challengeId}`);
    }
  }
};
</script>

<style scoped>
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

.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.search-bar input {
  width: calc(100% - 100px);
  padding: 10px;
  font-size: 16px;
}

.search-bar button {
  width: 100px;
  padding: 10px;
  font-size: 16px;
  margin-left: 10px;
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

.no-challenges {
  text-align: center;
  padding: 20px;
  color: #FFFFFFFF;
  font-size: 1.2em;
}

.challenges {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 80px;
  padding: 0 30px;
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
  height: 330px;
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
  padding: 5px;
}

.challenge-title {
  font-size: 22px;
  margin-bottom: 10px;
  text-align: center;
}

.challenge-users {
  font-size: 16px;
  margin-bottom: 5px;
  text-align: center;
}

.challenge-description {
  font-size: 16px;
  text-align: center;
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
