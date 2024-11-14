<template>
  <section class="banner-wrapper">
    <img :src="computedImgSrc" :alt="title" class="banner-image" />
    <div :id="id" class="banner">
      <div class="banner-info">
        <p class="title">{{ props.title }}</p>
        <span class="date"> {{ props.startDate }}</span>
        <div class="icon-wrapper">
          <BaseIcon icon="trashCan" @click.stop="confirmDelete" />
        </div>
        <q-btn
          round
          color="green"
          icon="edit"
          style="width: 30px; height: 30px"
          class="edit-button"
          @click.stop="router.push(`/feed/modify/${props.id}`)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from 'src/components/BaseComponent/BaseIcon.vue';
import { computed } from 'vue';
import defaultImg from '../../assets/피드이미지.png';
import { useRouter } from 'vue-router';
import { usePloggingStore } from 'stores/ploggingStore';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

type Props = {
  id: string;
  title: string;
  startDate: string;
  imgSrc: string;
};

const props = defineProps<Props>();
const router = useRouter();
const ploggingStore = usePloggingStore();
const emit = defineEmits(['deleted']);
const $q = useQuasar();

const computedImgSrc = computed(() => {
  return props.imgSrc || defaultImg;
});

const confirmDelete = () => {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    deleteRecord(props.id);
  }
};

const deleteRecord = async (recordId: string) => {
  try {
    await api.delete(`/records/${recordId}`).then(() => {
      // 성공적으로 삭제된 후 알림
      $q.notify({
        color: 'green',
        position: 'bottom',
        message: '삭제되었습니다!',
        icon: 'check',
        timeout: 500,
      });
      console.log('삭제됨');
    });

    ploggingStore.ploggingRecord = ploggingStore.ploggingRecord.filter(
      (record) => record.id !== recordId,
    );
    emit('deleted', recordId);
  } catch (error) {
    // 에러 발생 시 알림
    $q.notify({
      color: 'red',
      position: 'top',
      message: '삭제 실패. 다시 시도해주세요.',
      icon: 'error',
    });
    console.error(error);
  }
};
</script>

<style scoped>
.banner-wrapper {
  width: 100%;
  display: flex;
  height: 100px;
}

.banner {
  background: rgb(165, 211, 181);
  filter: brightness(108%);
  border-radius: 0px 10px 10px 0px;
  width: 259px;
  height: 100px;
  position: relative;
  padding: 15px 15px;
}

.banner-image {
  width: 100px;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 0;
}

.date {
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.banner-info {
  display: flex;
  flex-direction: column;
}

.icon-wrapper {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

.edit-button {
  position: absolute;
  top: 30px;
  right: 20px;
  z-index: 10;
}
</style>
