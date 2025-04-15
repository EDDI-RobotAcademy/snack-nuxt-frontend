<template>
    <v-dialog :model-value="show" @update:model-value="closeModal" max-width="380px">
        <v-card class="modal-card">
            <!-- ✅ 상단 타이틀 + 닫기 버튼 -->
            <v-card-title class="modal-header">
                HUNGLL 앱으로 열기
                <button class="close-btn" @click="closeModal">
                    <v-icon>mdi-close</v-icon>
                </button>
            </v-card-title>

            <v-card-text class="modal-content">
                <p class="qr-title">QR코드</p>
                <p class="qr-description">
                    <br />
                    휴대전화의 카메라 또는 앱으로 QR 코드를 촬영해주세요.
                </p>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import '@/views/appdown/AppDownloadModal.css'

const props = defineProps({ show: Boolean });
const emit = defineEmits(["update:show"]);

const closeModal = () => {
    emit("update:show", false);
};
</script>
