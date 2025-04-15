<template>
    <div></div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useAuthStore } from '@/store/auth/authStore'
  import type { Provider } from '@/store/auth/authStore'
  
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  
  const getProviderFromPath = (path: string): Provider => {
    if (path.includes('kakao')) return 'kakao'
    if (path.includes('naver')) return 'naver'
    if (path.includes('google')) return 'google'
    if (path.includes('github')) return 'github'
    throw new Error('잘못된 로그인 요청입니다.')
  }
  
  const setRedirectAuthData = async () => {
    const code = route.query.code as string
  
    try {
      const provider = getProviderFromPath(route.path)
      await authStore.handleOAuthRedirect(router, provider, code)
    } catch (error) {
      console.error(`OAuth 로그인 중 오류 발생:`, error)
      router.push('/account/login')
    }
  }
  
  onMounted(setRedirectAuthData)
  </script>
  