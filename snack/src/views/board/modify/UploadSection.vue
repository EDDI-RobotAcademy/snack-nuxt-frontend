<template>
  <div class="upload-section-card">
    <h2 class="section-title">📸 모임 정보 수정</h2>

    <!-- 썸네일 업로드 -->
    <div class="input-wrapper">
      <label class="input-label">이미지 업로드</label>
      <div v-if="previewImage" class="image-preview">
        <img :src="previewImage" alt="Preview" />
        <button class="btn grey small" @click="removeImage">삭제</button>
      </div>
      <div class="thumbnail-box" v-else @click="triggerFileInput">
        <span class="thumbnail-placeholder">썸네일을 업로드 해주세요</span>
      </div>
      <input ref="fileInput" type="file" class="hidden-file-input" @change="handleImageUpload" accept="image/*" />
    </div>

    <!-- 날짜 선택 -->
    <div class="input-wrapper">
      <label class="input-label">
        모임 날짜
        <span v-if="props.isDateInvalid" style="color: red; font-size: 12px; margin-left: 8px">* 필수항목</span>
      </label>
      <input class="search-input" :value="localDate" readonly placeholder="날짜 선택" @click="calendarRef?.open()" />
      <HungllDatePicker ref="calendarRef" v-model="localDate" />
    </div>

    <!-- 시간 선택 -->
    <div class="input-wrapper">
      <label class="input-label">
        모임 시간
        <span v-if="props.isTimeInvalid" style="color: red; font-size: 12px; margin-left: 8px">* 필수항목</span>
      </label>
      <div class="time-select-row">
        <select v-model="selectedHour" class="search-input">
          <option v-for="h in 24" :key="h" :value="String(h).padStart(2, '0')">
            {{ String(h).padStart(2, '0') }}시
          </option>
        </select>
        <select v-model="selectedMinute" class="search-input">
          <option v-for="m in minuteSteps" :key="m" :value="String(m).padStart(2, '0')">
            {{ String(m).padStart(2, '0') }}분
          </option>
        </select>
      </div>
    </div>

    <!-- 맛집 장소 -->
    <div class="input-wrapper">
      <label class="input-label">맛집 장소</label>
      <v-autocomplete
        v-model="boardStore.board.restaurant_id"
        :items="boardStore.restaurantList"
        item-title="name"
        item-value="id"
        placeholder="맛집 검색"
        hide-details
        clearable
        density="comfortable"
        class="restaurant-input"
        :loading="loadingRestaurants"
        @update:search-input="onSearchRestaurant"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useBoardModifyStore } from '@/store/board/boardModifyStore'
import { uploadImageToS3 } from '@/common/utils/awsS3Instance'
import HungllDatePicker from '@/common/components/HungllDatePicker.vue'

const props = defineProps<{ isDateInvalid: boolean; isTimeInvalid: boolean }>()

const boardStore = useBoardModifyStore()

const previewImage = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const calendarRef = ref()
const localDate = ref('')
const selectedHour = ref('12')
const selectedMinute = ref('00')
const loadingRestaurants = ref(false)
const minuteSteps = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

watch(
  () => boardStore.board.end_time,
  (newVal) => {
    if (!newVal) return
    const hasT = newVal.includes('T')
    const dateStr = hasT ? newVal.split('T')[0] : newVal.split(' ')[0]
    localDate.value = dateStr
    let timeStr = hasT ? newVal.split('T')[1] : newVal.split(' ')[1]
    if (timeStr) {
      const [h, m] = timeStr.split(':')
      selectedHour.value = h
      selectedMinute.value = m
    }
  },
  { immediate: true }
)

watch([localDate, selectedHour, selectedMinute], () => {
  boardStore.board.end_time = `${localDate.value}T${selectedHour.value}:${selectedMinute.value}:00`
})

const triggerFileInput = () => fileInput.value?.click()

const handleImageUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const url = await uploadImageToS3(file, boardStore.board.image_url || undefined)
  boardStore.board.image_url = url
  boardStore.board.image_file = file

  const reader = new FileReader()
  reader.onload = (e) => (previewImage.value = e.target?.result as string)
  reader.readAsDataURL(file)
}

const removeImage = () => {
  boardStore.board.image_file = null
  boardStore.board.image_url = null
  boardStore.board.previous_image_url = null
  previewImage.value = ''
}

const onSearchRestaurant = async (query: string) => {
  boardStore.restaurantSearchKeyword = query
  loadingRestaurants.value = true
  await boardStore.searchRestaurantList()
  loadingRestaurants.value = false
}

watch(
  () => boardStore.board.image_url,
  (newVal) => {
    previewImage.value = newVal || ''
  },
  { immediate: true }
)

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
}
.input-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}
.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
}
.time-select-row {
  display: flex;
  gap: 8px;
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
  cursor: pointer;
  background: #fffaf5;
}
.thumbnail-box:hover {
  background: #fff3eb;
}
.thumbnail-placeholder {
  pointer-events: none;
}
.image-preview {
  max-width: 280px;
  aspect-ratio: 1 / 1;
  margin-bottom: 10px;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
.hidden-file-input {
  display: none;
}
.btn.grey.small {
  font-size: 13px;
  padding: 6px 12px;
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
