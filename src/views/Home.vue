<template>
  <div>
    <section class="hero">
      <h1>새로운 도전으로 성장하세요</h1>
      <p>챌린저스와 함께 목표를 달성하고 더 나은 자신을 만들어가세요</p>
      <button class="cta-button" @click="startChallenge">챌린지 시작하기</button>
    </section>

    <section id="challenges" class="challenges">
      <div v-for="challenge in challenges" :key="challenge.id" class="challenge-card">
        <img :src="challenge.image" :alt="challenge.title" class="challenge-image">
        <div class="challenge-content">
          <h2>{{ challenge.title }}</h2>
          <p>{{ challenge.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      challenges: [
        { id: 1, image: 'https://source.unsplash.com/random/400x200?fitness', title: '30일 운동 챌린지', description: '매일 30분씩 운동하며 건강한 습관을 만들어보세요' },
        { id: 2, image: 'https://source.unsplash.com/random/400x200?books', title: '독서 마라톤', description: '한 달 동안 5권의 책을 읽고 지식의 폭을 넓혀보세요' },
        { id: 3, image: 'https://source.unsplash.com/random/400x200?water', title: '물 마시기 챌린지', description: '하루 2리터의 물을 마시며 건강한 생활을 시작하세요' },
        { id: 4, image: 'https://source.unsplash.com/random/400x200?morning', title: '아침 일찍 일어나기', description: '21일 동안 매일 아침 6시에 일어나 생산적인 하루를 보내세요' },
        { id: 5, image: 'https://source.unsplash.com/random/400x200?gratitude', title: '감사일기 쓰기', description: '매일 밤 감사한 일 3가지를 적으며 긍정적인 마인드를 기르세요' },
        { id: 6, image: 'https://source.unsplash.com/random/400x200?hobby', title: '새로운 취미 배우기', description: '한 달 동안 새로운 취미를 배우고 자신의 재능을 발견하세요' },
      ]
    }
  },
  methods: {
    startChallenge() {
      window.location.href = 'https://challengers.co.kr/create-challenge';
    }
  }
}
</script>

<style scoped>
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

.challenges {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
}

.challenge-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  width: calc(33.33% - 20px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.challenge-card:hover {
  transform: translateY(-5px);
}

.challenge-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.challenge-content {
  padding: 20px;
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
