<template>
  <footer>
    <div class="container">
      <p>&copy; 2024 챌린저스. ChallengersBOD팀 : 류승범, 김형석, 김기남, 한해정 </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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
