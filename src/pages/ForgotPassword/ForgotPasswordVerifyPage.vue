<template>
  <!-- <LottieComponent :animationData="animationData" height="200px" /> -->

  <section>
    <p class="text-bold text-h5 q-mt-xl">인증번호</p>
    <div class="flex column q-mb-lg">
      <span class="text-black-5 text-bold"
      >{{ email }}로 인증번호를 전송했어요.
      </span>
      <span class="text-black-5 text-bold">인증번호를 입력해주세요. </span>
    </div>

    <q-form @submit.prevent="verifyCodeAndSignup">
      <q-input
        bottom-slots
        v-model="verifyCode"
        type="number"
        label="인증번호"
        dense
        class="input-spacing"
        placeholder="인증번호를 입력하세요"
      >
        <template v-slot:before>
          <q-icon name="check" />
        </template>
      </q-input>

      <div v-if="remainingTime > 0">
        <p class="verify-text">인증번호 유효 시간: {{ remainingTime }}초</p>
      </div>
      <div v-else>
        <p class="verify-text">인증번호가 만료되었습니다. 다시 요청해주세요.</p>
      </div>

      <p class="verify-text">인증번호를 받지 못하셨나요?</p>
      <p class="verify-text">📧인증번호 다시 보내기</p>
      <!-- <p>인증번호를 받지 못하셨나요?</p> -->

      <q-btn
        type="submit"
        label="인증하기"
        color="green"
        class="login-button text-bold"
      ></q-btn>
    </q-form>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';

import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/authStore';
import { useProfileStore } from 'src/stores/profileStore';

const $q = useQuasar();
const router = useRouter();
const verifyCode = ref();

const authStore = useAuthStore();
const profileStore = useProfileStore();

const email = ref(profileStore.profile.email);

//타이머
const remainingTime = ref(60);
let timer: number | undefined;

const startTimer = () => {
  timer = window.setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value -= 1;
    } else {
      clearInterval(timer);
      authStore.setVerifyCode(0);
    }
  }, 1000);
};

const verifyCodeAndSignup = () => {
  console.log(verifyCode.value);
  console.log(authStore.verifyCode);
  if (verifyCode.value == authStore.verifyCode && remainingTime.value > 0) {
    alert('인증 성공');
    router.push('/forgot-update');
  } else {
    $q.notify({
      message: '인증번호가 올바르지 않습니다. 다시 확인해주세요.',
      type: 'negative',
      position: 'bottom',
      color: 'red-10',
    });
  }
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
section {
  padding: 48px 24px;
}

.login-button {
  width: 100%;
  position: absolute;
  top: 300px;
  padding: 8px 24px;
}
p {
  line-height: 18px;
}
.input-spacing {
  margin-bottom: 24px;
}
.check-button {
  width: 90px;
  margin-bottom: 8px;
}
.verify-text {
  color: var(--Neutral-n600, #475569);
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;

  text-decoration-line: underline;
}
</style>
