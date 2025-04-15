<template>
    <div class="mypage-container">
      <!-- 왼쪽 프로필 영역 -->
      <ProfileView />
  
      <!-- 오른쪽 콘텐츠 영역 -->
      <HistoryManageView />
    </div>
  </template>
  
  <script setup lang="ts">
  import ProfileView from '@/views/mypage/profile/ProfileView.vue'
  import HistoryManageView from '@/views/mypage/history/HistoryManageView.vue'
  </script>
  
  <style scoped>
  .mypage-container {
    display: flex;
    gap: 24px;
    padding: 32px;
  }
  </style>
  