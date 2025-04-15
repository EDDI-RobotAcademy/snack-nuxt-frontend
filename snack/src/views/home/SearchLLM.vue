<template>
  <div class="search-container" :class="{ 'expanded': isExpanded }" @click.stop>
      <!-- ✅ 왼쪽 드롭다운 메뉴 -->
      <div class="category-dropdown">
          <button @click="toggleDropdown" class="category-btn">
              {{ selectedCategory }}
              <v-icon size="18">mdi-chevron-down</v-icon>
          </button>
          <ul v-if="dropdownOpen" class="dropdown-menu">
              <li v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">
                  {{ category }}
              </li>
          </ul>
      </div>

      <!-- ✅ 검색 입력창 -->
      <input
          type="text"
          v-model="searchQuery"
          class="search-input"
          placeholder="무엇을 찾고 계신가요?"
          @focus="expandSearch"
      />

      <!-- ✅ 오른쪽 검색 버튼 (대화 아이콘 + 주황색 배경) -->
      <button class="search-btn" @click="search">
          <v-icon size="18">mdi-chat</v-icon>
      </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const searchQuery = ref("");
const categories = ref(["맛집", "동네친구"]);
const selectedCategory = ref("맛집");
const dropdownOpen = ref(false);
const isExpanded = ref(false);

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  dropdownOpen.value = false;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const expandSearch = () => {
  isExpanded.value = true;
};

const collapseSearch = () => {
  isExpanded.value = false;
};

const search = () => {
  console.log("검색 실행: ", searchQuery.value);
};

/* ✅ 바깥 클릭 감지해서 검색창 축소 */
onMounted(() => {
  document.addEventListener("click", collapseSearch);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", collapseSearch);
});
</script>

<style scoped>
/* ✅ 검색창 전체 컨테이너 */
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 5px 10px;
  background: white;
  width: 500px;
  max-width: 700px;
  transition: width 0.3s ease-in-out;
}

/* ✅ 마우스를 올리면 확장 */
.search-container:hover {
  width: 700px;
}

/* ✅ 클릭(포커스) 시 확장 유지 */
.search-container.expanded {
  width: 700px;
}

/* ✅ 드롭다운 버튼 */
.category-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0; /* ✅ 크기가 줄어들지 않도록 설정 */
}

.category-btn {
  background: transparent;
  border: none;
  color: #555;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 5px 10px; /* ✅ 좌우 10px 여백 유지 */
  min-width: fit-content;
  white-space: nowrap; /* ✅ 글자가 줄바꿈되지 않도록 설정 */
}

/* ✅ 드롭다운 메뉴 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 5px 0;
  margin: 0;
  width: 120px;
}

.dropdown-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background: #f5f5f5;
}

/* ✅ 검색 입력창 */
.search-input {
  border: none;
  outline: none;
  padding: 8px 12px;
  font-size: 16px;
  flex-grow: 1;
  transition: width 0.3s ease-in-out;
  width: 100%;
}

/* ✅ 검색 버튼 (대화 아이콘 + 주황색 배경) */
.search-btn {
  background: #E76200; /* ✅ 주황색 적용 */
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0; /* ✅ 크기 유지 */
}
</style>
