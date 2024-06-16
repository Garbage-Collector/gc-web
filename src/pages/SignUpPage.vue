<template>
  <!-- <LottieComponent :animationData="animationData" height="200px" /> -->

  <section>
    <q-form @submit.prevent="login">
      <q-input
        bottom-slots
        v-model="email"
        label="E-mail"
        counter
        maxlength="50"
        dense
        class="input-spacing"
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
          회원가입 시 사용할 이메일을 입력해주세요
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
        class="input-spacing"
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
          <p>
            특수문자(~ . ! @ # $ 등)와 영문, 숫자를 포함해
            <p>8~20 자 이내로
              작성해주세요.</p>
          </p>
        </template>
      </q-input>

      <q-input
        bottom-slots
        v-model="nickname"
        label="닉네임"
        counter
        maxlength="10"
        dense
        class="input-spacing"
      >
        <template v-slot:before>
          <q-icon name="badge" />
        </template>

        <template v-slot:append>
          <q-icon
            v-if="email !== ''"
            name="close"
            @click="email = ''"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint> 사용할 닉네임을 입력해주세요. </template>
      </q-input>
      <q-btn
        type="submit"
        label="회원가입 요청하기"
        color="green"
        class="login-button text-bold"
      ></q-btn>
    </q-form>


  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { useProfileStore } from 'src/stores/profileStore';

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

.login-button {
  width: 100%;
  margin-top: 64px;
  padding: 8px 24px;
}
p{
  line-height: 18px;
}
.input-spacing{
  margin-bottom: 24px;
}
</style>
