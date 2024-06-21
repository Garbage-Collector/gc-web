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
      label="📧 회원가입 하러 가기"
      color="white"
      text-color="black"
      to="/signup"
      class="signup-button"
    ></q-btn>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { useProfileStore } from 'src/stores/profileStore';
import LottieComponent from 'src/components/LottieComponent.vue';

import animationData from '../assets/trash_lottie.json';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();

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

const email = ref('');
const password = ref('');

const login = async () => {
  //로그인 요청

  profileStore.profile.email = email.value;
  profileStore.profile.password = password.value;
  await authStore.login();
  if (authStore.isLoggedIn) {
    onLoginSuccess(`${profileStore.profile.nickname}`);
    router.push('/init');
  } else {
    onLoginFail();
  }
};
</script>

<style scoped>
section {
  padding: 48px 24px;
}
.signup-button {
  width: 100%;
  margin-top: 32px;
  border: 1px solid #e2e8f0;
  padding: 8px 24px;
}
.login-button {
  width: 100%;
  margin-top: 64px;
  padding: 8px 24px;
}
</style>
