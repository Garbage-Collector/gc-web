<template>
  <section>
    <p class="text-h6 text-weight-bold"></p>

    <q-card class="my-card">
      <q-img :src="joggingImg">
        <div class="absolute-bottom">
          <span class="card-text text-h6 text-black text-bold"
            >Garbage Collect</span
          >
          <span class="card-text text-subtitle2 text-green-4">
            {{ formattedDate }}
          </span>
          <span class="card-text text-subtitle2 text-grey-7"
            >오늘의 플로깅을 기록해보세요!</span
          >
        </div>
      </q-img>
    </q-card>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import joggingImg from '../../assets/피드이미지.png';

// Helper function to get the day of the week in Korean
function getDayOfWeek(day) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[day];
}

const formattedDate = ref('');

onMounted(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  const day = getDayOfWeek(today.getDay());

  formattedDate.value = `${year}.${month}.${date} (${day})`;
});
</script>

<style scoped lang="scss">
.q-card {
  border: 1px solid white;
  border-radius: 18px;
  box-shadow: none;
}
.absolute-bottom {
  top: 100px;
  bottom: 50px;
  left: 20px;
  right: 20px;
  background-color: white;
  opacity: 0.8;
  border-radius: 10px;
  transform: translateY(-10%);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
