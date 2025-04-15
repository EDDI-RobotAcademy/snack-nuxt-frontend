<template>
  <div class="home-wrapper">
    <div class="content">
      <TypingEffect />
      <SearchLLM />
    </div>

    <footer class="footer">
      <v-divider />
      <p>&copy; 2025 SNACK. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import TypingEffect from '@/views/home/TypingEffect.vue'
import SearchLLM from './SearchLLM.vue'
</script>

<style scoped>
.home-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content {
  margin-top: 300px; /* 중앙 기준 위에서 약간 올라가도록 */
  text-align: center;
}

.footer {
  margin-top: auto;
  padding-bottom: 20px;
  text-align: center;
}
</style>
