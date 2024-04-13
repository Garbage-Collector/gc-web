<template>
  <section>
    <p class="text-h6 text-weight-bold q-mt-xl">나의 플로깅 기록</p>

    <q-card class="my-card">
      <q-img :src="joggingImg">
        <div class="absolute-bottom">
          <span class="card-text text-h6 text-black">홍천 비발디파크 플로깅</span>
          <span class="card-text text-subtitle2 text-green-4">2024.01.12 (일) </span>
          <span class="card-text text-subtitle2 text-grey-7">워크숍에서 박사님과 함께한 플로깅</span>
        </div>
      </q-img>
    </q-card>
  </section>
</template>

<script setup lang="ts">
import joggingImg from '../../assets/조깅이미지.svg';
</script>

<style scoped lang="scss">
.q-card {
  border: 1px solid white;
  border-radius: 18px;
  box-shadow: none;
}
.absolute-bottom{
  top:100px;
  bottom:50px;
  left: 20px;
  right: 20px;
  background-color: white;
  opacity: 0.8;
  border-radius: 10px;
  transform: translateY(20%);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
