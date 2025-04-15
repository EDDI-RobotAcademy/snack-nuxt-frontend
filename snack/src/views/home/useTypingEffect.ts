import { ref, onMounted } from "vue";

export function useTypingEffect(words: string[]) {
    const displayedText = ref("");
    let currentWordIndex = 0;
    let isDeleting = false;
    let charIndex = 0;

    const typeEffect = () => {
        const currentWord = words[currentWordIndex];

        if (isDeleting) {
            displayedText.value = currentWord.substring(0, charIndex--);
        } else {
            displayedText.value = currentWord.substring(0, charIndex++);
        }

        let speed = isDeleting ? 100 : 150;
        if (!isDeleting && charIndex === currentWord.length) {
            speed = 1000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, speed);
    };

    onMounted(() => {
        typeEffect();
    });

    return { displayedText };
}
