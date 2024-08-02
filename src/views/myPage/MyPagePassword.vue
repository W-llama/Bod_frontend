<template>
  <div id="password" class="password-container">
    <main class="main-content">
      <MyPageSideBar @edit-profile="showProfileEditModal = true" @profile-updated="updateUserProfile" />
      <div class="content-wrapper">
        <div class="content-container">
          <h1>설정</h1>
          <div class="password-board">
            <h2>비밀번호 변경</h2>
            <form @submit.prevent="changePassword">
              <div class="input-group">
                <label for="currentPassword">현재 비밀번호</label>
                <input type="password" v-model="passwordData.currentPassword" required>
              </div>
              <div class="input-group">
                <label for="newPassword">새 비밀번호</label>
                <input type="password" v-model="passwordData.newPassword" required>
              </div>
              <div class="input-group">
                <label for="confirmNewPassword">새 비밀번호 확인</label>
                <input type="password" v-model="passwordData.confirmNewPassword" required>
              </div>
              <button type="submit">변경</button>
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
  </div>
</template>

<script>
import MyPageSideBar from "@/components/myPage/MyPageSideBar.vue";
import ProfileEditModal from '@/components/myPage/ProfileEditModal.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ChallengeMyPagePassword',
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
    };
  },
  methods: {
    ...mapActions(['fetchUserProfile', 'changePassword']),
    async changePassword() {
      if (this.passwordData.newPassword !== this.passwordData.confirmNewPassword) {
        alert('새 비밀번호가 일치하지 않습니다.');
        return;
      }
      try {
        await this.changePassword(this.passwordData);
        alert('비밀번호가 성공적으로 변경되었습니다.');
        this.$router.push('/myPage');
      } catch (error) {
        console.error('비밀번호 변경 실패:', error);
        alert('비밀번호 변경 실패');
      }
    },
    async updateUserProfile() {
      try {
        await this.fetchUserProfile();
      } catch (error) {
        console.error('Profile update failed:', error);
        alert('프로필 업데이트 중 오류가 발생했습니다.');
      }
    }
  }
};
</script>

<style scoped>
.password-container {
  display: flex;
}

.main-content {
  display: flex;
  width: 100%;
}

.content-wrapper {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.content-container {
  width: 100%;
  max-width: 800px;
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
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #e0e0e0;
}

.input-group input {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
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

button:hover {
  background: #4c51bf;
}
</style>
