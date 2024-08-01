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
        <div class="form-group">
          <label for="category">카테고리</label>
          <select id="category" v-model="localChallenge.category">
            <option value="HEALTH">HEALTH</option>
            <option value="STUDY">STUDY</option>
            <option value="HOBBY">HOBBY</option>
            <option value="ECONOMY">ECONOMY</option>
            <option value="ETC">ETC</option>
          </select>
        </div>
        <div class="form-group">
          <label for="conditionStatus">상태</label>
          <select id="conditionStatus" v-model="localChallenge.conditionStatus">
            <option value="BEFORE">BEFORE</option>
            <option value="TODO">TODO</option>
            <option value="COMPLETE">COMPLETE</option>
          </select>
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
    formatDate(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    },
    async updateChallenge() {
      try {
        const formattedStartTime = this.formatDate(this.localChallenge.startTime);
        const formattedEndTime = this.formatDate(this.localChallenge.endTime);
        const response = await axios.patch(`/admins/challenges/${this.localChallenge.challengeId}`, {
          ...this.localChallenge,
          startTime: formattedStartTime,
          endTime: formattedEndTime
        });

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

.form-group input, .form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0; /* gray-300 */
  border-radius: 0.375rem;
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
