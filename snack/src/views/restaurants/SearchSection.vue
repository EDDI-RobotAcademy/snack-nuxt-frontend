<template>
    <div class="p-4 bg-white h-full rounded-lg overflow-y-auto">
      <input
        v-model="keyword"
        @keydown.enter="search"
        placeholder="식당명을 검색하세요"
        class="w-full mb-4 p-2 border border-gray-300 rounded"
      />
  
      <h2 class="text-xl font-bold mb-4">맛집 목록 </h2>
  
      <div v-for="r in restaurantStore.restaurants" :key="r.id" class="mb-4 flex items-start gap-3">
        <div class="flex-1">
          <div class="text-lg font-semibold">
            {{ r.name }}
            <span v-if="r.closed" class="text-red-500 text-sm">영업종료</span>
          </div>
          <div class="text-orange-600 text-sm">⭐ {{ r.rating }} / 리뷰 {{ r.reviewCount }}</div>
          <div class="text-gray-500 text-sm">{{ r.address }}</div>
          <div class="flex gap-2 mt-1">
            <button class="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded">
              밥 친구 찾기 ({{ r.friendCount || 0 }})
            </button>
            <button class="bg-orange-300 text-white text-sm px-2 py-1 rounded">
              전화 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRestaurantStore } from '@/store/restaurants/restaurantsStore'
  
  const keyword = ref('')
  const restaurantStore = useRestaurantStore()
  
  restaurantStore.fetchRestaurants()
  
  const search = () => {
    if (keyword.value.trim()) {
      restaurantStore.searchRestaurants(keyword.value.trim())
    }
  }
  </script>
  