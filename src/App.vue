<template>
  <div id="app">
    <main>
      <router-view></router-view> <!-- 라우터 뷰 추가 -->
    </main>
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

</style>