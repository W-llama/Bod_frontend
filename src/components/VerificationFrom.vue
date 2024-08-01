<template>
  <div>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <form class="verification-form" @submit.prevent="submitVerification">
          <div class="form-group">
            <label for="verification-title">인증 제목</label>
            <input type="text" id="verification-title" v-model="verificationTitle" placeholder="오늘의 인증 제목을 입력하세요" required />
          </div>
          <div class="form-group">
            <label for="verification-image">인증 사진 업로드</label>
            <input type="file" id="verification-image" @change="handleFileUpload" accept="image/*" required />
          </div>
          <div class="form-group">
            <label for="verification-content">인증 내용</label>
            <textarea id="verification-content" v-model="verificationContent" placeholder="오늘의 챌린지를 어떻게 수행했나요? 자세히 설명해주세요." required></textarea>
          </div>
          <button type="submit" class="btn">인증하기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['challengeId'],
  data() {
    return {
      showModal: true,
      verificationTitle: '',
      verificationContent: '',
      verificationImage: null,
      token: this.getToken()
    };
  },
  methods: {
    getToken() {
      const tokenWithPrefix = localStorage.getItem('accessToken')?.trim();
      return tokenWithPrefix ? tokenWithPrefix.replace('Bearer ', '').trim() : '';
    },
    closeModal() {
      this.showModal = false;
      this.$emit('close');
    },
    handleFileUpload(event) {
      this.verificationImage = event.target.files[0];
    },
    async submitVerification() {
      if (!this.challengeId) {
        console.error('challengeId is not defined.');
        return;
      }

      try {
        let formData = new FormData();
        formData.append('image', this.verificationImage);

        const requestDto = {
          title: this.verificationTitle,
          content: this.verificationContent
        };
        formData.append('request', new Blob([JSON.stringify(requestDto)], { type: 'application/json' }));

        const response = await fetch(`http://localhost:8080/api/challenges/${this.challengeId}/verifications`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        alert("챌린지 인증이 정상적으로 처리되었습니다.");
        console.log('Verification submitted successfully:', data);
        this.closeModal();
        this.verificationTitle = '';
        this.verificationContent = '';
        this.verificationImage = null;
      } catch (error) {
        alert("챌린지 인증 중에 오류가 발생했습니다.");
        console.error('Error submitting verification:', error);
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.form-group input[type="file"],
.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.btn {
  background-color: #667eea;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
}

.btn:hover {
  background-color: #5a6fd6;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}
</style>
