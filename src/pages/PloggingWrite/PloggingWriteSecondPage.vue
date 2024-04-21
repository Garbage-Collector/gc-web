<template>
  <div>
    플로깅 내용 작성
    <!-- TODO : textarea 로 수정 -->
    <BaseInput
      label="내용"
      required
      placeholder="플로깅 내용"
      v-model="content"
      style="width: 340px; height: 260px"
    />

    <BaseButton
      class="next-button"
      size="sm"
      color="#50b364"
      text="다음"
      @click="submitContent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from 'components/BaseComponent/BaseButton.vue';
import BaseInput from 'src/components/BaseComponent/BaseInput.vue';
import { usePloggingStore } from 'src/stores/ploggingStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const ploggingStore = usePloggingStore();

const submitContent = () => {
  ploggingStore.setPloggingContent(content.value);
  router.push('/write-third');
};

const content = ref('');
</script>

<style scoped></style>
