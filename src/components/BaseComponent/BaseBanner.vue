<template>
  <section class="banner-wrapper">
    <!-- <img :src="props.imgSrc" :alt="title" class="banner-image" /> -->
    <img :src="props.imgSrc" alt="" />
    <div :id="id" class="banner">
      <div class="banner-info">
        <p class="title">{{ props.title }}</p>
        <span class="date"> {{ props.startDate }}</span>

        <div class="icon-wrapper">
          <BaseIcon icon="like" @click.stop="console.log('추후 구현 예정')" />
          <BaseIcon icon="share" @click.stop="console.log('추후 구현 예정')" />
          <BaseIcon
            icon="burgerMenu"
            @click.stop="console.log('추후 구현 예정')"
          />
          <BaseIcon
            icon="trashCan"
            @click.stop="console.log('추후 구현 예정')"
          />
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
import { useRouter } from 'vue-router';
type Props = {
  id: string;
  title: string;
  startDate: string;
  imgSrc: string;
};

const props = defineProps<Props>();
const router = useRouter();
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
