<template>
    <div class="profile-section">
      <!-- 프로필 이미지 + 업로드 버튼 -->
      <div class="avatar-wrapper">
        <div class="avatar-circle">😊</div>
        <v-btn icon class="upload-btn" size="x-small" flat>
          <v-icon size="18">mdi-plus-circle</v-icon>
        </v-btn>
      </div>
  
      <!-- 닉네임 인사 -->
      <p class="greeting-text">안녕하세요 <strong>{{ accountStore.nickname }}</strong>님!</p>
  
      <!-- 내 정보 수정 버튼 -->
      <v-btn class="edit-btn" flat>내 정보 수정</v-btn>
  
      <!-- 회원 탈퇴 -->
      <v-btn class="withdraw-btn" flat @click="handleWithdraw">
        회원 탈퇴
      </v-btn>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAccountStore } from '@/store/account/accountStore'
  import { useRouter } from 'vue-router'
  
  const accountStore = useAccountStore()
  const router = useRouter()
  
  const handleWithdraw = () => {
    if (confirm('회원 탈퇴하시겠습니까?')) {
      router.push('/policy/withdrawal')
    }
  }
  </script>
  
  <style scoped>
  .profile-section {
    background-color: #f8f9fa; /* 좀 더 연한 회색 */
    border-radius: 12px;
    padding: 24px;
    width: 260px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .avatar-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  
  .avatar-circle {
    width: 80px;
    height: 80px;
    background-color: #eee;
    border-radius: 50%;
    font-size: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .upload-btn {
    position: absolute;
    top: -4px;
    right: -4px;
    background-color: white;
    box-shadow: none;
    padding: 2px;
  }
  
  .greeting-text {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    font-family: 'Noto Sans KR', sans-serif;
    text-align: center;
  }
  
  .edit-btn {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 13px;
    margin-bottom: auto;
    color: #333;
  }
  
  .withdraw-btn {
    margin-top: auto;
    background-color: #eee;
    color: #555;
    font-weight: bold;
    border-radius: 6px;
    padding: 10px;
  }
  .withdraw-btn:hover {
    background-color: #ddd;
  }
  </style>
  