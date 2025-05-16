<template>
  <div class="upload-section-card">
    <h2 class="section-title">📸 모임 정보</h2>

    <!-- 이미지 -->
    <div class="input-wrapper">
      <label class="input-label">이미지 업로드</label>
      <div class="thumbnail-box" v-if="!previewImage" @click="triggerFileInput">
        <span class="thumbnail-placeholder">썸네일을 업로드 해주세요</span>
      </div>
      <div class="image-preview" v-else>
        <img :src="previewImage" alt="Preview" />
        <button class="btn grey small" @click="removeImage">삭제</button>
      </div>
      <input ref="fileInput" type="file" class="hidden-file-input" @change="handleImageUpload" accept="image/*" />
    </div>

    <!-- 날짜 -->
    <div class="input-wrapper">
      <label class="input-label">
        모임 날짜
        <span v-if="isDateInvalid" style="color: red; font-size: 12px; margin-left: 8px">* 필수항목</span>
      </label>
      <input class="search-input" :value="date" readonly placeholder="날짜 선택" @click="calendarRef?.open()" />
      <HungllDatePicker ref="calendarRef" v-model="date" />
    </div>

    <!-- 시간 -->
    <div class="input-wrapper">
      <label class="input-label">
        모임 시간
        <span v-if="isTimeInvalid" style="color: red; font-size: 12px; margin-left: 8px">* 필수항목</span>
      </label>
      <div style="display: flex; gap: 8px">
        <select v-model="selectedHour" class="search-input" style="flex: 1">
          <option v-for="hour in 24" :key="hour" :value="String(hour).padStart(2, '0')">
            {{ String(hour).padStart(2, '0') }}
          </option>
        </select>
        <span style="align-self: center">:</span>
        <select v-model="selectedMinute" class="search-input" style="flex: 1">
          <option v-for="minute in minuteSteps" :key="minute" :value="String(minute).padStart(2, '0')">
            {{ String(minute).padStart(2, '0') }}
          </option>
        </select>
      </div>
    </div>

    <!-- 맛집 장소 -->
    <div class="input-wrapper">
      <label class="input-label">맛집 장소</label>
      <v-autocomplete
        v-model="boardStore.restaurant_id"
        :items="boardStore.restaurantList"
        item-title="name"
        item-value="id"
        placeholder="맛집 검색"
        hide-details
        clearable
        density="comfortable"
        class="restaurant-input"
        :loading="loadingRestaurants"
        :menu-props="{ offsetY: true }"
        @update:search-input="onSearchRestaurant"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import HungllDatePicker from '@/common/components/HungllDatePicker.vue'
import { uploadImageToS3 } from '@/common/utils/awsS3Instance'
import type { useBoardCreateStore } from '@/store/board/boardCreateStore'

const props = defineProps<{ boardStore: ReturnType<typeof useBoardCreateStore>, isDateInvalid: boolean, isTimeInvalid: boolean }>()
const boardStore = props.boardStore

const previewImage = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const date = ref('')
const selectedHour = ref('12')
const selectedMinute = ref('00')
const calendarRef = ref()
const loadingRestaurants = ref(false)
const minuteSteps = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

const datetime = computed(() => {
  if (!date.value) return ''
  return `${date.value}T${selectedHour.value}:${selectedMinute.value}:00`
})

watch([date, selectedHour, selectedMinute], () => {
  boardStore.end_time = datetime.value
})

const triggerFileInput = () => fileInput.value?.click()

const handleImageUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  boardStore.image_file = file
  const url = await uploadImageToS3(file)
  boardStore.image_url = url
  const reader = new FileReader()
  reader.onload = (e) => (previewImage.value = e.target?.result as string)
  reader.readAsDataURL(file)
}

const removeImage = () => {
  boardStore.image_file = null
  boardStore.image_url = ""
  previewImage.value = ''
}

const onSearchRestaurant = async (query: string) => {
  boardStore.restaurantSearchKeyword = query
  await boardStore.searchRestaurantList()
}

onMounted(() => {
  boardStore.loadAllRestaurants()
})
</script>

<style scoped>
.upload-section-card {
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  transition: 0.3s ease;
  border: 1px solid #f2f2f2;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ff7043;
}

.input-wrapper {
  margin-bottom: 16px;
  flex: 1;
  justify-content: center;
  text-align: center;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  transition: 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #ff7043;
  box-shadow: 0 0 0 2px rgba(255, 112, 67, 0.2);
}

.thumbnail-box {
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1 / 1;
  border: 2px dashed #ff7043;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7043;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  background: #fffaf5;
  transition: 0.2s;
}

.thumbnail-box:hover {
  background: #fff3eb;
}

.thumbnail-placeholder {
  pointer-events: none;
}

.image-preview {
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1 / 1;
  position: relative;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 8px;
}

.hidden-file-input {
  display: none;
}

.divider {
  border-top: 1px solid #f2f2f2;
  margin: 20px 0;
}

.btn {
  width: 100%;
  padding: 12px;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  margin-bottom: 12px;
  transition: 0.2s;
  font-size: 15px;
}

.btn.primary {
  background-color: #ff7043;
  color: white;
}

.btn.primary:hover {
  background-color: #ff5722;
}

.btn.grey {
  background-color: #eeeeee;
  color: #555;
}

.btn.grey:hover {
  background-color: #e0e0e0;
}

.btn.grey.small {
  width: auto;
  padding: 6px 12px;
  font-size: 13px;
}

.button-flex-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 768px) {
  .button-flex-wrapper {
    flex-direction: row;
  }

  .button-flex-wrapper .btn {
    width: 100%;
  }
}

.thumbnail-box,
.image-preview {
  margin: 0 auto;
}

.restaurant-input .v-field {
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
  padding-left: 0 !important;
}

.restaurant-input .v-input__control {
  padding: 0 !important;
}

.restaurant-input input {
  font-size: 14px;
}
</style>
