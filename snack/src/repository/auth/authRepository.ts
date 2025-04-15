import { useRuntimeConfig } from 'nuxt/app'
import { createAxiosInstance } from '@/common/utils/axiosInstance'
import type { Provider } from '@/store/auth/authStore'

const getAxios = () => {
  const config = useRuntimeConfig()
  const token = localStorage.getItem('userToken') || ''
  const accountId = localStorage.getItem('account_id') || ''

  return createAxiosInstance(config.public.MAIN_API_URL, token, accountId)
}

export const authRepository = {
  async getLoginUrl(provider: Provider): Promise<string> {
    const response = await getAxios().get(`/${provider}-oauth/request-login-url`)
    return response.data.url
  },

  async getAccessToken(provider: Provider, code: string) {
    const response = await getAxios().post(`/${provider}-oauth/redirect-access-token`, { code })
    const userToken = response.headers['usertoken'] || response.data.userToken
    const accountId = response.headers['account_id'] || response.data.account_id

    if (!userToken || !accountId) {
      throw new Error('로그인 응답에 필요한 정보가 없습니다.')
    }

    return { userToken, accountId }
  },

  async logout(provider: Provider, userToken: string) {
    await getAxios().post(`/authentication/${provider}-logout`, { userToken })
    localStorage.removeItem('userToken')
    localStorage.removeItem('account_id')
  },

  async validateToken(userToken: string): Promise<boolean> {
    const response = await getAxios().post('/authentication/validation', { userToken })
    return !!response.data?.valid
  },

  // ✅ 여기가 탈퇴 API 부분이야
  async deactivateAccount(accountId: string) {
    try {
      const response = await getAxios().post('/delete-account/account/deactivate/', {
        account_id: accountId,
      })
      return response.data
    } catch (error) {
      console.error('🔴 계정 비활성화 실패:', error)
      throw error
    }
  },
}
