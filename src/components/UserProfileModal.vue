<template>
  <div v-if="isProfileLoaded" class="modal-overlay">
    <div class="login-container">
      <button class="close-button" @click="$emit('close')">&times;</button>
      <div class="background-shape"></div>
      <h1>유저 프로필 조회!</h1>
      <div class="profile-image-wrapper">
        <img :src="profileImageUrl" alt="Profile Image" class="profile-image" />
      </div>
      <div class="input-group">
        <label for="nickname">닉네임</label>
        <div class="profile-nickname">{{ selectedUserProfile.nickname || '닉네임 정보 없음' }}</div>
      </div>
      <div class="input-group">
        <label for="introduce">자기소개</label>
        <div class="profile-introduce">{{ selectedUserProfile.introduce || '자기소개 정보 없음' }}</div>
      </div>
    </div>
  </div>
  <div v-else class="modal-overlay">
    <div class="login-container">
      <p>유저 프로필을 로드하는 중입니다...</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'UserProfileModal',
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isProfileLoaded: false,
    };
  },
  computed: {
    ...mapGetters(['selectedUserProfile']),
    profileImageUrl() {
      // 이미지가 없을 경우 기본 이미지 URL 사용
      const baseURL = 'https://bodchallenge.s3.ap-northeast-2.amazonaws.com/';
      return this.selectedUserProfile && this.selectedUserProfile.image
          ? `${baseURL}${this.selectedUserProfile.image}`
          : 'https://source.unsplash.com/random/200x200?portrait';
    },
  },
  methods: {
    ...mapActions(['getUserProfile']),
    async loadUserProfile() {
      try {
        await this.getUserProfile(this.userId);
        this.isProfileLoaded = true;
      } catch (error) {
        console.error('프로필을 로드하는 중 오류 발생:', error);
      }
    },
  },
  created() {
    this.loadUserProfile();
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.login-container {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.profile-image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ddd;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.profile-nickname,
.profile-introduce {
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  text-align: left;
}
</style>
