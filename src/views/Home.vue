<template>
  <div id="app">
    <HeroSection />
    <ChallengeCard />
  </div>
  <LoginModal v-if="showLoginModal" @close="showLoginModal = false" @login-success="handleLoginSuccess" />

</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import ChallengeCard from "@/components/ChallengeCard.vue";
import Footer from "@/components/Footer.vue";
import LoginModal from '../components/Login.vue';
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
    LoginModal,
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
</style>
