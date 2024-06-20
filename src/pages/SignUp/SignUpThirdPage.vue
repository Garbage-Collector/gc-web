<template>
  <!-- <LottieComponent :animationData="animationData" height="200px" /> -->

  <section>
    <p class="text-bold text-h5 q-mt-xl">회원가입</p>
    <div class="flex column q-mb-lg">
      <span class="text-grey-6"
        >로그인 시 사용할 닉네임과 비밀번호를 입력해주세요.</span
      >
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

        <template v-slot:hint>
          회원가입 시 사용할 이메일을 입력해주세요
        </template>
      </q-input>

      <!-- 비밀번호 -->

      <q-input
        bottom-slots
        v-model="password"
        label="비밀번호"
        counter
        maxlength="20"
        dense
        class="input-spacing"
        type="password"
      >
        <template v-slot:before>
          <q-icon name="lock" />
        </template>

        <template v-slot:append>
          <div class="flex items-center">
            <q-icon
              v-if="password !== ''"
              name="close"
              @click="password = ''"
              class="cursor-pointer"
            />
          </div>
        </template>

        <template v-slot:hint>
          회원가입 시 사용할 비밀번호를 입력해주세요
        </template>
      </q-input>

      <!-- 닉네임 -->
      <q-input
        bottom-slots
        v-model="nickname"
        label="닉네임"
        counter
        maxlength="10"
        dense
        class="input-spacing"
        :rules="[nicknameRule]"
      >
        <template v-slot:before>
          <q-icon name="badge" />
        </template>

        <template v-slot:append>
          <div class="flex items-center">
            <q-btn
              label="중복 확인"
              :color="isNicknameValid ? 'green' : 'grey'"
              class="check-button"
              :disable="!isNicknameValid"
              @click="checkNickname"
            ></q-btn>
          </div>
        </template>

        <template v-slot:hint>
          회원가입 시 사용할 닉네임을 입력해주세요
        </template>
      </q-input>

      <q-btn
        type="submit"
        label="회원가입 하기"
        :color="isNicknameChcked ? 'green' : 'grey'"
        class="login-button text-bold"
        :disable="!isNicknameChcked"
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

const email = ref(profileStore.profile.email);
const password = ref('');
const nickname = ref('');
const isNicknameChcked = ref(false);
const isNicknameValid = computed(() => {
  return nicknameRule(nickname.value) === true;
});

// const isNicknameValid = true;
const nicknameRule = (value: string) => {
  if (!value) {
    return '닉네임을 입력해주세요';
  }
  if (value.length < 1 || value.length > 10) {
    return '닉네임은 1자 이상 10자 이하여야 합니다';
  }
  if (!/^[a-zA-Z0-9가-힣]*$/.test(value)) {
    return '특수 문자는 사용할 수 없습니다';
  }
  return true;
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

// 닉네임 중복 확인 기능 구현
const checkNickname = async () => {
  try {
    const response = await api.get(`/api/users?nickname=${nickname.value}`);

    if (response.data.available) {
      profileStore.setNickname(nickname.value);
      console.log(`사용자 닉네임 === [${profileStore.profile.nickname}]`);
      $q.notify({
        message: '사용 가능한 닉네임입니다.',
        type: 'positive',
        position: 'bottom',
        color: 'green-10',
      });
      isNicknameChcked.value = true;
    } else {
      $q.notify({
        message: '이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요.',
        type: 'negative',
        position: 'bottom',
        color: 'red-10',
      });
      isNicknameChcked.value = false;
    }
  } catch (error) {
    $q.notify({
      message: '닉네임 중복확인 중 오류가 발생했습니다. 다시 시도해주세요.',
      type: 'negative',
      position: 'bottom',
      color: 'red-10',
    });
    isNicknameChcked.value = false;
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
