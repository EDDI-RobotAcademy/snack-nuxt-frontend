<template>
  <div class="login-wrapper">
    <div class="login-container">
      <!-- ✅ 말풍선 -->
      <SpeechBubble text="⚡ 3초만에 빠른 회원가입" />
      <KakaoLoginButton @login="() => handleLogin('kakao')" />
<NaverLoginButton @login="() => handleLogin('naver')" />
<GoogleLoginButton @login="() => handleLogin('google')" />
<GithubLoginButton @login="() => handleLogin('github')" />

      <div class="bottom-buttons">
        <p class="back-text" @click="goToHome">돌아가기</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"> 
import { useRouter } from "vue-router";
import { ref } from "vue";
import SpeechBubble from "./components/SpeechBubble.vue";
import "./AccountLoginPage.css";
import GoogleLoginButton from './components/GoogleLoginButton.vue'
import GithubLoginButton from './components/GithubLoginButton.vue'
import NaverLoginButton from "./components/NaverLoginButton.vue";
import KakaoLoginButton from "./components/KakaoLoginButton.vue";
import type { Provider } from '@/store/auth/authStore' 

const router = useRouter();

import { useAuthStore } from '@/store/auth/authStore'
const authStore = useAuthStore()

const handleLogin = (provider: Provider) => {
  authStore.login(provider)
}


const goToHome = () => {
  router.push("/");
};
</script>
