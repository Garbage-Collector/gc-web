<template>
  <section class="main-wrapper">
    <q-btn
      padding="sm"
      color="green"
      round
      icon="chevron_left"
      @click="router.back()"
    />
    <p class="text-bold text-h5 q-mt-xl">비밀번호 확인</p>
    <div class="flex column q-mb-lg">
      <span class="text-grey-6">본인확인을 위해 비밀번호를 입력해주세요.</span>
    </div>

    <q-input
      bottom-slots
      v-model="password"
      type="password"
      label="기존 비밀번호"
      dense
      class="input-spacing"
      placeholder="기존 비밀번호"
    >
      <template v-slot:before>
        <q-icon name="lock" />
      </template>
    </q-input>

    <q-btn
      label="확인"
      color="primary"
      class="next-button"
      @click="checkPassword"
    />
  </section>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api, setHeaderToken } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const password = ref('');
const $q = useQuasar();

const checkPassword = async () => {
  try {
    setHeaderToken(localStorage.getItem('accessToken'));
    const response = await api.post('/users/password-check', {
      password: password.value,
    });

    if (response.data.verified) {
      $q.notify({
        message: '비밀번호가 확인되었습니다.',
        type: 'positive',
        position: 'bottom',
      });
      router.push('/changeNickname');
    } else {
      $q.notify({
        message: '비밀번호가 일치하지 않습니다.',
        type: 'negative',
        position: 'bottom',
      });
    }
  } catch (error) {
    $q.notify({
      message: '비밀번호 확인 중 오류가 발생했습니다.',
      type: 'negative',
      position: 'bottom',
    });
  }
};
</script>

<style scoped lang="scss">
.main-wrapper {
  padding: 48px 24px;
}

.input-field {
  margin-top: 16px;
  width: 342px;
}

input::placeholder {
  color: #ccc;
  opacity: 1;
}

.input-wrapper {
  width: 364px;
  height: 82px;
}

.next-button {
  margin-top: 24px;
  position: absolute;
  right: 24px;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

::v-deep .q-time__clock-circle {
  color: black;
}
::v-deep .q-time__clock {
  background-color: white;
}
::v-deep .q-time__container-child {
  border: 1px solid #aadec2;
}
</style>
