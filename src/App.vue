<template>
  <div id="app">
    <header>
      <div class="container">
        <nav>
          <div class="nav-links">
            <router-link to="/challenges">챌린지</router-link>
            <a href="https://challengers.co.kr/create-challenge">챌린지 생성</a>
            <a href="https://challengers.co.kr/mypage">마이페이지</a>
          </div>
          <div class="auth-buttons">
            <router-link to="/login" class="btn">로그인</router-link>
            <router-link to="/signup" class="btn secondary">회원가입</router-link>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <router-view></router-view> <!-- 라우터 뷰 추가 -->
    </main>

    <footer>
      <div class="container">
        <p>&copy; 2023 챌린저스. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 전역 상태를 여기에 추가할 수 있습니다
    }
  },
  methods: {
    // 전역 메서드를 여기에 추가할 수 있습니다
  }
}
</script>

<style>
/* 전역 스타일을 여기에 추가할 수 있습니다 */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body, html {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  transition: color 0.3s ease, transform 0.3s ease;
  padding: 8px 12px;
  border-radius: 15px;
}

.nav-links a:not(.btn):hover {
  color: #667eea;
  transform: translateY(-2px);
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  background-color: #667eea;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 600;
}

.btn:hover {
  background-color: #5a6fd6;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.btn.secondary {
  background-color: transparent;
  border: 2px solid #667eea;
  color: #667eea;
}

.btn.secondary:hover {
  background-color: #667eea;
  color: white;
}

main {
  padding: 20px 0;
}

footer {
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  padding: 20px 0;
  margin-top: 50px;
}

footer p {
  color: #666;
}
</style>
