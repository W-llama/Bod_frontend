<template>
  <div id="app">
    <Header />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      showLoginModal: false,
    };
  },
  methods: {
    ...mapActions(['checkAuth']),
  },
  created() {
    this.checkAuth();
  },
}
//병합이 되지않는 문제를 수정하기 위한 주석입니다.
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

body,
html {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
}


</style>



