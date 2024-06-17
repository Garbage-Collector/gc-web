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

    <q-form @submit.prevent="signup">
      <q-input
        bottom-slots
        v-model="verifyCode"
        label="인증번호"
        dense
        class="input-spacing"
        placeholder="인증번호를 입력하세요"
      >
        <template v-slot:before>
          <q-icon name="check" />
        </template>
      </q-input>

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
import { ref } from 'vue';

import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

const $q = useQuasar();
const router = useRouter();

const email = ref('wisoft-garbage-collector@gmail.com');

const verifyCode = ref();

const signup = async () => {
  //회원가입 요청
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
