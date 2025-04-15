import { defineStore } from 'pinia'
import { authRepository } from '@/repository/auth/authRepository'
import { useRouter } from 'vue-router'
import { useAccountStore } from '../account/accountStore'
import { accountRepository } from '~/repository/account/accountRepository'

export type Provider = 'kakao' | 'naver' | 'google' | 'github'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    provider: '' as Provider | '',
  }),

  actions: {
    async login(provider: Provider) {
      try {
        const loginUrl = await authRepository.getLoginUrl(provider)
        this.provider = provider
        sessionStorage.setItem('provider', provider)
        window.location.href = loginUrl
      } catch (error) {
        alert(`🔴 ${provider} 로그인 URL 요청 실패`)
        console.error(error)
      }
    },

async handleOAuthRedirect(router: ReturnType<typeof useRouter>, provider: Provider, code: string) {
  try {
    const { userToken, accountId } = await authRepository.getAccessToken(provider, code)

    if (!userToken || !accountId) {
      throw new Error('토큰 또는 계정 정보 누락')
    }

    localStorage.setItem('userToken', userToken)
    localStorage.setItem('account_id', accountId)
    this.isAuthenticated = true
    this.provider = provider

    const accountStore = useAccountStore()
    const profile = await accountRepository.getProfileInfo()
    accountStore.setProfile(profile)

    const statusCode = Number(localStorage.getItem('login_status')) || 200

    if (statusCode === 200) {
      router.push('/')
    } else if (statusCode === 201) {
      router.push('/prefer')
    } else if (statusCode === 409) {
      alert('이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.')
      sessionStorage.removeItem('provider')
      router.push('/policy/privacy')
    } else {
      router.push('/')
    }
  } catch (error) {
    alert('OAuth 로그인 처리 중 문제가 발생했습니다.')
    router.push('/policy/privacy')
    console.error(error)
  }
}
,
    logout() {
      const token = localStorage.getItem('userToken')
      if (!token || !this.provider) return

      authRepository.logout(this.provider, token)
      localStorage.removeItem('userToken')
      localStorage.removeItem('account_id')
      this.isAuthenticated = false
      this.provider = ''
    },

    async validateToken(): Promise<boolean> {
      const token = localStorage.getItem('userToken')
      if (!token) return false

      const valid = await authRepository.validateToken(token)
      this.isAuthenticated = valid
      return valid
    },

    async initializeAuth() {
      const token = localStorage.getItem('userToken')
      if (!token) return

      const valid = await this.validateToken()
      if (valid) {
        this.isAuthenticated = true
        this.provider = sessionStorage.getItem('provider') as Provider || ''
      } else {
        this.logout()
      }
    },
  },
})
