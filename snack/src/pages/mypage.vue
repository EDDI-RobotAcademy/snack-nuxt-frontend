<!-- src/pages/mypage.vue -->
<template>
  <ClientOnly>
    <MyPage v-if="isClientReady" />
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['require-auth'],
})

import { ref, onMounted } from 'vue'
import MyPage from '@/views/mypage/MyPage.vue'

const isClientReady = ref(false)

onMounted(() => {
  isClientReady.value = true
})
</script>
