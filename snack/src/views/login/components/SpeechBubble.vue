<template>
    <div class="speech-bubble">
      {{ text }}
    </div>
  </template>
  
  <script setup>
  defineProps({ text: String });
  </script>
  
  <style scoped>
  .speech-bubble {
    display: inline-block;
    background: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    border: 1px solid #ddd;
    position: relative;
    margin-bottom: 20px;
  }
  </style>
  