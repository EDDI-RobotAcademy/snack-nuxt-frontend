import { useRuntimeConfig } from 'nuxt/app'
import { createAxiosInstance } from '@/common/utils/axiosInstance'

export const accountRepository = {
  async getProfileInfo() {
    const config = useRuntimeConfig()
    const token = localStorage.getItem('userToken') || ''
    const accountId = localStorage.getItem('account_id') || ''

    const axios = createAxiosInstance(config.public.MAIN_API_URL, token, accountId)
    const { data } = await axios.get('/account-profile/get')
    return data
  }
}
