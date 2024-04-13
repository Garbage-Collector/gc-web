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

    <q-input v-model="title" aria-required="true" color="green"/>
    <q-input v-model="location" label="장소 *" aria-required="true" color="green"/>
    <q-input v-model="time" label="시간 *" aria-required="true" color="green"/>

    <BaseButton size="sm" color="#50b364" text="다음"/>
    <CalendarComponent/>
  </section>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import CalendarComponent from 'components/CalendarComponent.vue';
import BaseButton from 'components/BaseComponent/BaseButton.vue';

const router = useRouter();
const title = ref('');
const location = ref('');
const time = ref('');

</script>

<style scoped lang="scss">
.main-wrapper {
  padding: 48px 24px;
}
</style>
