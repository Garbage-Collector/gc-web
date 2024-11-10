<template>
  <!-- 로딩 컴포넌트 -->
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

      <!-- 로그인 방식 선택 버튼 -->
      <div
        class="login-options"
        style="margin-top: 30px; margin-bottom: 15px; text-align: center"
      >
        <q-btn
          label="비밀번호"
          icon="lock"
          color="green"
          @click="selectPasswordLogin"
          :outline="selectedLoginMethod !== 'password'"
          class="custom-outline-button text-bold button-margin"
        />
        <q-btn
          label="passkey"
          icon="fingerprint"
          color="green"
          @click="selectPasskeyLogin"
          :outline="selectedLoginMethod !== 'passkey'"
          class="custom-outline-button text-bold"
        />
      </div>

      <!-- 비밀번호 입력 필드 -->
      <q-input
        v-if="selectedLoginMethod === 'password'"
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

      <!-- 패스키 로그인 정보 -->
      <div
        v-if="selectedLoginMethod === 'passkey'"
        style="margin-top: 40px; text-align: center"
      ></div>

      <div class="forgot-password-link">
        <span @click="goToForgotPassword" class="text-blue cursor-pointer">
          Forgot Password?
        </span>
      </div>

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
    timeout: 1000,
  });
};

const authStore = useAuthStore();
const profileStore = useProfileStore();

const email = ref('');
const password = ref('');
const selectedLoginMethod = ref(null); // 로그인 방식 선택 변수

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

const goToForgotPassword = () => {
  router.push('/forgot-password').catch((err) => {
    console.error('라우터 에러:', err); // 라우터 에러 발생 시 확인
  });
};

const selectPasswordLogin = () => {
  selectedLoginMethod.value = 'password';
};

// 패스키 로그인 방식 선택 시 호출할 함수
const selectPasskeyLogin = async () => {
  selectedLoginMethod.value = 'passkey';
  profileStore.profile.email = email.value;
  await authStore.passkeyLogin();

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
  margin-top: 0px;
  padding: 8px 24px;
}

.forgot-password-link {
  margin-top: 50px;
  margin-bottom: 10px;
  text-align: right; /* 왼쪽 정렬 */
}

.text-blue {
  color: #4a90e2;
  font-size: 16px;
  text-decoration: none;
  font-weight: bold;
  display: block; /* 독립적인 블록으로 만들어줌 */
}

.text-blue:hover {
  text-decoration: underline;
}

.custom-outline-button {
  border: 2px; /* 테두리를 초록색으로 설정 */
  color: white; /* 텍스트 색상도 초록색으로 설정 */
  font-size: 16px;
  border-radius: 8px; /* 네모 형태 유지 */
}

.button-margin {
  margin-right: 15px; /* 좌우에 10px 간격 추가 */
}
</style>
