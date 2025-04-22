<!-- UploadSection.vue -->
<template>
  <div class="upload-section-card">
    <h2 class="section-title">📸 모임 정보</h2>

    <!-- 썸네일 업로드 -->
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

    <!-- 날짜 선택 -->
    <div class="input-wrapper">
      <label class="input-label">모임 날짜</label>
      <input class="search-input" :value="datetime" readonly placeholder="날짜 선택" @click="calendarRef?.open()" />
      <HungllDatePicker ref="calendarRef" v-model="datetime" />
    </div>

    <!-- 맛집 장소 -->
    <div class="input-wrapper">
      <label class="input-label">맛집 장소</label>
      <v-autocomplete
        v-model="selectedRestaurant"
        :items="restaurantList"
        item-text="name"
        item-value="id"
        placeholder="맛집 검색"
        hide-details
        clearable
        density="comfortable"
        variant="solo"
        rounded
        class="search-input"
        :loading="loadingRestaurants"
        @update:search-input="onSearchRestaurant"
      />
    </div>

    <div class="divider" />

    <!-- 등록/취소 버튼 -->
    <div class="button-flex-wrapper">
      <button class="btn primary" :disabled="loading" @click="submitBoard">
        {{ loading ? '등록 중...' : '등록' }}
      </button>
      <button class="btn grey" @click="goBack">취소</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HungllDatePicker from '@/common/components/HungllDatePicker.vue'
import { useBoardCreateStore } from '@/store/board/boardCreateStore'

interface Restaurant {
  id: number
  name: string
}

const router = useRouter()
const boardStore = useBoardCreateStore()

const previewImage = ref('')
const thumbnail = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const datetime = ref('')
const calendarRef = ref()

const selectedRestaurant = ref<Restaurant | null>(null)
const restaurantList = ref<Restaurant[]>([])
const loadingRestaurants = ref(false)
const loading = ref(false)

const triggerFileInput = () => fileInput.value?.click()

const handleImageUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  thumbnail.value = file
  const reader = new FileReader()
  reader.onload = (e) => (previewImage.value = e.target?.result as string)
  reader.readAsDataURL(file)
}

const removeImage = () => {
  thumbnail.value = null
  previewImage.value = ''
}

const onSearchRestaurant = async (query: string) => {
  if (!query) return
  loadingRestaurants.value = true
  try {
    const res = await fetch(`/api/restaurants?keyword=${query}`)
    const data = await res.json()
    restaurantList.value = data.results
  } catch (error) {
    console.error('맛집 검색 실패:', error)
  } finally {
    loadingRestaurants.value = false
  }
}

const submitBoard = async () => {
  const token = localStorage.getItem('userToken')
  const accountId = localStorage.getItem('account_id')
  if (!token || !accountId) {
    alert('로그인 후 이용해주세요')
    return
  }

  try {
    loading.value = true
    await boardStore.requestCreateBoard({
      title: boardStore.title,
      content: boardStore.content,
      image: thumbnail.value ?? undefined,
      end_time: datetime.value || new Date().toISOString(),
      restaurant_id: selectedRestaurant.value?.id ?? undefined,
      author_id: parseInt(accountId),
    })
    alert('게시글이 등록되었습니다.')
    router.push('/board/all')
  } catch (error) {
    alert('유지보수 중입니다.잠시만 기다려주세요.')
    console.error('❌ 게시글 등록 실패:', error)
  } finally {
    loading.value = false
  }
}

const goBack = () => router.push('/board/all')
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
.input-wrapper {
  justify-content: center;
  text-align: center;
}

.thumbnail-box,
.image-preview {
  margin: 0 auto;
}

</style>
