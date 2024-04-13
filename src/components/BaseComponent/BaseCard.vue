<template>
  <section class="base-card">
    <img :src="photo" :alt="title" class="card-image" />

    <article class="content-wrapper">
      <span class="title">{{ title }}</span>
      <p class="content">{{ content }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// 정의된 props
interface Props {
  photo: string;
  title: string;
  content: string;
}
defineProps<Props>();
</script>

<style scoped>
.base-card {
  border: 1px solid #ccc;
  border-radius: 16px;
  width: 193px;
  height: 203px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
  border: none;
}

.card-image {
  width: 100%;
  height: 65%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.title {
  color: #2c2c2c;
  font-size: 14px;
  font-weight: 500;
}

.content {
  color: #7b7b7b;
  font-size: 12px;
  font-weight: 500;
}
.content-wrapper {
  padding: 8px 16px 8px 8px;
}
</style>
