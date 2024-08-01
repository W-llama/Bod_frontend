<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>프로필 수정</h2>
      <form @submit.prevent="submitEditProfile">
        <div class="input-group">
          <label for="nickname">닉네임</label>
          <input type="text" v-model="profileData.nickname" required>
        </div>
        <div class="input-group">
          <label for="introduce">소개</label>
          <textarea v-model="profileData.introduce"></textarea>
        </div>
        <div class="input-group">
          <label for="image">프로필 이미지</label>
          <input type="file" @change="onFileChange">
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userProfile: Object
  },
  data() {
    return {
      profileData: {
        nickname: this.userProfile ? this.userProfile.nickname : '',
        introduce: this.userProfile ? this.userProfile.introduce : '',
        image: null
      }
    };
  },
  methods: {
    onFileChange(event) {
      this.profileData.image = event.target.files[0];
    },
    async submitEditProfile() {
      try {
        await this.$store.dispatch('updateProfile', {
          nickname: this.profileData.nickname,
          introduce: this.profileData.introduce
        });
        if (this.profileData.image) {
          await this.$store.dispatch('updateProfileImage', this.profileData.image);
        }
        this.$emit('profile-updated');
        this.$emit('close');
      } catch (error) {
        alert('프로필 수정 실패: ' + error.message);
      }
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000; /* Ensure the modal is above other content */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-width: 80%; /* Make sure the modal doesn't exceed the screen width */
  max-height: 80%; /* Make sure the modal doesn't exceed the screen height */
  overflow: auto; /* Enable scrolling if the content overflows */
  position: relative;
  box-sizing: border-box;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.input-group {
  margin-bottom: 15px;
  width: 100%; /* Ensure input groups take full width */
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input, .input-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
