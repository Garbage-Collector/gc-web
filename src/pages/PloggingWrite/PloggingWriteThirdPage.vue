<template>
  <section class="main-wrapper">
    <q-btn
      padding="sm"
      color="green"
      round
      icon="chevron_left"
      @click="router.back()"
    />
    <p class="text-bold text-h5 q-mt-xl" style="margin-top: 20px">플로깅 기록 작성</p>
    <div class="flex column q-mb-lg">
      <span class="text-grey-6">내가 한 플로깅을 기록으로 남겨보세요!</span>
    </div>

    <div class="img-wrapper">
      <input
        type="file"
        @change="handleFileChange"
        multiple
        class="file-input"
        id="upload-image"
      />
      <BaseIcon icon="addBox" class="add-box" />
      <div class="img-text">플로깅을 기록할 사진을 선택해주세요!</div>
    </div>

    <div v-if="images.length > 0" class="preview-wrapper">
      <div v-for="(image, index) in images" :key="index" class="preview-image">
        <img :src="image.preview" alt="Preview Image" />
      </div>
    </div>

    <BaseButton
      class="next-button"
      size="sm"
      color="#50b364"
      text="완료"
      @click="submitImages"
    />

    <!-- Dialog 컴포넌트 -->
    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">알림</div>
        </q-card-section>

        <q-card-section>
          <p>사진을 1장 이상 업로드해주세요.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="확인" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/BaseComponent/BaseButton.vue';
import BaseIcon from 'src/components/BaseComponent/BaseIcon.vue';
import { usePloggingStore } from 'src/stores/ploggingStore';

const ploggingStore = usePloggingStore();
const router = useRouter();
const images = ref<{ file: File; preview: string }[]>([]);
const dialogVisible = ref(false);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const selectedFiles = Array.from(input.files);
    const totalImages = images.value.length + selectedFiles.length;
    if (totalImages > 5) {
      alert('최대 5장의 이미지만 업로드할 수 있습니다.');
      return;
    }
    selectedFiles.slice(0, 5 - images.value.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        images.value.push({ file, preview: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    });
  }
};

const submitImages = async () => {
  if (images.value.length === 0) {
    dialogVisible.value = true;
    return;
  }

  images.value.forEach(({ file }) => {
    console.log('페이지에서 이미지 값', file);
    ploggingStore.addPloggingImage(file);
  });

  await ploggingStore.submitPlogging().then(() => {
    router.push('/write-end');
  });

  images.value = []; // 초기화
};
</script>

<style scoped>
.main-wrapper {
  padding: 48px 24px;
}

.img-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 310px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 24px;
  position: relative;
  background-image: url('../../assets/plogging-record-background.png');
  background-repeat: round;
}
.add-box {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}
.img-text {
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.preview-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
.preview-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
.next-button {
  margin-top: 24px;
  position: absolute;
  right: 24px;
}
</style>
