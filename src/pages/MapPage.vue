<template>
  <section class="main-wrapper">
    <header class="text-bold text-h5">천안 삼거리 플로깅</header>
    <NaverMapCompoonent />

    <section class="status-bar">
      <div class="status-item">
        <p class="status-number">2.3</p>
        <span>키로미터</span>
      </div>
      <div class="status-time">
        <p>총 경과 시간이 표시될 위치</p>
      </div>
      <div class="status-item">
        <p class="status-number">2.3</p>
        <span>키로미터</span>
      </div>
    </section>

    <section class="bottom_bar">
      <q-btn
        round
        color="green"
        icon="add_a_photo"
        @click="triggerCamera"
        class="camera_button"
      >
        <input
          type="file"
          accept="image/*"
          capture="environment"
          @change="handleFileChange"
          ref="fileInput"
          style="display: none"
        />
      </q-btn>

      <q-btn class="plogging_button" round color="green" label="일시 중지" />
      <q-btn class="plogging_button" round color="green" label="종료" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fileInput = ref<HTMLInputElement | null>(null);

function triggerCamera() {
  if (fileInput.value) {
    fileInput.value?.click();
  }
}

function handleFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const file = files[0];
    console.log('Captured photo:', file);
    // 여기에서 파일을 처리합니다. 예를 들어, 미리보기를 표시하거나 서버로 업로드할 수 있습니다.
  }
}

import NaverMapCompoonent from 'components/NaverMapCompoonent.vue';
</script>

<style scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 추가: 세로 중앙 정렬 */
  align-items: center; /* 확인: 가로 중앙 정렬 */
  padding: 20px; /* 간격 추가 */
  width: 100%; /* 전체 너비 사용 */
}

.bottom_bar,
.status-bar {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 아이템들 세로 중앙 정렬 */
  width: 100%; /* 너비 100%로 설정 */
  margin: 20px 0; /* 상하 여백 추가 */
}

.plogging_button,
.camera_button {
  width: 80px; /* 버튼 너비 */
  height: 80px; /* 버튼 높이 */
  margin: 0 15px; /* 좌우 마진 추가 */
  font-weight: 500;
  font-weight: bold;
}

.status-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 */
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 20px;
  width: 100%; /* 너비 100%로 설정 */
}

.status-item {
  text-align: center;
}

.status-number {
  font-size: 24px;
  font-weight: bold;
}

.status-time {
  text-align: center;
  width: 100%; /* 전체 너비 사용 */
}
</style>
