<template>
  <div ref="lottieContainer" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';
import lottie from 'lottie-web';

const props = defineProps({
  animationData: {
    type: Object,
    required: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
});

const lottieContainer = ref(null);
let lottieInstance = null;

onMounted(() => {
  lottieInstance = lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: props.loop,
    autoplay: props.autoplay,
    animationData: props.animationData,
  });
});

onUnmounted(() => {
  if (lottieInstance) {
    lottieInstance.destroy();
  }
});
</script>

<style scoped>
/* Optional: Add styles for the Lottie container if needed */
</style>
