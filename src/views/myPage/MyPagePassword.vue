<template>
  <div id="password" class="password-container">
    <MyPageSideBar @edit-profile="showProfileEditModal = true" @profile-updated="updateUserProfile" />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="content-container">
          <div class="password-board">
            <h2>비밀번호 변경</h2>
            <form @submit.prevent="handleChangePassword">
              <div class="input-group">
                <label for="currentPassword">현재 비밀번호</label>
                <input type="password" v-model="passwordData.currentPassword" required>
              </div>
              <div class="input-group">
                <label for="newPassword">새 비밀번호</label>
                <input type="password" v-model="passwordData.newPassword" required @input="resetMessages">
                <div v-if="passwordError" class="message error-message">{{ passwordError }}</div>
                <div v-if="passwordCheckMessage" :class="{'message': true, 'error-message': !isPasswordValid, 'success-message': isPasswordValid}">
                  {{ passwordCheckMessage }}
                </div>
              </div>
              <div class="input-group">
                <label for="confirmNewPassword">새 비밀번호 확인</label>
                <input type="password" v-model="passwordData.confirmNewPassword" required @input="resetMessages">
                <div v-if="passwordData.newPassword !== '' && passwordData.confirmNewPassword !== ''">
                  <span v-if="passwordData.newPassword === passwordData.confirmNewPassword" class="message success-message">비밀번호가 일치합니다.</span>
                  <span v-else class="message error-message">비밀번호가 일치하지 않습니다.</span>
                </div>
                <button type="button" @click="validateNewPassword" class="check-btn">비밀번호 확인</button>
              </div>
              <button type="submit" :disabled="!isPasswordValid || passwordData.newPassword !== passwordData.confirmNewPassword">변경</button>
            </form>
            <div v-if="errorMessage" class="message error-message">{{ errorMessage }}</div>
            <div v-if="successMessage" class="message success-message">{{ successMessage }}</div>
          </div>
        </div>
      </div>
    </main>
    <ProfileEditModal
        v-if="showProfileEditModal"
        @close="showProfileEditModal = false"
        @profile-updated="updateUserProfile"
    />
  </div>
</template>

<script>
import MyPageSideBar from "@/components/myPage/MyPageSideBar.vue";
import ProfileEditModal from '@/components/myPage/ProfileEditModal.vue';
import axios from "@/axios";
import { mapActions } from 'vuex';

export default {
  name: 'MyPagePassword',
  components: {
    ProfileEditModal,
    MyPageSideBar
  },
  data() {
    return {
      showProfileEditModal: false,
      passwordData: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      errorMessage: '',
      successMessage: '',
      passwordCheckMessage: '',
      passwordError: '',
      isPasswordValid: false,
    };
  },
  methods: {
    ...mapActions(['fetchUserProfile', 'changePassword']),
    async handleChangePassword() {
      try {
        await this.changePassword({
          oldPassword: this.passwordData.currentPassword,
          newPassword: this.passwordData.newPassword
        });
        this.successMessage = '비밀번호가 성공적으로 변경되었습니다';
        alert(this.successMessage);
        window.location.reload();
      } catch (error) {
        console.error('비밀번호 변경 실패:', error);
        this.errorMessage = error.response?.data?.message || '비밀번호 변경 실패';
      }
    },
    async validateNewPassword() {
      if (!this.validatePassword()) {
        return;
      }
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post('/users/validateNewPassword', this.passwordData.newPassword, {
          headers: {
            Authorization: accessToken,
            'Content-Type': 'text/plain',
          },
        });
        this.passwordCheckMessage = response.data.message || '비밀번호를 변경할 수 있습니다.';
        this.isPasswordValid = true;
      } catch (error) {
        console.error('비밀번호 검증 실패:', error);
        this.passwordCheckMessage = error.response?.data?.message || '최근 사용한 비밀번호와 일치합니다.';
        this.isPasswordValid = false;
      }
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
      if (!passwordRegex.test(this.passwordData.newPassword)) {
        this.passwordError = '비밀번호는 8자 이상 15자 이하, 대문자, 소문자, 숫자 및 특수 문자를 포함해야 합니다.';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    resetMessages() {
      this.errorMessage = '';
      this.successMessage = '';
      this.passwordCheckMessage = '';
      this.isPasswordValid = false;
    },
    async updateUserProfile() {
      try {
        await this.fetchUserProfile();
      } catch (error) {
        console.error('Profile update failed:', error);
        alert('프로필 업데이트 중 오류가 발생했습니다.');
      }
    },
  }
};
</script>

<style scoped>
body, html {
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
}

.password-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  margin-left: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
}

.content-wrapper {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-container {
  width: 100%;
  max-width: 600px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.password-board {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}

.input-group {
  width: 100%;
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #e0e0e0;
}

.input-group input {
  width: calc(100% - 20px); /* Adjust width for padding */
  padding: 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.check-btn {
  font-size: 1rem;
  width: 120px;
  padding: 10px;
  margin-left: 60%;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin-top: 10px;
  margin-bottom: 5%;
}

.check-btn:hover {
  background: #5a67d8;
}

.message {
  font-size: 12px;
  margin-top: 5px;
  width: 100%; /* Ensure the message takes up the full width */
}

.error-message {
  color: red;
}

.success-message {
  color: green;
}

button {
  width: 100%;
  padding: 12px;
  background: #5a67d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

button:hover {
  background: #4c51bf;
}
</style>
