<!-- layouts/default.vue -->
<template>
  <v-app>
    <NavigationBar />
    <div class="page-content">
      <NuxtPage />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import NavigationBar from '@/views/layout/NavigationBar.vue'
import { useAuthStore } from '~/store/auth/authStore'

onMounted(() => {
  const authStore = useAuthStore()
  authStore.initializeAuth()
})
</script>

<style scoped>
.page-content {
  padding-top: 64px;
}
</style>