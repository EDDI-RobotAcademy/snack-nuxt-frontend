<template>
    <div class="withdraw-wrapper">
      <h2>회원 탈퇴 안내</h2>
  
      <br><br>
      <!-- ✅ 회색 박스 안에 상세 내용 -->
      <div class="withdraw-box">
        <p>
          회원 탈퇴 시 아래 내용이 적용됩니다:
        </p>
        <ul>
          <li>회원님의 계정은 탈퇴 즉시 비활성화됩니다.</li>
          <li>작성하신 리뷰, 찜 목록, 활동 내역은 모두 삭제되며 복구되지 않습니다.</li>
          <li>탈퇴 후 동일 이메일로 재가입은 가능하지만, 이전 정보는 복원되지 않습니다.</li>
        </ul>
      </div>
  
      <!-- ✅ 체크박스 동의 -->
      <label class="checkbox-label">
        <input type="checkbox" v-model="agreed" />
        위 내용을 모두 확인했으며, 동의 후 회원 탈퇴를 진행하겠습니다.
      </label>
  
      <!-- ✅ 버튼들 -->
      <div class="action-buttons">
        <button class="withdraw-btn" :disabled="!agreed" @click="handleWithdraw">회원 탈퇴</button>
        <button class="cancel-btn" @click="goBack">취소</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const agreed = ref(false)
  const router = useRouter()
  
  const handleWithdraw = () => {
  if (confirm('탈퇴를 진행합니다. 정말로 탈퇴하시겠습니까?')) {
    alert('정상적으로 탈퇴 처리되었습니다.')
    router.push('/')
    }
  }

  const goBack = () => {
    router.back()
  }
  </script>
  
  <style scoped>
  .withdraw-wrapper {
    max-width: 700px;
    margin: 60px auto;
    padding: 32px;
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #ddd;
  }
  
  .withdraw-box {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    font-size: 14px;
    line-height: 1.6;
    color: #444;
    margin-bottom: 24px;
  }
  
  .withdraw-box ul {
    margin: 12px 0 0 16px;
    padding: 0;
  }
  
  .withdraw-box li {
    list-style-type: disc;
    margin-bottom: 8px;
  }
  
  .checkbox-label {
    display: block;
    margin-bottom: 24px;
    font-weight: 500;
    color: #333;
  }
  
  .action-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
  }
  
  .withdraw-btn {
    background-color: #e53935;
    color: white;
    padding: 10px 24px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .withdraw-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .cancel-btn {
    background-color: #eee;
    color: #555;
    font-weight: bold;
    padding: 10px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
  </style>
  