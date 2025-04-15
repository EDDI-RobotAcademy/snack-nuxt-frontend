<template>
    <button class="custom-btn github-btn" @click="$emit('login')">
      <img src="/images/login/git-hub.png" alt="깃허브" width="18" />
      관리자로 로그인하기
    </button>
  </template>
  
  <style scoped>
  .github-btn {
    background-color: #6e5494; /* 깃허브 보라 */
    color: white;
  }

  .github-btn:hover {
  background-color: #534668;
}
  </style>