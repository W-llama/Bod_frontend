<template>
  <div id="app">
    <HeroSection />
    <ChallengeCard />
  </div>

</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import ChallengeCard from "@/components/ChallengeCard.vue";

export default {
  components: {
    HeroSection,
    ChallengeCard
  },
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
