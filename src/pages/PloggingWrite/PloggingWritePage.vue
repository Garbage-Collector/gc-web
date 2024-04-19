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

    <form @submit.prevent="submitForm">
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
          :selected-date="ploggingDate"
          :selected-time="ploggingTime"
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

      <q-card-section class="q-gutter-md row items-start">
        <q-date v-model="ploggingDate" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="확인"
          color="primary"
          class="text-bold"
          @click="isTimeDialogOpen = true"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!--  시간선택 Dialog-->
  <q-dialog v-model="isTimeDialogOpen">
    <q-card class="border-radius">
      <q-card-section>
        <div class="text-h6">시간 선택 (언제부터 ~ 언제까지)</div>
      </q-card-section>

      <!--      시작시간-->
      <q-card-section class="q-gutter-md row items-start">
        <q-time v-model="startTime" text-color="white" />
      </q-card-section>
      <!--      종료시간-->
      <q-card-section class="q-gutter-md row items-start">
        <q-time v-model="endTime" mask="HH:mm" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="확인"
          color="primary"
          class="text-bold"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import BaseInput from 'components/BaseComponent/BaseInput.vue';
import BaseButton from 'components/BaseComponent/BaseButton.vue';
import TimeInputComponent from 'components/TimeInputComponent.vue';
import { useDialog } from 'src/hooks/useDialog';
import { date as quasarDate } from 'quasar';
import { api } from 'src/boot/axios';

const emit = defineEmits(['dialog-open', 'dialog-close']);

const { isOpen, openDialog } = useDialog(emit);
const isTimeDialogOpen = ref(false);

const router = useRouter();
const title = ref('');
const location = ref('');
const today = new Date();
const ploggingDate = ref(quasarDate.formatDate(today, 'YYYY-MM-DD'));

//플로깅 시작시간-종료시간
const startTime = ref('');
const endTime = ref('');

const ploggingTime = ref('');

//TODO : 아래의 watch 를 객체로 관리해보기

// 플로깅 시작시간 감시해서 변경될때마다 기록
watch(startTime, () => {
  console.log(`플로깅 startTime === [${startTime.value}]`);
});

//플로깅 종료시간 감시해서 변경될때마다 기록

watch(endTime, () => {
  console.log(`플로깅 endTime === [${endTime.value}]`);
  ploggingTime.value = `${startTime.value} ~ ${endTime.value}`;
});

//플로깅 날짜 포맷 맞추기
watch(ploggingDate, () => {
  // ploggingDate.value = quasarDate.formatDate(ploggingDate.value, 'YYYY-MM-DD');
  console.log(
    `변경된 플로깅 날짜 === [${quasarDate.formatDate(ploggingDate.value, 'YYYY-MM-DD')}]`,
  );
});

const submitForm = async () => {
  const formData = {
    title: title.value,
    location: location.value,
    date: ploggingDate.value,
    startTime: startTime.value,
    endTime: endTime.value,
  };

  try {
    console.log('요청 값', formData);
    const response = await api.post('/write', formData);
    console.log('서버 응답:', response);
    // 성공적으로 전송 후, 다른 페이지로 이동하거나 알림을 표시
  } catch (error) {
    console.error('Error posting form data:', error);
  }
};
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

::v-deep .q-time__clock-circle {
  color: black;
}
::v-deep .q-time__clock {
  background-color: white;
}
::v-deep .q-time__container-child {
  border: 1px solid #aadec2;
}
</style>
