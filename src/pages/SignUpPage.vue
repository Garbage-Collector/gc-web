<template>
  <h5>임시 회원가입 페이지</h5>

  <q-form @submit.prevent="signup">
    <q-input v-model="email" label="이메일" color="green" />
    <q-input v-model="password" label="비밀번호" color="green" />
    <q-input v-model="nickname" label="닉네임" color="green" />
    <q-btn type="submit" label="회원가입 하기" color="green" rounded></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();

const email = ref('');
const password = ref('');
const nickname = ref('');

const signup = async () => {
  //로그인 요청
  return await api
    .post('/users/signup', {
      email: email.value,
      password: password.value,
      nickname: nickname.value,
    })
    .then(() => {
      // const token = res.data.token;
      //
      // localStorage.setItem('token', token);
      $q.notify({
        message: '회원가입에 성공했어요! 로그인 해주세요',
        type: 'positive',
        position: 'bottom',
        color: 'green-10',
      });
      router.push('/signin');
    });
};
</script>

<style scoped></style>
