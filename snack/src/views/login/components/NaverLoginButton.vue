<template>
    <button class="custom-btn naver-btn" @click="$emit('login')">
      <span class="naver-icon">N</span> 네이버로 로그인하기
    </button>
  </template>

<style scoped>
/* ✅ 네이버 */
.naver-btn {
  background-color: #03C75A;
  color: white;
}

.naver-btn:hover {
  background-color: #02b24f;
}
</style>