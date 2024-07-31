<!-- src/views/ChangePassword.vue -->
<template>
  <div class="settings-container">
    <h2>설정</h2>
    <div class="settings-sections">
      <div class="section">
        <h3>비밀번호 변경</h3>
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
</template>

<script>
export default {
  data() {
    return {
      passwordData: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
    };
  },
  methods: {
    async changePassword() {
      if (this.passwordData.newPassword !== this.passwordData.confirmNewPassword) {
        alert('새 비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        await this.$store.dispatch('changePassword', this.passwordData);
        alert('비밀번호가 성공적으로 변경되었습니다.');
        this.$router.push('/myPage');
      } catch (error) {
        console.error('비밀번호 변경 실패:', error);
        alert('비밀번호 변경 실패');
      }
    },
  },
};
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.settings-sections {
  margin-top: 20px;
}

.section {
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #5a6fd6;
}
</style>
