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
    <div class="flex column">
      <span class="text-grey-6">내가 한 플로깅을 기록으로 남겨보세요!</span>
    </div>

    <!--    <q-input v-model="title" aria-required="true" color="green"/>-->
    <!--    <q-input v-model="location" label="장소 *" aria-required="true" color="green"/>-->
    <!--    <q-input v-model="time" label="시간 *" aria-required="true" color="green"/>-->

    <section class="input-wrapper">
      <q-input
        v-model="title"
        label="제목"
        aria-required="true"
        color="green"
        required
        class="input-field required-input"
        placeholder="플로깅 제목"
      />
      <q-input
        v-model="location"
        label="장소"
        aria-required="true"
        color="green"
        required
        class="input-field required-input"
        placeholder="플로깅 장소"
      />


      <BaseButton class="next-button" size="sm" color="#50b364" text="다음" @click="router.push('/write-second')"/>
    </section>

    <!--    <q-icon name="alarm_add">플로깅 시간</q-icon>-->
        <CalendarComponent/>
  </section>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
// import CalendarComponent from 'components/CalendarComponent.vue';
import BaseButton from 'components/BaseComponent/BaseButton.vue';
import {ref} from 'vue';

const router = useRouter();
const title = ref('');
const location = ref('');
// const time = ref('');

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
.input-wrapper{
  width: 364px;
  height: 82px;
}
.next-button{
  margin-top: 24px;
  position: absolute;
  right:24px;
}
</style>
