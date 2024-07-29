<template>
  <div class="challenge-verifications">
    <h2>최근 인증</h2>
    <div class="verification-grid">
      <div class="verification-item" v-for="(verification, index) in verifications" :key="index">
        <img :src="verification.image" :alt="verification.name" class="verification-image">
        <div class="verification-info">
          <div class="verification-user">{{ verification.name }}</div>
          <div class="verification-date">{{ verification.date }}</div>
          <div class="verification-content">{{ verification.title }}</div>
          <div class="verification-content">{{ verification.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChallengeVerifications',
  props: {
    verifications: Array
  }
};
</script>

<style scoped>
.challenge-verifications {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.verification-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  max-height: 600px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}

.verification-item {
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column; /* Arrange content vertically */
  justify-content: space-between; /* Distribute space between items */
}

.verification-item:hover {
  transform: translateY(-5px);
}

.verification-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0; /* Rounded corners only on top */
}

.verification-info {
  padding: 15px;
}

.verification-user {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.verification-date {
  font-size: 12px;
  color: #666;
}

.verification-content {
  margin-top: 5px;
  font-size: 14px;
  color: #444;
}
</style>
