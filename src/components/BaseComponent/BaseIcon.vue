<template>
  <img :src="iconComponent" v-if="iconComponent" alt="icon" />
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import icons from '../../Icon';

const props = defineProps<{
  icon: keyof typeof icons;
}>();

// `iconComponent`를 string으로 변경하여 이미지 경로를 가져옵니다.
const iconComponent = computed<string | undefined>(() => icons[props.icon]);
</script>

<style scoped></style>
