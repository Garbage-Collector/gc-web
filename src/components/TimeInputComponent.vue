<!--본 컴포넌트는 임시 컴포넌트-->
<template>
  <div class="input-root">
    <div class="base-label">
      <div class="label">
        <span>
          <span class="label-span">시간</span>
          <span class="label-span2">*</span>
        </span>
      </div>
    </div>

    <section class="time-wrapper">
      <div class="calendar" @click="openDialog">
        <img class="calendar-month" :src="calendar" />
        <input
          class="input"
          placeholder="YY/MM/DD/mm ~ YY/MM/DD/mm"
          v-model="dateValue"
        />
      </div>
      <div class="watch" @click="openDialog">
        <img class="watch-icon" :src="watchImage" />
        <input class="input" placeholder="12:30 ~ 3:30" v-model="timeValue" />
      </div>
    </section>
  </div>
</template>
<script setup>
import calendar from '../assets/icons/calendar.png';
import watchImage from '../assets/icons/watch.png';
import { useDialog } from 'src/hooks/useDialog.ts';

import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  selectedDate: String,
  selectedTime: String,
});
const emit = defineEmits(['dialog-open', 'update:selectedDate']);

const { openDialog } = useDialog(emit);

const dateValue = ref(props.selectedDate);
const timeValue = ref(props.selectedTime);

// props로 받은 selectedDate가 변경될 때 localDate도 업데이트
watch(
  () => props.selectedDate,
  (newVal) => {
    dateValue.value = newVal;
  },
);

// localDate가 변경될 때 부모에게 업데이트 알림
watch(dateValue, (newVal) => {
  emit('update:selectedDate', newVal);
});
</script>

<style scoped>
.calendar {
  display: flex;
}

.watch {
  display: flex;
}

.time-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.calendar-month {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
}

.watch-icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
}

.input {
  color: #999999;
  text-align: left;
  font-family: 'PretendardVariable-Regular', sans-serif;
  font-size: 16px;
  line-height: 23px;
  font-weight: 400;
  border: none;
  outline: none;
  width: 250px;
  caret-color: transparent;
  cursor: pointer;
}

.input-root,
.input-root * {
  box-sizing: border-box;
}

.input-root {
  border-radius: 8px;
  border-style: solid;
  border-color: #aadec2;
  border-width: 1px;
  padding: 16.5px 14px 16.5px 14px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 92px;
  position: relative;
}

.base-label {
  background: #ffffff;
  padding: 0px 4px 0px 4px;
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 2px;
  position: absolute;
  left: 8px;
  top: -0.5px;
}

.label {
  text-align: left;
  font-family: 'PretendardVariable-Regular', sans-serif;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  position: relative;
}

.label-span {
  color: var(--text-inactive, rgba(0, 0, 0, 0.6));
  font-family: 'PretendardVariable-Regular', sans-serif;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
}

.label-span2 {
  color: rgba(250, 48, 48, 0.6);
  font-family: 'PretendardVariable-Regular', sans-serif;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
}

/*.calendar-month,*/
/*.watch {*/
/*  flex-shrink: 0;*/
/*  width: 22.66px;*/
/*  height: 22.66px;*/
/*  position: relative;*/
/*  overflow: visible;*/
/*}*/

/*.input {*/
/*  color: #999999;*/
/*  text-align: left;*/
/*  font-family: 'PretendardVariable-Regular', sans-serif;*/
/*  font-size: 16px;*/
/*  line-height: 23px;*/
/*  font-weight: 400;*/
/*  position: relative;*/
/*}*/

/*.input2 {*/
/*  color: #999999;*/
/*  text-align: left;*/
/*  font-family: 'PretendardVariable-Regular', sans-serif;*/
/*  font-size: 16px;*/
/*  line-height: 23px;*/
/*  font-weight: 400;*/
/*  position: absolute;*/
/*  left: 44.66px;*/
/*  top: 51.16px;*/
/*}*/
</style>
