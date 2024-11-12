<template>
  <div class="container">
    <h3 class="text-bold text-h5 q-mt-xl">플로깅 기록 수정</h3>
    <q-form @submit.prevent="updateRecord" class="form-container">
      <q-input v-model="title" label="Title" outlined />
      <q-input v-model="location" label="Location" outlined />
      <q-input
        v-model="startTime"
        label="Start Time"
        type="datetime-local"
        outlined
      />
      <q-input
        v-model="endTime"
        label="End Time"
        type="datetime-local"
        outlined
      />
      <q-input v-model="content" label="Content" type="textarea" outlined />

      <!-- 새로 업로드한 이미지 미리보기 -->
      <div class="image-container">
        <div
          v-for="(image, index) in newImagesPreview"
          :key="'new-' + index"
          class="image-preview"
        >
          <q-img :src="image" :alt="'new-image-' + index" />
        </div>
      </div>

      <div class="upload-section">
        <q-btn
          @click="triggerFileInput"
          label="Upload New Image"
          color="primary"
        />
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="handleFileChange"
          multiple
          style="display: none"
        />
      </div>
      <q-btn type="submit" label="수정하기" color="primary" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { useProfileStore } from 'src/stores/profileStore';
import { useQuasar } from 'quasar';

const route = useRoute();
const profileStore = useProfileStore();
const $q = useQuasar();
const router = useRouter();

const title = ref('');
const location = ref('');
const startTime = ref('');
const endTime = ref('');
const content = ref('');
const images = ref([]); // 기존 이미지
const newImages = ref([]); // 새로 업로드된 이미지 파일
const newImagesPreview = ref([]); // 새로 업로드된 이미지의 미리보기 URL

const fileInput = ref(null);

onMounted(async () => {
  const userId = profileStore.profile.id;
  const recordId = route.params.id;
  try {
    const response = await api.get(`/records/${userId}/${recordId}`);
    const record = response.data;
    title.value = record.title;
    location.value = record.location;
    startTime.value = record.startTime.split('-').join('T');
    endTime.value = record.endTime.split('-').join('T');
    content.value = record.content;
    images.value = record.image;
  } catch (error) {
    console.error('Error fetching record:', error);
  }
});

const triggerFileInput = () => {
  fileInput.value.click();
};

const resizeImage = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800; // 최대 너비를 800px로 제한
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          },
          'image/jpeg',
          0.7, // 이미지 품질 (0.1 ~ 1.0)
        );
      };
      img.src = event.target.result as string;
    };
    reader.readAsDataURL(file);
  });
};

const handleFileChange = async (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const resizedImage = await resizeImage(file); // 리사이즈된 이미지를 생성
      newImages.value.push(resizedImage);

      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        newImagesPreview.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
};

const updateRecord = async () => {
  if (newImages.value.length === 0) {
    $q.notify({
      message: '사진을 최소 한 장 이상 업로드 해주세요.',
      type: 'negative',
      position: 'center',
      timeout: 500,
    });
    return;
  }

  const recordId = route.params.id;
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('location', location.value);
  formData.append('startTime', startTime.value.split('T').join('-'));
  formData.append('endTime', endTime.value.split('T').join('-'));
  formData.append('content', content.value);

  newImages.value.forEach((file) => {
    formData.append('images', file);
  });

  try {
    const response = await api.put(`/records/${recordId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      $q.notify({
        message: '수정 되었습니다.',
        type: 'positive',
        position: 'center',
        timeout: 500,
      });
      router.push('/feed');
    }
  } catch (error) {
    console.error('Error updating record:', error);
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Container to arrange images in a row with some gap */
.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 0px;
}

.image-preview {
  width: 80px; /* Set to desired thumbnail width */
  height: 80px; /* Set to desired thumbnail height */
  border-radius: 4px;
  overflow: hidden;

  /* Styling for individual image elements */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures images maintain aspect ratio within the set dimensions */
  }
}

.upload-section {
  margin-bottom: 10px;
}
</style>
