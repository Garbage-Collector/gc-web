<template>
  <div class="container">
    <h3>피드 수정 페이지</h3>
    <p>게시글 아이디 === {{ route.params.id }}</p>

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
      <div v-for="(image, index) in images" :key="index" class="image-preview">
        <q-img :src="image.imageUrl" :alt="'image-' + index" />
      </div>
      <div class="upload-section">
        <q-btn
          @click="triggerFileInput"
          label="Upload New Image"
          color="secondary"
        />
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="handleFileChange"
          style="display: none"
        />
      </div>
      <q-btn type="submit" label="Update Record" color="primary" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import { useProfileStore } from 'src/stores/profileStore';

const route = useRoute();
const profileStore = useProfileStore();

const title = ref('');
const location = ref('');
const startTime = ref('');
const endTime = ref('');
const content = ref('');
const images = ref([]);
const newImages = ref([]);

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

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      newImages.value.push(files[i]);
    }
  }
};

const updateRecord = async () => {
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
      alert('Record updated successfully');
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

.image-preview {
  margin-bottom: 10px;
}

.upload-section {
  margin-bottom: 10px;
}
</style>
