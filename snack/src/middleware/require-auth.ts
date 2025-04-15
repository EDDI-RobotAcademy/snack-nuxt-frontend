// middleware/require-auth.ts
export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const token = localStorage.getItem('userToken')
    const accountId = localStorage.getItem('account_id')

    if (!token || !accountId) {
      alert('로그인이 필요합니다.')
      return navigateTo('/')
    }
  }
})
