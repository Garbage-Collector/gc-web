<template>
  <section class="main-wrapper">
    <LottieComponent :animationData="animationData" height="200px" />

    <span class="text-bold text-h6 q-mt-xl">플로깅 기록이 완료되었어요!</span>
    <span class="text-bold text-h6">내 플로깅을 확인해보세요.</span>

    <q-btn
      label="내 플로깅 확인하러 가기"
      color="primary"
      class="text-bold"
      style="margin-top: 16px"
      @click="router.push('/feed')"
    />
  </section>
</template>

<script setup lang="ts">
import animationData from 'src/assets/trash_lottie.json';
import LottieComponent from 'src/components/LottieComponent.vue';

import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped lang="scss">
.main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
}
</style>
