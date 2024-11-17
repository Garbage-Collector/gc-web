<template>
  <header>
    <div class="header-with-icon">
      <q-icon name="share" class="header-icon" />
      <h6><strong>같이 나누는 플로깅 스토리</strong></h6>
    </div>
  </header>

  <div v-if="sharedPloggingStore.ploggingRecord.length !== 0">
    <div class="card-wrapper">
      <div
        v-for="(item, index) in sharedPloggingStore.ploggingRecord"
        :key="index"
      >
        <BaseCard
          :photo="item.photo"
          :title="item.title"
          :startDt="item.startDate"
          @click="handleCardClick(item.id)"
        />
      </div>
    </div>
  </div>
  <div v-else class="alert_wrapper">
    <img :src="greenAlert" alt="green_alert" class="alert" />
    <span class="text-green-4 text-bold">아직 플로깅을 시작하지 않았어요!</span>
    <span class="text-green-4 text-bold">나의 플로깅을 공유해보세요.</span>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '../BaseComponent/BaseCard.vue';
import greenAlert from '../../assets/green-alert-img.png';
import { useSharedPloggingStore } from 'stores/ploggingShareStore';
import { useRouter } from 'vue-router';

// routing ok ? ?
const router = useRouter();
const sharedPloggingStore = useSharedPloggingStore();
const handleCardClick = (id) => {
  router.push(`/feed/${id}`);
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin-top: 30px;
}

.more {
  font-size: 14px;
  color: #999;
  font-weight: 400;
  display: flex;
  align-items: center;
}

.card-wrapper {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 16px; /* 스크롤 바 아래에 패딩 추가 */
}

.alert {
  width: 120px;
  margin-bottom: 24px;
  opacity: 0.6;
}

.alert_wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
}

.header-with-icon {
  display: flex;
  align-items: center;
}

.header-icon {
  margin-right: 8px; /* 아이콘과 텍스트 사이의 간격 */
  font-size: 30px; /* 아이콘 크기 */
}
</style>
