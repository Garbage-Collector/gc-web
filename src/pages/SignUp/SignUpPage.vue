<template>
  <!-- <LottieComponent :animationData="animationData" height="200px" /> -->

  <section>
    <p class="text-bold text-h5 q-mt-xl">회원가입</p>
    <div class="flex column q-mb-lg">
      <span class="text-grey-6">로그인 시 사용할 이메일을 입력해주세요.</span>
    </div>

    <q-form @submit.prevent="checkEmail">
      <q-input
        bottom-slots
        v-model="email"
        label="E-mail"
        counter
        maxlength="50"
        dense
        class="input-spacing"
        :rules="[emailRule]"
      >
        <template v-slot:before>
          <q-icon name="email" />
        </template>

        <template v-slot:append>
          <div class="flex items-center">
            <q-btn
              label="중복확인"
              :color="isEmailValid ? 'green' : 'grey'"
              class="check-button"
              @click="checkEmail"
              :disable="!isEmailValid"
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

      <q-btn
        type="submit"
        label="이메일 인증번호 받기"
        :color="isEmailChecked ? 'green' : 'grey'"
        class="login-button text-bold"
        :disable="!isEmailChecked"
      ></q-btn>
    </q-form>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useProfileStore } from 'src/stores/profileStore';

const $q = useQuasar();
const router = useRouter();

const profileStore = useProfileStore();

const email = ref('');
const password = ref('');
const nickname = ref('');
const isEmailChecked = ref(false);
const isEmailValid = computed(() => {
  return emailRule(email.value) === true;
});

const emailRule = (value: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(value) || '유효한 이메일을 입력해주세요';
};

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

// 이메일 중복확인 기능 구현
const checkEmail = async () => {
  try {
    const response = await api.get(`/api/users?email=${email.value}`);

    if (response.data.available) {
      profileStore.setEmail(email.value);
      console.log(`사용자 이메일 === [${profileStore.profile.email}]`);
      $q.notify({
        message: '사용 가능한 이메일입니다.',
        type: 'positive',
        position: 'bottom',
        color: 'green-10',
      });
      isEmailChecked.value = true;
    } else {
      $q.notify({
        message: '이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.',
        type: 'negative',
        position: 'bottom',
        color: 'red-10',
      });
      isEmailChecked.value = false;
    }
  } catch (error) {
    $q.notify({
      message: '이메일 중복확인 중 오류가 발생했습니다. 다시 시도해주세요.',
      type: 'negative',
      position: 'bottom',
      color: 'red-10',
    });
    isEmailChecked.value = false;
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
</style>
