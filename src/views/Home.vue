<template>
  <div id="app">
    <Header />
    <HeroSection />
    <ChallengeCard />
    <Footer />
  </div>

  <button @click="showLoginModal = true" class="login-button">로그인</button>

  <LoginModal v-if="showLoginModal" @close="showLoginModal = false" @login-success="handleLoginSuccess" />
</template>

<script>
import Header from "@/components/Header.vue";
import HeroSection from "@/components/HeroSection.vue";
import ChallengeCard from "@/components/ChallengeCard.vue";
import Footer from "@/components/Footer.vue";
import LoginModal from '../components/Login.vue';

export default {
  components: {
    LoginModal,
    Header,
    HeroSection,
    ChallengeCard,
    Footer
  },
  data() {
    return {
      showLoginModal: false,
    }
  },
  methods: {
    handleLoginSuccess() {
      this.showLoginModal = false;
      alert('로그인 성공!');
    }
  }
}
</script>

<style scoped>
.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 30px;
}

.challenge-card h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.challenge-card p {
  font-size: 16px;
  color: #666;
}

.login-button {
  background: white;
  color: #667eea;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>
