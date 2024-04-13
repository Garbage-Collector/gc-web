<template>
  <div>
    이미지 첨부 페이지
    <BaseButton
      class="next-button"
      size="sm"
      color="#50b364"
      text="완료"
      @click="router.push('/write-end')"
    />
  </div>
</template>

<script setup lang="ts">
import BaseButton from 'components/BaseComponent/BaseButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped></style>
