<template>
  <p class="text-bold text-h5">플로깅 기록하기</p>
  <NaverMapCompoonent />
  <q-btn round color="secondary" icon="add_a_photo" @click="triggerCamera"/>
  <input type="file" accept="image/*" capture="environment" @change="handleFileChange" ref="fileInput" style="display: none;">
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fileInput =ref<HTMLInputElement | null>(null);

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

</style>
