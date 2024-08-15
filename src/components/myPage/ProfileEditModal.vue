<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>프로필 수정</h2>
      <form @submit.prevent="submitEditProfile">

        <div class="input-group">
          <label for="image">프로필 이미지</label>
          <input type="file" @change="onFileChange">
          <div v-if="profileData.imageUrl" class="image-preview">
            <img :src="profileData.imageUrl" alt="이미지 미리보기">
          </div>
        </div>

        <div class="input-group">
          <label for="nickname">닉네임</label>
          <input type="text" v-model="profileData.nickname">
          <button type="button" @click="checkNickname" class="check-btn">중복 확인</button>
        </div>
        <div v-if="nicknameError" class="error">{{ nicknameError }}</div>

        <div class="input-group">
          <label for="introduce">자기소개</label>
          <textarea v-model="profileData.introduce"></textarea>
        </div>

        <button type="submit">저장</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  props: {
    userProfile: {
      type: Object,
      default: () => ({
        nickname: '',
        introduce: '',
        image: ''
      })
    }
  },
  data() {
    return {
      profileData: {
        nickname: this.userProfile.nickname || '',
        introduce: this.userProfile.introduce || '',
        image: null,
        imageUrl: this.userProfile.image
            ? `https://bodchallenge.s3.ap-northeast-2.amazonaws.com/${this.userProfile.image}`
            : ''
      },
      nicknameError: '',
      nicknameValid: !!this.userProfile.nickname,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.profileData.image = file;
      this.profileData.imageUrl = URL.createObjectURL(file);
    },
    async submitEditProfile() {
      try {
        if (this.profileData.nickname !== this.userProfile.nickname && !this.nicknameValid) {
          this.nicknameError = '닉네임 중복 확인을 해주세요.';
          return;
        }

        if (this.profileData.nickname !== this.userProfile.nickname) {
          await this.$store.dispatch('updateNickName', { nickname: this.profileData.nickname.trim() });
        }

        if (this.profileData.introduce !== this.userProfile.introduce) {
          await this.$store.dispatch('updateIntroduce', { introduce: this.profileData.introduce.trim() });
        }

        if (this.profileData.image) {
          await this.$store.dispatch('updateProfileImage', this.profileData.image);
        }

        this.$emit('close');
      } catch (error) {
        alert('프로필 수정 실패: ' + error.message);
      }
    },
    async checkNickname() {
      if (!this.validateNickname()) return;
      try {
        const response = await axios.post('/signup/check-nickname', {nickname: this.profileData.nickname});
        if (response.data.data) {
          this.nicknameError = '닉네임이 이미 존재합니다.';
          this.nicknameValid = false;
        } else {
          this.nicknameError = '닉네임이 사용 가능합니다.';
          this.nicknameValid = true;
        }
      } catch (error) {
        console.error('닉네임 확인 중 오류:', error);
        this.nicknameError = '닉네임 확인 중 오류가 발생했습니다.';
      }
    },
    validateNickname() {
      if (this.profileData.nickname.length < 3 || this.profileData.nickname.length > 13 || !/^[a-zA-Z가-힣0-9]*$/.test(this.profileData.nickname)) {
        this.nicknameError = '닉네임은 3자 이상 13자 이하의 문자와 숫자로 구성되어야 합니다.';
        this.nicknameValid = false;
        return false;
      }
      this.nicknameError = '';
      return true;
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
  z-index: 1000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  position: relative;
  box-sizing: border-box;
  color: white;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: white;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-group label {
  margin-bottom: 5px;
}

.input-group input, .input-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.input-group textarea {
  resize: none;
}

.check-btn {
  width: 20%;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.check-btn:hover {
  background: #5a67d8;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button[type="submit"]:hover {
  background: #5a67d8;
}

.image-preview img {
  width: 220px;
  height: 220px;
  margin-left: 20%;
  margin-top: 10px;
  border-radius: 50%;
}
</style>
