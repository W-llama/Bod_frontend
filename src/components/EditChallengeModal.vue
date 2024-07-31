<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">&times;</button>
      <h2>챌린지 수정하기</h2>
      <form @submit.prevent="updateChallenge">
        <div>
          <label for="title">제목</label>
          <input type="text" v-model="localChallenge.title" id="title" required />
        </div>
        <div>
          <label for="title">내용</label>
          <input type="text" v-model="localChallenge.content" id="content" required />
        </div>
        <div>
          <label for="title">이미지</label>
          <input type="text" v-model="localChallenge.image" id="image" required />
        </div>
        <div>
          <label for="category">카테고리</label>
          <input type="text" v-model="localChallenge.category" id="category" required />
        </div>
        <div>
          <label for="conditionStatus">상태</label>
          <input type="text" v-model="localChallenge.conditionStatus" id="conditionStatus" required />
        </div>
        <div>
          <label for="startTime">시작일</label>
          <input type="date" v-model="localChallenge.startTime" id="startTime" required />
        </div>
        <div>
          <label for="endTime">종료일</label>
          <input type="date" v-model="localChallenge.endTime" id="endTime" required />
        </div>
        <button type="submit">수정완료</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    challenge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localChallenge: { ...this.challenge }
    };
  },
  watch: {
    challenge(newChallenge) {
      this.localChallenge = { ...newChallenge };
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async updateChallenge() {
      try {
        const response = await axios.patch(`/admins/challenges/${this.localChallenge.challengeId}`, this.localChallenge);
        if (response.status === 200) {
          this.$emit('update-success');
          this.closeModal();
        } else {
          console.error('Failed to update challenge:', response.data.msg || 'Unknown error');
        }
      } catch (error) {
        console.error('Error updating challenge:', error);
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 500px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

form div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

button {
  background-color: #4a5568;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #2d3748;
}
</style>
