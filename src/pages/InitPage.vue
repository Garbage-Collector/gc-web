<template>
  <q-page>
    <q-dialog v-model="loading">
      <q-card>
        <q-card-section class="column items-center">
          <q-spinner size="50px" color="primary" />
          <span class="q-ml-sm" style="display: block">로그인 성공</span>
          <span class="q-ml-sm" style="display: block"
            >사용자 데이터 로딩 중...</span
          >
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- 실제 콘텐츠 -->
    <div></div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
import { usePloggingStore } from 'src/stores/ploggingStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSharedPloggingStore } from 'stores/sharedPloggingStore';

const router = useRouter();
const loading = ref(true);

const ploggingStore = usePloggingStore();
const sharedPloggingStore = useSharedPloggingStore();
const authStore = useAuthStore();
onMounted(async () => {
  try {
    await ploggingStore.getPloggingRecord();
    await sharedPloggingStore.getSharedPloggingRecord();
    await authStore.refreshToken();
  } finally {
    setTimeout(() => {
      loading.value = false; // 로딩 완료 후 모달 닫기
      router.push('/home');
    }, 1500);
  }
});
</script>

<style scoped></style>
