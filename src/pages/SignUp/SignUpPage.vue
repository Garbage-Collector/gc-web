<template>
  <!-- <LottieComponent :animationData="animationData" height="200px" /> -->

  <section>

    <p class="text-bold text-h5 q-mt-xl">회원가입</p>
    <div class="flex column q-mb-lg">
      <span class="text-grey-6">회원가입 후 플로깅 해보세요!</span>
    </div>

    <q-form @submit.prevent="signup">
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
          <div class="flex items-center">
            <q-btn
              label="중복확인"
              color="primary"
              class="check-button"
               @click="checkEmail"
            />
            <q-icon
              v-if="email !== ''"
              name="close"
              @click="email = ''"
              class="cursor-pointer"
            />
          </div>
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
          <q-btn
              label="중복확인"
              color="primary"
              class="check-button"
              @click="checkNickname"
            />
          <q-icon
            v-if="nickname !== ''"
            name="close"
            @click="nickname = ''"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint> 사용할 닉네임을 입력해주세요. </template>
      </q-input>
      <q-btn
        type="submit"
        label="이메일 인증번호 받기"
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



const email = ref('');
const password = ref('');
const nickname= ref('');

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

//TODO : 닉네임 중복확인 기능 구현
const checkNickname = () => {
  console.log("닉네임 중복확인 구현중");
}

//TODO : 이메일 중복확인 기능 구현
const checkEmail = () => {
  console.log("이메일 중복확인 구현중");
}

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
.check-button{
  width:90px;
  margin-bottom: 8px;

}
</style>
