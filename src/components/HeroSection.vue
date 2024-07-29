<template>
  <section class="hero">
    <div class="container">
      <h1>새로운 도전으로 성장하세요</h1>
      <p>챌린저스와 함께 목표를 달성하고 더 나은 자신을 만들어가세요</p>
      <button class="cta-button" @click="navigateToChallengePage">챌린지 시작하기</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  methods: {
    navigateToChallengePage() {
      window.location.href = 'https://challengers.co.kr/create-challenge';
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  text-align: center;
  padding: 100px 0;
  color: white;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 30px;
}

.cta-button {
  background: white;
  color: #667eea;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>
