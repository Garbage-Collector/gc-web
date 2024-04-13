<template>
  <h5>임시 로그인 페이지</h5>
  <!--  <span>아이디 <input type="text" placeholder="ID"></span>-->
  <!--  <span>비밀번호 <input type="password" placeholder="PW"></span>-->
  <!--  <button>로그인</button>-->

  <q-form @submit.prevent="login">
    <q-input v-model="username" label="아이디" color="green" />
    <q-input v-model="password" label="비밀번호" color="green" />
    <q-btn type="submit" label="로그인" color="green" rounded></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { api } from 'boot/axios';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const login = async () => {
  return await api
    .post('/login', {
      username: username.value,
      password: password.value,
    })
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      authStore.login();
      console.log('전역 스토어 로그인 상태 : ', authStore.isLoggedIn);
      router.push('/home')
    });
};
</script>

<style scoped></style>
