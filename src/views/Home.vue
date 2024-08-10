<template>
  <div id="app">
    <PointRankingSection />
    <ChallengeCard />
  </div>

</template>

<script>
import PointRankingSection from "@/components/PointRankingSection.vue";
import ChallengeCard from "@/components/ChallengeCard.vue";

export default {
  components: {
    PointRankingSection,
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
