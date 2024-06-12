<template>
  <header>
    <h6><strong>최근 한 달 동안의 기록이에요</strong></h6>

    <div class="more">
      <span @click="router.push('/feed')">더보기</span>
      <q-icon name="arrow_forward_ios" style="margin-bottom: 1px"></q-icon>
    </div>
  </header>

  <!-- <div v-if="ploggingStore.ploggingRecord.length !== 0">
      <div
        v-for="(banner, index) in ploggingStore.ploggingRecord"
        :key="index"
        class="banner_wrapper"
      >
        <BaseBanner
          :id="banner.id"
          :title="banner.title"
          :start-date="banner.startDate.substring(0, 10)"
          :imgSrc="banner.photo"
          @click.prevent="router.push(`/feed/${banner.id}`)"
        />
      </div>
    </div> -->

  <div v-if="ploggingStore.ploggingRecord.length !== 0">
    <div class="card-wrapper">
      <div v-for="(item, index) in ploggingStore.ploggingRecord" :key="index">
        <BaseCard
          :photo="item.photo"
          :title="item.title"
          :startDt="item.startDate"
        />
      </div>
    </div>
  </div>
  <div v-else class="alert_wrapper">
    <img :src="greenAlert" alt="green_alert" class="alert" />
    <span class="text-green-4 text-bold">아직 플로깅을 시작하지 않았어요!</span>
    <span class="text-green-4 text-bold">나의 플로깅을 등록해보세요.</span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseCard from '../BaseComponent/BaseCard.vue';
import { usePloggingStore } from 'src/stores/ploggingStore';
import greenAlert from '../../assets/green-alert-img.png';

const router = useRouter();
const ploggingStore = usePloggingStore();
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
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
</style>
