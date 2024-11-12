<template>
  <section class="main-wrapper" ref="captureArea">
    <header class="text-bold text-h5" :style="{ marginBottom: '0.5rem' }">
      {{ currentDate }}
    </header>

    <NaverMapComponent :datas="markerData" ref="captureArea" />

    <section class="status-bar">
      <div class="status-time">
        <p v-if="countdown > 0" key="countdown">
          {{ countdown }}
        </p>
        <p v-else key="time">{{ elapsedTime }}</p>
      </div>
    </section>

    <section class="bottom_bar">
      <q-btn
        round
        color="green"
        icon="add_a_photo"
        @click="triggerCamera"
        class="camera_button"
        size="20px"
      >
        <input
          type="file"
          accept="image/*"
          capture="environment"
          @change="handleFileChange"
          ref="fileInput"
          style="display: none"
        />
      </q-btn>

      <q-btn
        class="plogging_button"
        round
        color="green"
        :label="isPlogging ? '일시중지' : '시작'"
        size="20px"
        @click="handleStartButton"
      />
      <q-btn
        class="plogging_button"
        round
        color="green"
        label="종료"
        size="20px"
        @click="showConfirmDialog"
      />
    </section>

    <q-dialog v-model="confirmDialog" persistent>
      <q-card class="confirm-dialog-card">
        <q-card-section class="column items-center">
          <q-avatar
            icon="delete"
            color="green"
            text-color="white"
            class="q-mb-md"
          />
          <div class="dialog-text">
            <p class="text-bold text-h6 dialog-title">정말 종료하시겠어요?</p>
            <p class="dialog-description">
              종료 후에는 현재 이미지가 캡쳐돼요!
            </p>
            <p class="dialog-description">
              마커가 잘 보이도록 지도를 조정하고 종료해주세요.
            </p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="취소" color="primary" v-close-popup />
          <q-btn flat label="종료" color="negative" @click="confirmStop" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="writePromptDialog" persistent>
      <q-card class="write-prompt-dialog-card">
        <q-card-section class="column items-center">
          <q-avatar
            icon="edit"
            color="green"
            text-color="white"
            class="q-mb-md"
          />
          <div class="dialog-text">
            <p class="text-bold text-h6 dialog-title">
              오늘의 플로깅을 기록해보시겠어요?
            </p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="취소" color="red" v-close-popup />
          <q-btn flat label="확인" color="positive" @click="goToWritePage" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QBtn,
  QAvatar,
} from 'quasar';
import { useRouter } from 'vue-router';
import NaverMapComponent from 'components/NaverMapComponent.vue';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { setHeaderToken } from 'src/boot/axios';
import html2canvas from 'html2canvas'; // html2canvas import

const router = useRouter();

const markerData = ref([]); // ref로 변경
const captureArea = ref(null); // 캡처할 영역을 참조하는 ref

const currentDate = ref(getCurrentDate()); // 현재 날짜를 계산하는 ref

const fileInput = ref<HTMLInputElement | null>(null);
const elapsedTime = ref('00:00:00');
const isPlogging = ref(false);
const isFirstStart = ref(true); // 처음 시작 여부를 확인하는 변수
const confirmDialog = ref(false);
const writePromptDialog = ref(false); // 새로운 다이얼로그에 대한 ref
const countdown = ref(0); // 카운트다운 변수
let timerInterval: NodeJS.Timeout | null = null;
let countdownInterval: NodeJS.Timeout | null = null;
let totalElapsed = ref(0); // 총 경과 시간 (밀리초 단위)
let lastStartTime = 0; // 마지막 시작 시간 (밀리초 단위)

function getCurrentDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
}

function triggerCamera() {
  if (fileInput.value) {
    fileInput.value?.click();
  }
}

function handleFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      getCurrentLocation((lat, lng) => {
        const marker = {
          id: uuidv4(), // UUID로 ID 생성
          lat: lat,
          lng: lng,
          imageUrl: base64String,
        };
        markerData.value.push(marker); // 마커 데이터를 markerData에 저장
        console.log(`마커데이터 === [${JSON.stringify(markerData.value)}]`);
      });
    };
    reader.readAsDataURL(file);
  }
}

// function getCurrentLocation(callback: (lat: number, lng: number) => void) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         console.log(`lat === [${lat}], lng === [${lng}]`);
//         callback(lat, lng);
//       },
//       (error) => {
//         console.error('Error getting location: ', error);
//         callback(37.507342, 127.052023); // 기본 위치로 설정
//       },
//     );
//   } else {
//     console.error('Geolocation is not supported by this browser.');
//     callback(37.507342, 127.052023); // 기본 위치로 설정
//   }
// }

