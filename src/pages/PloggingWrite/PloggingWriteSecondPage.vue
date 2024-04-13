<template>
  <div>
    본문 작성 페이지
    <BaseButton class="next-button" size="sm" color="#50b364" text="다음" @click="router.push('/write-third')"/>
  </div>
</template>

<script setup lang="ts">


import {useRouter} from 'vue-router';
import BaseButton from 'components/BaseComponent/BaseButton.vue';
const router =useRouter();

</script>

<style scoped>

</style>
