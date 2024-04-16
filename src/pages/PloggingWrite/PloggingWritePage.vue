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

    <form @submit.prevent>
      <section class="form-wrapper">
        <BaseInput
          label="제목"
          required
          placeholder="플로깅 제목"
          v-model="title"
        />
        <BaseInput
          label="장소"
          required
          placeholder="플로깅 장소"
          v-model="location"
        />
        <TimeInputComponent
          @dialog-open="openDialog"
          :selected-date="date"
          :selected-time="time"
        />
      </section>
      <BaseButton
        type="submit"
        size="sm"
        text="다음"
        color="green"
        class="next-button"
      />
    </form>

    <!--    <q-input v-model="title" aria-required="true" color="green"/>-->
    <!--    <q-input v-model="location" label="장소 *" aria-required="true" color="green"/>-->
    <!--    <q-input v-model="time" label="시간 *" aria-required="true" color="green"/>-->

    <!--    <q-icon name="alarm_add">플로깅 시간</q-icon>-->
    <!--    <CalendarComponent />-->
  </section>

  <q-dialog v-model="isOpen">
    <q-card class="border-radius">
      <q-card-section>
        <div class="text-h6">날짜 선택</div>
      </q-card-section>
<!--      <div class="q-gutter-md row items-start">-->
<!--        <q-date v-model="date" mask="YYYY-MM-DD HH:mm" color="green" />-->
<!--        <q-time v-model="time" mask="YYYY-MM-DD HH:mm" color="green" />-->
<!--      </div>-->
      <q-card-section class="q-gutter-md row items-start ">
        <q-date v-model="date" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="확인" color="primary" class="text-bold" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import BaseInput from 'components/BaseComponent/BaseInput.vue';
import BaseButton from 'components/BaseComponent/BaseButton.vue';
import TimeInputComponent from 'components/TimeInputComponent.vue';
import { useDialog } from 'src/hooks/useDialog';
import dayjs from 'dayjs';

const emit = defineEmits(['dialog-open', 'dialog-close']);

const { isOpen, openDialog } = useDialog(emit);

const router = useRouter();
const title = ref('');
const location = ref('');
const today = dayjs(new Date());
const date = ref(today.format('YYYY-MM-DD'));
const time = ref('');

// console.log(today.format('YYYY-MM-DD'));
</script>

<style scoped lang="scss">
.main-wrapper {
  padding: 48px 24px;
}

.input-field {
  margin-top: 16px;
  width: 342px;
}

input::placeholder {
  color: #ccc;
  opacity: 1;
}

.input-wrapper {
  width: 364px;
  height: 82px;
}

.next-button {
  margin-top: 24px;
  position: absolute;
  right: 24px;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 26px;
}
</style>