function getCurrentLocation(callback: (lat: number, lng: number) => void) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(`lat === [${lat}], lng === [${lng}]`);
        callback(lat, lng);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('위치 권한이 거부되었습니다. 위치 권한을 활성화해주세요.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('위치 정보를 사용할 수 없습니다. 다시 시도해주세요.');
            break;
          case error.TIMEOUT:
            alert(
              '위치 정보를 가져오는 데 시간이 초과되었습니다. 다시 시도해주세요.',
            );
            break;
          default:
            alert('위치 정보를 가져오는 중 알 수 없는 오류가 발생했습니다.');
        }
      },
      {
        timeout: 10000,
        maximumAge: 0,
        enableHighAccuracy: true,
      },
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

function startTimer() {
  lastStartTime = Date.now();
  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const elapsedSinceLastStart = currentTime - lastStartTime;
    totalElapsed.value += elapsedSinceLastStart;
    lastStartTime = currentTime;
    updateElapsedTime();
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    isPlogging.value = false;
    totalElapsed.value = 0;
    elapsedTime.value = '00:00:00';
    isFirstStart.value = true; // 종료 후 다시 처음으로 설정
    sendMarkerData(); // 타이머 종료 후 마커 데이터 전송
  }
}

function showConfirmDialog() {
  confirmDialog.value = true;
}

async function confirmStop() {
  await captureScreen();
  stopTimer();
  confirmDialog.value = false;
  writePromptDialog.value = true; // 새로운 다이얼로그 표시
}

function handleStartButton() {
  if (isFirstStart.value) {
    startCountdown();
  } else {
    toggleTimer();
  }
}

function startCountdown() {
  countdown.value = 3;
  countdownInterval = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value--;
    } else {
      clearInterval(countdownInterval);
      countdown.value = 0;
      isFirstStart.value = false;
      toggleTimer();
    }
  }, 1000);
}

function toggleTimer() {
  if (isPlogging.value) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  } else {
    lastStartTime = Date.now();
    startTimer();
  }
  isPlogging.value = !isPlogging.value;
}

function updateElapsedTime() {
  const elapsed = totalElapsed.value;
  const hours = Math.floor(elapsed / (1000 * 60 * 60))
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, '0');
  elapsedTime.value = `${hours}:${minutes}:${seconds}`;
}

async function captureScreen() {
  try {
    const element = captureArea.value;
    if (element) {
      const canvas = await html2canvas(element, { useCORS: true });
      const dataUrl = canvas.toDataURL();
      console.log(dataUrl);

      // Save image to user's device
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'screenshot.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch (err) {
    console.error('Error: ' + err);
  }
}

async function sendMarkerData() {
  const ploggingMapId = uuidv4(); // 새로운 UUID 생성
  const ploggingMapMarkerData = markerData.value.map((marker) => ({
    id: marker.id,
    lat: marker.lat,
    lng: marker.lng,
    imageUrl: marker.imageUrl,
  }));

  const payload = {
    ploggingMap: {
      id: ploggingMapId,
      ploggingMapMarkerData,
    },
  };

  try {
    setHeaderToken(localStorage.getItem('accessToken'));
    await axios.post('/plogging-map', payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log('전송성공');
  } catch (error) {
    console.error('전송실패', error);
  }
}

function goToWritePage() {
  router.push('/write');
}
</script>

<style scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 추가: 세로 중앙 정렬 */
  align-items: center; /* 확인: 가로 중앙 정렬 */
  padding: 20px; /* 간격 추가 */
  width: 100%; /* 전체 너비 사용 */
}

.bottom_bar {
  margin-top: 0px;
}

.status-bar {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 아이템들 세로 중앙 정렬 */
  width: 100%; /* 너비 100%로 설정 */
  margin: 20px 0; /* 상하 여백 추가 */
}

.plogging_button,
.camera_button {
  width: 80px; /* 버튼 너비 */
  height: 80px; /* 버튼 높이 */
  margin: 0 15px; /* 좌우 마진 추가 */
  font-weight: bold;
}

.status-bar {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 아이템들 세로 중앙 정렬 */
  width: 100%; /* 너비 100%로 설정 */
  margin: 20px 0; /* 상하 여백 추가 */
  text-align: center; /* 추가: 텍스트 중앙 정렬 */
}

.status-time {
  font-size: 24px;
  font-weight: bold;
}

.confirm-dialog-card,
.write-prompt-dialog-card {
  max-width: 400px;
  width: 100%;
  border-radius: 8px;
}

.dialog-text {
  text-align: center;
  margin: 10px 0;
}

.dialog-title {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #3a3a3a;
}

.dialog-description {
  font-size: 1em;
  color: #555;
  margin-bottom: 5px;
}

.q-btn[flat] {
  margin: 0 5px;
}
</style>
