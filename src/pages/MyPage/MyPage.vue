<template>
  <section class="main-wrapper">
    <div class="profile-wrapper">
      <q-avatar size="60px">
        <img :src="profileImage" alt="default_image" />
      </q-avatar>
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="onFileChange"
        style="display: none"
      />
      <q-btn
        class="upload-photo"
        :class="{ 'upload-photo-active': isImageUploaded }"
        :label="buttonLabel"
        @click="uploadPhoto"
      >
      </q-btn>
    </div>

    <div class="nickname-wrapper">
      <div class="info-group">
        <div class="label">닉네임</div>
        <div class="value">{{ profileStore.profile.nickname }}</div>
        <q-btn
          class="edit-button"
          label="Edit"
          to="/checkPasswordForNickname"
        ></q-btn>
      </div>
      <div class="info-group">
        <div class="label">Email</div>
        <div class="value">{{ profileStore.profile.email }}</div>
      </div>
      <div class="info-group">
        <div class="label">PASSKEY 등록</div>
        <q-btn
          class="edit-button"
          label="REGISTER"
          @click="passkeyRegister"
        ></q-btn>
      </div>
      <div class="info-group">
        <div class="label">비밀번호 변경</div>
        <q-btn class="edit-button" label="Edit" to="/checkPassword"></q-btn>
      </div>
      <div class="info-group">
        <div class="label">로그아웃</div>
        <!-- <div class="value">대전시 덕명동</div> -->
        <q-btn class="edit-button" label="Logout" @click="logout"></q-btn>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProfileStore } from 'src/stores/profileStore';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { startRegistration } from '@simplewebauthn/browser';

const profileStore = useProfileStore();

const router = useRouter();
const $q = useQuasar();

const profileImage = ref(profileStore.profile.profileImage);
const fileInput = ref(null);
const buttonLabel = ref('Upload Photo');
const isImageUploaded = ref(false);
let uploadedFile = null;

const uploadPhoto = () => {
  if (isImageUploaded.value && uploadedFile) {
    uploadProfileImage();
  } else {
    fileInput.value.click();
  }
};

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        profileImage.value = e.target.result as string;
        buttonLabel.value = '프로필 이미지 변경';
        isImageUploaded.value = true;
        uploadedFile = file;
      }
    };
    reader.readAsDataURL(file);
  }
};

const uploadProfileImage = async () => {
  try {
    const formData = new FormData();
    formData.append('profile-image', uploadedFile);

    const response = await api.patch('/users/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      profileStore.profile.profileImage =
        import.meta.env.VITE_BASE_URL_IMAGE + response.data['profile-image'];

      alert('프로필 이미지 변경 성공');
    }
  } catch (error) {
    console.error('Error uploading profile image:', error);
  }
};

const logout = async () => {
  try {
    localStorage.removeItem('accessToken'); // 토큰 제거
    $q.notify({
      message: '로그아웃 되었습니다.',
      type: 'positive',
      position: 'bottom',
    });
    router.push('/'); // 홈 화면으로 리디렉션
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

const passkeyRegister = async () => {
  try {
    const email = profileStore.profile.email;

    const resp = await fetch(
      `http://localhost:8080/api/passkey/register?email=${encodeURIComponent(email)}`,
    );
    const optionsJSON = await resp.json();

    let attResp;
    try {
      // Pass the options to the authenticator and wait for a response
      attResp = await startRegistration({ optionsJSON }); // Correct passing of options
    } catch (error) {
      // Some basic error handling
      if (error.name === 'InvalidStateError') {
        $q.notify({
          message: '이미 등록된 사용자 입니다.',
          type: 'negative',
          position: 'top',
          timeout: 500, // 1초 후 자동으로 닫힘
        });
      }
      throw error;
    }

    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyRegistrationResponse()
    const verificationResp = await fetch(
      'http://localhost:8080/api/passkey/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attResp),
      },
    );

    // Wait for the results of verification
    const verificationJSON = await verificationResp.json();

    // Show UI appropriate for the `verified` status
    if (verificationJSON && verificationJSON.verified) {
      $q.notify({
        message: 'PASSKEY 등록 완료',
        type: 'positive',
        position: 'top',
        timeout: 500, // 1초 후 자동으로 닫힘
      });
    }
  } catch (error) {
    throw error;
  }
};

onMounted(() => {
  console.log(`이메일 값 === [${profileStore.profile.email}]`);
  console.log(`프로필 이미지 값 === [${profileStore.profile.profileImage}]`);
});
</script>

<style scoped lang="scss">
.main-wrapper {
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-photo {
  width: 120px;
  height: 30px;
  border-radius: 100px;
  background: #f0effa;
  font-size: 12px;
  margin-top: 12px;
}

.upload-photo-active {
  background: #4caf50 !important;
  color: #ffffff !important;
  font-weight: bold !important;
  font-size: 10px;
}

.nickname-wrapper {
  margin-top: 36px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  color: rgba(31, 31, 31, 0.7);
  font-family: 'Outfit-Medium', sans-serif;
  font-size: 12px;
  font-weight: 500;
}

.value {
  color: rgba(34, 34, 34, 0.9);
  font-family: 'Outfit-Medium', sans-serif;
  font-size: 12px;
  font-weight: 500;
}

.edit-button {
  background: #f0effa;
  border-radius: 72.66px;
  padding: 3px 11px;
  font-size: 8px;
  font-weight: bold;
}

.logout-button {
  background: #f0effa;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: bold;
  margin-top: 20px;
  align-self: center;
}
</style>
