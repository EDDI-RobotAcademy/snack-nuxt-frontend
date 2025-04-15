// middleware/require-agreement.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const agreed = process.client && sessionStorage.getItem('agreed') === 'true'
  
    if (to.path === '/login' && !agreed) {
      return navigateTo('/policy/privacy')
    }
  })
  