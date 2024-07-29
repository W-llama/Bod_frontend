<template>
  <div id="app">
    <Header />
    <HeroSection />
    <ChallengesSection />
    <ChallengeCard />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import ChallengesSection from './components/ChallengesSection.vue';
import ChallengeCard from "@/components/ChallengeCard.vue";
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    HeroSection,
    ChallengesSection,
    ChallengeCard,
    Footer
  }
};
</script>


