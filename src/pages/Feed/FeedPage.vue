<template>
  <section class="main-wrapper">
    <FeedHeaderComponent
      :plogging-count="ploggingStore.ploggingRecord.length"
    />

    <strong class="my-plogging">나의 플로깅 기록 </strong>
    <br />
    <br />

    <div v-if="ploggingStore.ploggingRecord.length !== 0">
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
    </div>
    <div v-else class="alert_wrapper">
      <img :src="greenAlert" alt="green_alert" class="alert" />
      <span class="text-green-4 text-bold"
        >아직 플로깅을 시작하지 않았어요!</span
      >
      <span class="text-green-4 text-bold">나의 플로깅을 등록해보세요.</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import FeedHeaderComponent from './FeedHeaderComponent.vue';
import BaseBanner from 'src/components/BaseComponent/BaseBanner.vue';

import { onMounted } from 'vue';

import greenAlert from '../../assets/green-alert-img.png';
import { usePloggingStore } from 'src/stores/ploggingStore';

const router = useRouter();
const ploggingStore = usePloggingStore();

// const data = ref<Record[]>([]);

onMounted(async () => {
  try {
    await ploggingStore.getPloggingRecord();
    console.log(
      `플로깅 기록 ===[${JSON.stringify(ploggingStore.ploggingRecord)}]`,
    );
  } catch (error) {
    console.error('플로깅 조회 에러', error);
  }
});
</script>

<style scoped>
.banner_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 가운데 정렬을 원할 경우 추가 */
  margin-bottom: 20px; /* 배너 아래에도 간격을 주려면 추가 */
}
.main-wrapper {
  padding: 48px 24px;
}
.my-plogging {
  font-size: 24px;
  font-weight: bold;
  color: black;
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
  margin-top: 30%;
}
</style>
