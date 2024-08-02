<template>
  <MyPageSideBar @edit-profile="showProfileEditModal = true" @profile-updated="updateUserProfile" />
  <div id="app" class="app-container">
    <main class="main-content">
      <div class="content-wrapper">
        <div class="content-container">
          <h1>회원 탈퇴</h1>
          <div class="username-board">
            <form @submit.prevent="confirmWithDraw">
              <div class="input-group">
                <label for="currentUsername">아이디</label>
                <input type="text" v-model="withDrawData.currentUserName">
              </div>
              <div v-if="withDrawData.currentUserName" class="status-message">
                <span v-if="isUsernameMatching" class="success-message">{{ usernameMessage }}</span>
                <span v-else class="error-message">{{ usernameMessage }}</span>
              </div>
              <button type="button" @click="validateUsername(withDrawData.currentUserName)" class="check-btn">아이디 확인</button>
              <div class="input-group">
                <label for="currentPassword">비밀 번호</label>
                <input type="password" v-model="withDrawData.currentPassword">
              </div>
              <button type="submit" :disabled="!isUsernameMatching">회원 탈퇴</button>
            </form>
          </div>
        </div>
      </div>
    </main>
    <ProfileEditModal
        v-if="showProfileEditModal"
        @close="showProfileEditModal = false"
        @profile-updated="updateUserProfile"
    />
    <ConfirmationModal
        v-if="showConfirmationModal"
        @confirm="withDrawUser"
        @cancel="showConfirmationModal = false"
    >
      정말로 탈퇴하시겠습니까?
    </ConfirmationModal>
  </div>
</template>

<script>
import MyPageSideBar from "@/components/myPage/MyPageSideBar.vue";
import ProfileEditModal from "@/components/myPage/ProfileEditModal.vue";
import ConfirmationModal from "@/components/common/ConfirmationModal.vue";
import { mapActions } from "vuex";
import axios from "@/axios";

export default {
  name: 'MyPageWithDraw',
  components: {
    ProfileEditModal,
    MyPageSideBar,
    ConfirmationModal
  },
  data() {
    return {
      showProfileEditModal: false,
      showConfirmationModal: false,
      withDrawData: {
        currentUserName: '',
        currentPassword: ''
      },
      usernameMessage: '',
      isUsernameMatching: false
    };
  },
  methods: {
    ...mapActions(['fetchUserProfile', 'withDraw']),
    async validateUsername(username) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.post(`/checkUserName?username=${username}`, {
          headers: {
            Authorization: accessToken,
          },
        });
        this.usernameMessage = '아이디가 일치합니다';
        this.isUsernameMatching = true;
      } catch (error) {
        this.usernameMessage = '현재 로그인된 아이디와 일치하지 않습니다.';
        this.isUsernameMatching = false;
      }
    },
    confirmWithDraw() {
      if (this.isUsernameMatching) {
        this.showConfirmationModal = true;
      }
    },
    async withDrawUser() {
      await this.withDraw(this.withDrawData);
      this.$emit('withDraw-success');
      this.$router.push('/').then(() => {
        window.location.reload(); // 페이지 새로고침
      });
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

.app-container {
  display: flex;
  height: 100%;
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

.username-board {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}

.input-group {
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
  width: 100px;
  padding: 10px;
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

.status-message {
  margin-top: 5px;
  font-size: 0.9rem;
}

.error-message {
  color: red;
  margin-top: 5px;
  font-size: 0.9rem;
}

.success-message {
  color: green;
  margin-top: 10px;
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
