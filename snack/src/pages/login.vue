<script setup lang="ts">
definePageMeta({
  middleware: 'require-agreement'
})

import AccountLoginPage from '@/views/login/AccountLoginPage.vue'
</script>

<template>
  <AccountLoginPage />
</template>
