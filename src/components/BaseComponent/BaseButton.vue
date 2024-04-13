<template>
  <q-btn :style="buttonStyle" :label="text"/>
</template>

<script setup lang="ts">
import {QBtn} from 'quasar';
import {computed} from "vue";

type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  size: ButtonSize;
  color: string;
  text: string;
}

const props = defineProps<BaseButtonProps>();
const buttonStyle = computed(() => {
  const sizeStyles = {
    sm: {width: '76px', height: '34px', color: 'white', borderRadius: '16px'},
    //TODO : md, lg 사이즈 추후 추가 예정
    md: {width: '200px', height: '60px', color: 'white'},
    lg: {width: '300px', height: '90px', color: 'white'},
  };

  // props에서 size와 color를 추출합니다.
  const {size, color} = props;

  // 현재 size에 맞는 스타일을 가져옵니다.
  const currentSizeStyle = sizeStyles[size];

  // 계산된 스타일 객체를 반환합니다.
  return {
    ...currentSizeStyle,
    backgroundColor: color, // props의 color 값을 배경색으로 사용합니다.
  };
});
</script>
