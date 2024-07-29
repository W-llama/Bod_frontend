<template>
  <header>
    <div class="container">
      <nav>
        <div class="nav-links">
          <a href="#challenges">챌린지</a>
          <a href="https://challengers.co.kr/create-challenge">챌린지 생성</a>
          <a href="https://challengers.co.kr/mypage">마이페이지</a>
        </div>
        <div class="auth-buttons">
          <a href="https://challengers.co.kr/login" class="btn">로그인</a>
          <a href="https://challengers.co.kr/signup" class="btn secondary">회원가입</a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>

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
</style>