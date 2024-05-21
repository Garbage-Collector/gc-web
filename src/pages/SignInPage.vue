<template>
  <LottieComponent :animationData="animationData" height="200px" />

  <section>
    <q-form @submit.prevent="login">
      <q-input
        bottom-slots
        v-model="email"
        label="E-mail"
        counter
        maxlength="50"
        dense
      >
        <template v-slot:before>
          <q-icon name="email" />
        </template>

        <template v-slot:append>
          <q-icon
            v-if="email !== ''"
            name="close"
            @click="email = ''"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint>
          로그인 시 사용할 이메일을 입력해주세요
        </template>
      </q-input>

      <q-input
        bottom-slots
        v-model="password"
        label="Password"
        type="password"
        counter
        maxlength="20"
        dense
      >
        <template v-slot:before>
          <q-icon name="lock" />
        </template>

        <template v-slot:append>
          <q-icon
            v-if="password !== ''"
            name="close"
            @click="password = ''"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint>
          <p>8~20자리의 비밀번호를 입력해주세요.</p>
          (영문자, 소문자, 특수문자 필수)
        </template>
      </q-input>

      <q-btn
        type="submit"
        label="Login"
        color="green"
        class="login-button text-bold"
      ></q-btn>
    </q-form>

    <q-btn
      label="회원가입 하러 가기"
      color="green"
      to="/signup"
      class="signup-button"
    ></q-btn>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useProfileStore } from 'src/stores/profileStore';
import LottieComponent from 'src/components/LottieComponent.vue';

import animationData from '../assets/trash_lottie.json';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const onLoginFail = () => {
  $q.notify({
    message: '로그인에 실패했습니다.',
    type: 'negative',
    position: 'bottom',
  });
};

const onLoginSuccess = (nickname: string) => {
  $q.notify({
    message: `${nickname}님, 플로깅 하세요!`,
    type: 'positive',
    position: 'bottom',
  });
};

const authStore = useAuthStore();
const profileStore = useProfileStore();

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
    .then((res) => {
      // const token = res.data.token;
      //
      // localStorage.setItem('token', token);
      authStore.login();

      const userProfile = res.data;
      console.log(`res.data === [${JSON.stringify(res.data)}]`);
      console.log(`userProfile ===[${userProfile}]`);
      profileStore.setProfile(userProfile);
      console.log(`사용자 닉네임 === [${profileStore.profile.nickname}]`);
      console.log(`사용자 ID === [${profileStore.profile.id}]`);
      console.log(`사용자 닉네임 === [${profileStore.profile.nickname}]`);
      console.log('전역 스토어 로그인 상태 : ', authStore.isLoggedIn);
      onLoginSuccess(profileStore.profile.nickname);
      router.push('/home');
    })
    .catch(() => {
      onLoginFail();
    });
};
</script>

<style scoped>
section {
  padding: 48px 24px;
}
.signup-button,
.login-button {
  width: 100%;
  margin-top: 20%;
}
</style>
