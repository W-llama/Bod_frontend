<template>
  <section class="point-ranking">
    <h2>포인트 랭킹</h2>
    <table class="ranking-table">
      <thead>
      <tr>
        <th>순위</th>
        <th>이름</th>
        <th>포인트</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in pointRanking" :key="index">
        <td>{{ user.rank }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.point }}</td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from '../axios';

export default {
  name: 'HeroSection',
  data() {
    return {
      pointRanking: []
    }
  },
  created() {
    this.fetchRankingList();
  },
  methods: {
    async fetchRankingList() {
      try {
        const response = await axios.get('/users/ranking/points');
        if (response.status === 200) {
          this.pointRanking = response.data.data;
        } else {
          console.error('포인트 랭킹 리스트 데이터 요청 실패:', response.data.msg);
        }
      } catch (error) {
        console.error('포인트 랭킹 리스트 조회 에러 발생:', error);
      }
    }
  }
}
</script>

<style scoped>
.point-ranking {
  width: 30%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.point-ranking h2 {
  font-size: 32px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
}

.ranking-table th, .ranking-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.ranking-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.ranking-table tr:hover {
  background-color: #f5f5f5;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 30px;
}

</style>
