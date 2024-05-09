<template>
  <h5>임시 로그인 페이지</h5>

  <q-form @submit.prevent="login">
    <q-input v-model="email" label="이메일" color="green" />
    <q-input v-model="password" label="비밀번호" color="green" />
    <q-btn type="submit" label="로그인" color="green" rounded></q-btn>
  </q-form>
  <q-btn
    type="submit"
    label="회원가입 하러 가기"
    color="green"
    rounded
    to="/signup"
  ></q-btn>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { api } from 'boot/axios';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const login = async () => {
  //로그인 요청
  return await api
    .post('/users/signin', {
      email: email.value,
      password: password.value,
    })
    .then(() => {
      // const token = res.data.token;
      //
      // localStorage.setItem('token', token);
      authStore.login();
      console.log('전역 스토어 로그인 상태 : ', authStore.isLoggedIn);
      router.push('/home');
    });
};
</script>

<style scoped></style>
