<template>
  <div id="app">
    <Header />
    <HeroSection />
    <ChallengeCard />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeroSection from "@/components/HeroSection.vue";
import ChallengeCard from "@/components/ChallengeCard.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    HeroSection,
    ChallengeCard,
    Footer
  }
};
</script>
