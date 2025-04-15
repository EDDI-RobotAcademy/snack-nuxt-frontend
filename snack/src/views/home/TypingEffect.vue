<script setup lang="ts">
import { useTypingEffect } from '@/views/home/useTypingEffect'

const words = ["맛집을 ", "밥 친구를 ", "무엇을 "];

const { displayedText } = useTypingEffect(words);
</script>

<template>
    <div class="text-section">
        <h2>
            <span style="color: #E76200" class="typing-text">{{ displayedText }}</span>
            찾고 계신가요?
        </h2>
    </div>
</template>

<style scoped>
.text-section {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}
.typing-text::after {
    content: "|";
    display: inline-block;
    animation: blink 0.7s infinite;
}
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
</style>
