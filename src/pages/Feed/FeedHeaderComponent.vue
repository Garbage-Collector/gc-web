<template>
  <section class="header">
    <div class="flex">
      <q-avatar size="60px">
        <img src="../../assets/logo.png" alt="default_image" />
        <q-img :src="profile" />
      </q-avatar>
      <span class="flex column q-mt-sm q-ml-sm">
        <span class="text-grey-6"
          ><strong class="text-h5 text-bold text-black">{{ userName }} </strong>
          님의 플로깅 기록이에요.</span
        >
        <span class="text-grey-6"
          >이번주에 <span class="text-green-4">{{ props.ploggingCount }}</span
          >건의 플로깅을 기록했어요!</span
        >
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import profile from 'assets/logo.png';
import { useProfileStore } from 'src/stores/profileStore';
import { ref, defineProps } from 'vue';

const profileStore = useProfileStore();

type Props = {
  ploggingCount: number;
};

const props = defineProps<Props>();

const userName = ref(profileStore.profile.nickname);
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 36px;
}
</style>
