<template>
    <button class="custom-btn kakao-btn" @click="$emit('login')">
      🗨️ 카카오로 로그인하기
    </button>
  </template>


<style scoped>
/* ✅ 카카오 */
.kakao-btn {
  background-color: #FEE500;
  color: #3C1E1E;
}
.kakao-btn:hover {
  background-color: #e4cd00;
}
</style>