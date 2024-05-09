<template>
  <div>
    이미지 첨부 페이지

    <input type="file" @change="handleFileChange" multiple />

    <BaseButton
      class="next-button"
      size="sm"
      color="#50b364"
      text="완료"
      @click="submitImages"
    />
  </div>
</template>

<script setup lang="ts">
import BaseButton from 'components/BaseComponent/BaseButton.vue';
import { usePloggingStore } from 'src/stores/ploggingStore';
import { ref } from 'vue';

const ploggingStore = usePloggingStore();

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const selectedFiles = Array.from(input.files);
    // 이미 선택된 이미지와 새로 선택된 이미지의 총 수를 계산
    const totalImages = images.value.length + selectedFiles.length;
    if (totalImages > 5) {
      alert('최대 5장의 이미지만 업로드할 수 있습니다.');
      return;
    }
    // images 배열에 파일 추가
    images.value.push(...selectedFiles); // 타입이 명확하므로 에러가 발생하지 않아야 함
  }
};

const submitImages = async () => {
  images.value.forEach((image) => {
    ploggingStore.addPloggingImage(image);
  });

  //모은 form 들 post 호출
  await ploggingStore.submitPlogging();
  images.value = []; // 초기화
};
const images = ref<File[]>([]);
</script>

<style scoped></style>
