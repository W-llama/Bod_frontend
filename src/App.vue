<template>
  <div id="app">
    <Header />
    <Footer />
  </div>
  <LoginModal v-if="showLoginModal" @close="showLoginModal = false" @login-success="handleLoginSuccess" />
</template>

<script>
import Header from "@/components/Header.vue";
import LoginModal from "@/components/Login.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'App',
  components: {Footer, LoginModal, Header},
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




