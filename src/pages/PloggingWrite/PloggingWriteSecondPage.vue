<template>
  <section class="main-wrapper">
    <q-btn
      padding="sm"
      color="green"
      round
      icon="chevron_left"
      @click="router.back()"
    />

    <p class="text-bold text-h5 q-mt-xl">플로깅 기록 작성</p>
    <div class="flex column q-mb-lg">
      <span class="text-grey-6">내가 한 플로깅을 기록으로 남겨보세요!</span>
    </div>

    <!-- <BaseInput
        label="내용"
        required
        placeholder="플로깅 내용"
        v-model="content"
        textarea
        style="width: 340px; height: 260px"
        rows="10"
      /> -->

    <div class="input-wrapper">
      <q-input
        label="플로깅 내용"
        counter
        type="textarea"
        v-model="content"
        placeholder="플로깅 내용"
        style="width: 340px; height: 260px"
        autogrow
        maxlength="500"
        class="custom-q-input"
      >
      </q-input>
    </div>

    <BaseButton
      class="next-button"
      size="sm"
      color="#50b364"
      text="다음"
      @click="submitContent"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from 'components/BaseComponent/BaseButton.vue';
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

<style scoped>
.main-wrapper {
  padding: 48px 24px;
}

.next-button {
  margin-top: 24px;
  position: absolute;
  right: 24px;
}
/* Use v-deep to target internal textarea styling */
::v-deep .custom-q-input .q-field__control {
  padding-bottom: 20px; /* Adjust the value as needed */
}

::v-deep .custom-q-input .q-field__native {
  height: 180px !important; /* Adjust the value as needed */
  resize: none !important; /* Prevent resizing */
}

.input-wrapper {
}
</style>
