<template>
    <button class="custom-btn google-btn" @click="$emit('login')">
      <img src="/images/login/google-logo.png" alt="구글" width="25" />
      구글로 로그인하기
    </button>
  </template>
  
  <style scoped>
  .google-btn {
    background-color: #f2f2f2;
    color: #333;
    border: 1px solid #ddd;
  }

  .google-btn:hover {
  background-color: #e6e6e6;
}
  </style>