<template>
  <section class="flex items-center justify-between">
    <div class="flex">
      <q-avatar size="60px">
        <img src="../../assets/준호이미지.png" alt="" />
        <q-img :src="profile" />
      </q-avatar>
      <span class="flex column q-mt-sm q-ml-sm">
        <span class="text-grey-6"
          ><strong class="text-h5 text-bold text-black">{{ userName }} </strong>
          님 반가워요!</span
        >
        <span class="text-grey-6"
          >현재 등급은 <span class="text-green-4">{{ grade }}</span> 에요.</span
        >
      </span>
    </div>
    <div class="text-green">
      <q-btn class="glossy" round color="green" icon="edit" to="/write" />
    </div>
  </section>
</template>

<script setup lang="ts">
import profile from 'assets/준호이미지.png';
import { useProfileStore } from 'src/stores/profileStore';
import { ref } from 'vue';

const profileStore = useProfileStore();

const userName = ref(profileStore.profile.nickname);
const grade = ref('비기너');
console.log(userName.value);
</script>

<style scoped lang="scss"></style>
