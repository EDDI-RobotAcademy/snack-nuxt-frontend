<template>
  <v-app-bar flat color="white" height="64" class="nav-bar">
    <!-- ✅ 로고 -->
    <v-btn @click="goHome" variant="flat" class="logo-container">
      <img src="/images/logo/hungllhomelogo.png" alt="로고" class="logo" />
    </v-btn>

    <!-- ✅ 네비게이션 메뉴 (가운데 정렬) -->
    <div class="nav-center">
      <v-btn
        v-for="(menu, index) in menus"
        :key="index"
        class="nav-btn"
        :class="{ active: activeMenu === menu.label }"
        @click="navigateTo(menu.route)"
        variant="plain"
      >
        {{ menu.label }}
      </v-btn>
      <v-btn
        variant="flat"
        class="nav-btn download-btn"
        @click="showAppDownloadModal = true"
      >
        앱 다운로드
      </v-btn>
    </div>

    <v-spacer />

    <!-- ✅ 로그인/사용자 아이콘 -->
    <v-btn
      v-if="isClient"
      icon
      class="auth-btn"
      @click="handleAuthClick"
    >
      <v-icon :style="{ color: '#FF6F00' }">
        {{ isAuthenticated ? 'mdi-account-circle' : 'mdi-account-circle-outline' }}
      </v-icon>
    </v-btn>

    <!-- ✅ 모달 컴포넌트 -->
    <AppDownloadModal :show="showAppDownloadModal" @update:show="showAppDownloadModal = $event" />
    <UserModal :show="showUserModal" @update:show="showUserModal = $event" @logout="confirmLogout" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppDownloadModal from '@/views/appdown/AppDownloadModal.vue'
import UserModal from '@/views/layout/userModal/userModal.vue'
import { useAuthStore } from '@/store/auth/authStore'

const router = useRouter()
const route = useRoute()

const showAppDownloadModal = ref(false)
const showUserModal = ref(false)
const isClient = ref(false)

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const menus = ref([
  { label: '맛집 찾기', route: '/restaurants/all' },
  { label: '밥 친구 찾기', route: '/board/all' }
])
const activeMenu = ref('') 

const navigateTo = (path: string) => {
  const target = menus.value.find((menu) => menu.route === path)
  if (target) activeMenu.value = target.label
  router.push(path)
}

const goHome = () => {
  router.push('/')
}

const handleAuthClick = () => {
  if (isAuthenticated.value) {
    showUserModal.value = true
  } else {
    router.push('/policy/privacy')
  }
}

const confirmLogout = () => {
  if (confirm('로그아웃하시겠습니까?')) {
    authStore.logout() 
    showUserModal.value = false
    router.push('/')
  }
}

onMounted(() => {
  isClient.value = true

  const current = menus.value.find((m) => route.path.startsWith(m.route))
  if (current) activeMenu.value = current.label
})

watch(() => route.path, (newPath) => {
  const current = menus.value.find((m) => newPath.startsWith(m.route))
  if (current) activeMenu.value = current.label
})
</script>


<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  min-width: 800px;
}

.logo-container {
  padding: 0;
  margin-left: 8px;
  width: 80px;
}

.logo {
  max-width: 80px;
  height: auto;
}

.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 30px;
}

.nav-btn {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  letter-spacing: -0.5px;
  font-size: 16px;
  color: #757575de;
  background-color: transparent;
  text-transform: none;
  padding: 10px 16px;
  font-weight: bold;
  transition: color 0.2s;
}

.nav-btn:hover {
  background-color: transparent !important; /* Vuetify 버튼 배경 제거 */
}

.nav-btn.active {
  color: black;
  font-weight: bold;
}

.download-btn {
  color: #ff6f00;
  font-weight: bold;
  padding: 10px 16px;
  border-radius: 8px;
}

.login-btn {
  background-color: #ffaa00;
  color: white;
  padding: 16px;
  border-radius: 6px;
  font-weight: bold;
  text-transform: none;
}

.login-btn:hover {
  background-color: #ff8a00;
}

.auth-btn {
  color: black;
}
</style>
