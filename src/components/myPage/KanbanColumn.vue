<template>
  <div class="kanban-column">
    <h2>{{ title }}</h2>
    <div v-if="challenges.length === 0" class="no-data">{{ noDataMessage }}</div>
    <div v-else>
      <div v-for="challenge in challenges" :key="challenge.challengeId" class="kanban-card">
        <img :src="challenge.image" alt="카드 이미지" class="kanban-card-image" />
        <div class="kanban-card-title">{{ challenge.title }}</div>
        <div class="kanban-card-period">{{ formatDate(challenge.startTime) }} ~ {{ formatDate(challenge.endTime) }}</div>
        <div v-if="imageMode === 'ongoing'" class="kanban-card-progress">
          <progress :value="challenge.completionRate" max="100"></progress>
          <span>{{ challenge.completionRate }}%</span>
          <button class="btn" @click="$emit('verification', challenge.challengeId)">인증하기</button>
          <button class="cancel-btn" @click="cancelChallenge(challenge.challengeId)">챌린지 신청 취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: 'KanbanColumn',
  props: {
    title: String,
    challenges: Array,
    noDataMessage: String,
    imageMode: String,
  },
  methods: {
    formatDate(dateString) {
      const options = {year: 'numeric', month: 'short', day: 'numeric'};
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async cancelChallenge(challengeId) {
      const confirmed = window.confirm('챌린지를 정말로 취소하시겠습니까?');
      if (confirmed) {
        try {
          const response = await axios.delete(`/challenges/${challengeId}`);
          console.log('챌린지 삭제 성공:', response.data.message);
          this.$emit('challengeCancelled', challengeId);
          alert('챌린지 신청이 취소 되었습니다.');
          window.location.reload();
        } catch (error) {
          console.error('챌린지 삭제 실패:', error);
          alert('챌린지 삭제에 실패했습니다.');
        }
      } else {
        console.log('챌린지 취소가 중단되었습니다.');
      }
    }
  }
};
</script>

<style scoped>
.kanban-column {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  min-width: 300px;
  max-width: 300px;
  padding: 1rem;
}

.kanban-column h2 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.no-data {
  color: white;
  text-align: center;
  margin-top: 1rem;
}

.kanban-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: move;
}

.kanban-card-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.kanban-card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.kanban-card-period {
  color: #666;
  margin-bottom: 10px;
}

.kanban-card-progress {
  margin-top: 0.5rem;
}

progress {
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #ddd;
}

progress::-webkit-progress-bar {
  background-color: #ddd;
  border-radius: 5px;
}

progress::-webkit-progress-value {
  background-color: #667eea;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background-color: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  text-align: center;
  margin-left: 65%;
}

.btn:hover {
  background-color: #764ba2;
}

.cancel-btn {
  display: inline-block;
  background-color: #e53e3e; /* 취소 버튼에 어울리는 붉은색 */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  text-align: center;
  margin-top: 10px;
  margin-left: 54%;
  padding: 0.5rem 1rem; /* 버튼의 클릭 영역을 넓히기 위한 여백 추가 */
}

.cancel-btn:hover {
  background-color: #c53030; /* 호버 시 더 어두운 색상 */
}

.cancel-btn:active {
  background-color: #9b2c2c; /* 클릭 시 색상 변환 */
}
</style>
