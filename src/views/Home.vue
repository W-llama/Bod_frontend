<template>
  <div id="app">
    <div style="display: flex; align-items: center;">
      <PointRankingSection />
      <h3 style="color: #ffffff;">
        CHALLENGERS-B.O.D 사이트 이용방법~!<br>
        1. 회원가입 및 로그인~!<br>
        2. 챌린지 참여하기에서 원하는 챌린지 선택해서 참가하기~!<br>
        3. 마이페이지에서 챌린지 인증하기~!<br>
        4. 챌린지 인증이 수락되면 500 point up~!<br>
        5. 챌린지 랭킹 상위권에게는 생각지도 못한 보상이 있을지도~!
      </h3>
    </div>
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
