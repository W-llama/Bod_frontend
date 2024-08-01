<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">&times;</button>
      <h2>새 챌린지 만들기</h2>
      <form @submit.prevent="createChallenge">
        <div>
          <label for="title">제목</label>
          <input type="text" v-model="challenge.title" id="title" required />
        </div>
        <div>
          <label for="content">내용</label>
          <input type="text" v-model="challenge.content" id="content" required />
        </div>
        <div>
          <label for="image">이미지</label>
          <input type="file" @change="handleFileChange" id="image" required />
        </div>
        <div class="form-group">
          <label for="category">카테고리</label>
          <select id="category" v-model="challenge.category">
            <option value="HEALTH">HEALTH</option>
            <option value="STUDY">STUDY</option>
            <option value="HOBBY">HOBBY</option>
            <option value="ECONOMY">ECONOMY</option>
            <option value="ETC">ETC</option>
          </select>
        </div>
        <div class="form-group">
          <label for="conditionStatus">상태</label>
          <select id="conditionStatus" v-model="challenge.conditionStatus">
            <option value="BEFORE">BEFORE</option>
            <option value="TODO">TODO</option>
            <option value="COMPLETE">COMPLETE</option>
          </select>
        </div>
        <div>
          <label for="startTime">시작일</label>
          <input type="date" v-model="challenge.startTime" id="startTime" required />
        </div>
        <div>
          <label for="endTime">종료일</label>
          <input type="date" v-model="challenge.endTime" id="endTime" required />
        </div>
        <button type="submit">생성완료</button>
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
    }
  },
  data() {
    return {
      challenge: {
        title: '',
        content: '',
        category: '',
        conditionStatus: '',
        startTime: '',
        endTime: ''
      },
      imageFile: null
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    },
    handleFileChange(event) {
      this.imageFile = event.target.files[0];
    },
    async createChallenge() {
      try {
        const formattedStartTime = this.formatDate(this.challenge.startTime);
        const formattedEndTime = this.formatDate(this.challenge.endTime);

        const formData = new FormData();
        formData.append('title', this.challenge.title);
        formData.append('content', this.challenge.content);
        formData.append('category', this.challenge.category);
        formData.append('conditionStatus', this.challenge.conditionStatus);
        formData.append('startTime', formattedStartTime);
        formData.append('endTime', formattedEndTime);
        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }

        // Create a JSON string of the request DTO
        const requestDto = {
          title: this.challenge.title,
          content: this.challenge.content,
          category: this.challenge.category,
          conditionStatus: this.challenge.conditionStatus,
          startTime: formattedStartTime,
          endTime: formattedEndTime
        };
        formData.append('request', new Blob([JSON.stringify(requestDto)], { type: 'application/json' }));

        const response = await axios.post('/admins/challenges', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          alert('챌린지 생성에 성공하였습니다!'); // 알림창 추가
          this.$emit('create-success');
          this.closeModal();
        } else {
          console.error('Failed to create challenge:', response.data.msg || 'Unknown error');
        }
      } catch (error) {
        console.error('Error creating challenge:', error);
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
