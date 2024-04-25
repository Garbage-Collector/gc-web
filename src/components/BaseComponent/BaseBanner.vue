<template>
  <section class="banner-wrapper">
    <!-- <img :src="props.imgSrc" :alt="title" class="banner-image" /> -->
    <img src="../../assets/피드이미지.png" alt="" />
    <div :id="id" class="banner">
      <div class="banner-info">
        <p class="title">{{ props.title }}</p>
        <span class="date"> {{ props.startDate }}</span>

        <div class="icon-wrapper">
          <BaseIcon icon="like" />
          <BaseIcon icon="share" />
          <BaseIcon icon="burgerMenu" />
          <BaseIcon icon="trashCan" />
        </div>
        <q-btn
          round
          color="green"
          icon="edit"
          style="width: 30px; height: 30px"
          class="edit-button"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from 'src/components/BaseComponent/BaseIcon.vue';
type Props = {
  id: string;
  title: string;
  startDate: string;
  imgSrc: string;
};

const props = defineProps<Props>();
</script>

<style scoped>
.banner-wrapper {
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
  border-top-right-radius: 10px;
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
