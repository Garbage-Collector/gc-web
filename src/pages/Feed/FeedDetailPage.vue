<template>
  <section class="main-wrapper">
    <div class="div2">
      <q-btn
        padding="sm"
        color="green"
        round
        icon="chevron_left"
        @click="router.back()"
        class="back-button"
      />
      <br />
      {{ record.title }}
    </div>
    <div class="frame-4171">
      <div class="image-container">
        <img
          :src="`${baseUrl}${record.image[currentImageIndex].imageUrl}`"
          alt="Record Image"
          class="record-image"
        />
      </div>
      <div class="arrow-buttons">
        <q-btn
          flat
          icon="chevron_left"
          @click="prevImage"
          :disabled="currentImageIndex === 0"
          class="arrow-btn left"
        />
        <q-btn
          flat
          icon="chevron_right"
          @click="nextImage"
          :disabled="currentImageIndex === record.image.length - 1"
          class="arrow-btn right"
        />
      </div>
      <div class="frame-4170">
        <div class="frame-4169">
          <div class="frame-4149">
            <div class="div">{{ record.location }}</div>
          </div>
          <div class="frame-4160">
            <div class="jan-1-2021">날짜: {{ record.startTime }}</div>
          </div>
        </div>
        <div class="frame-4168">
          <div class="group-4170">
            <div class="by-mason-eduard">
              <span>
                <span class="by-mason-eduard-span2"
                  >작성자: {{ profileStore.profile.nickname }}</span
                >
              </span>
            </div>
            <img
              class="rectangle-3764"
              :src="profilePicture"
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>
      <div class="frame-4167">
        <div class="div3">내용</div>
        <div class="record-content">
          {{ record.content }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { useProfileStore } from 'src/stores/profileStore';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import profilePicture from '../../assets/logo.png';

const profileStore = useProfileStore();
const router = useRouter();
const route = useRoute();
const baseUrl = import.meta.env.VITE_BASE_URL_IMAGE;

const userId = profileStore.profile.id;
const recordId = route.params.id;
const record = ref({
  image: [] as { imageUrl: string }[],
  imageUrl: '',
  location: '',
  startTime: '',
  title: '',
  content: '',
});

const currentImageIndex = ref(0); // 현재 이미지 인덱스

const fetchSingleRecord = async () => {
  await api.get(`/records/${userId}/${recordId}`).then((res) => {
    console.log(`res.data === [${JSON.stringify(res.data)}]`);
    console.log(res.data.record);
    record.value = res.data;
  });
};

onBeforeMount(() => {
  fetchSingleRecord();
});

// 이전 이미지로 이동
const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

// 다음 이미지로 이동
const nextImage = () => {
  if (currentImageIndex.value < record.value.image.length - 1) {
    currentImageIndex.value++;
  }
};
</script>

<style scoped>
.main-wrapper {
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 48px;
  padding-bottom: 1500px;
  overflow-y: auto; /* 스크롤 추가 */
}

.frame-4171 {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  position: absolute;
}

.unsplash-b-hn-3-ww-jb-fzy {
  border-radius: 16px;
  flex-shrink: 0;
  width: 350px;
  height: 250px;
  position: relative;
  object-fit: cover;
}

.frame-4170 {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
}

.frame-4169 {
  display: flex;
  flex-direction: row;
  gap: 155px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 335px;
  position: relative;
}

.frame-4149 {
  background: #57bd84;
  border-radius: 6px;
  padding: 6px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 87px;
  height: 27px;
  position: relative;
}

.div {
  color: #ffffff;
  text-align: center;
  font-family: 'OpenSans-SemiBold', sans-serif;
  font-size: 12px;
  font-weight: 600;
  position: relative;
  width: 70px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.frame-4160 {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}

.jan-1-2021 {
  color: var(#828282);
  text-align: right;
  font-size: 10px;
  font-weight: 500;
  position: relative;
  width: auto;
  max-width: 150px; /* 필요에 따라 너비 조정 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘칠 경우 숨김 */
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.div2 {
  color: var(--main-black, #2c2c2c);
  text-align: center;
  font-family: 'OpenSans-Bold', sans-serif;
  font-size: 24px;
  font-weight: 700;
  position: relative;
  width: 335px;
  height: 70px;
  margin-bottom: 20px;
}

.div3 {
  color: var(--main-black, #2c2c2c);
  text-align: left;
  font-family: 'OpenSans-Bold', sans-serif;
  font-size: 24px;
  font-weight: 700;
  position: relative;
  margin-bottom: 0px;
}

.frame-4168 {
  display: flex;
  flex-direction: row;
  gap: 186px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
  margin-bottom: 30px;
}

.group-4170 {
  flex-shrink: 0;
  width: 125px;
  height: 24px;
  position: static;
}

.by-mason-eduard {
  color: var(--gray-1, #333333);
  text-align: left;
  font-family: 'OpenSans-Regular', sans-serif;
  font-size: 10px;
  font-weight: 400;
  position: absolute;
  left: 32px;
  top: 4px;
  width: 93px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.by-mason-eduard-span {
  color: var(--gray-1, #333333);
  font-family: 'OpenSans-Regular', sans-serif;
  font-size: 10px;
  font-weight: 400;
}

.by-mason-eduard-span2 {
  color: var(#333333);
  font-family: 'OpenSans-Regular', sans-serif;
  font-size: 15px;
  font-weight: bold;
}

.rectangle-3764 {
  border-radius: 4px;
  width: 24px;
  height: 24px;
  position: absolute;
  left: 0px;
  top: 0px;
  object-fit: cover;
}

.frame-4167 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
}

.record-content {
  color: var(--main-black, #2c2c2c);
  text-align: left;
  font-family: 'OpenSans-Regular', sans-serif;
  font-size: 16px;
  font-weight: 400;
  position: relative;
  width: 335px;
  height: auto;
  white-space: pre-wrap;
  background: #f0f0f0; /* 원하는 배경색으로 변경 */
  padding: 16px; /* 내용과 테두리 사이 여백 */
  border-radius: 8px; /* 테두리 둥글게 */
}

.eva-arrow-back-fill {
  width: 36px;
  height: 36px;
}

.image-5 {
  opacity: 0.8799999952316284;
  width: 390px;
  height: 74px;
  position: absolute;
  left: -15px;
  top: 750px;
  object-fit: cover;
}

.group-3894 {
  position: sticky;
  left: 0px;
  top: 0px;
}

.frame-3870 {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0px;
  top: 0px;
}

.ios-status-bar-black {
  flex-shrink: 0;
  height: 44px;
  position: relative;
}

.action {
  position: absolute;
  inset: 0;
}

.time {
  color: var(--black, #000000);
  text-align: center;
  font-family: 'SfProText-Semibold', sans-serif;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: -0.17px;
  font-weight: 600;
  position: absolute;
  left: 19.89px;
  top: calc(50% - 8px);
  width: 54px;
}

.container {
  height: auto;
  position: absolute;
  left: 293.5px;
  top: 17.16px;
  overflow: visible;
}

.image-container {
  width: 360px;
  height: 450px;
  position: relative;
}

.record-image {
  border-radius: 16px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.arrow-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.arrow-btn {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.1);
}

.left {
  margin-right: 10px;
}

.right {
  margin-left: 10px;
}

.back-button {
  position: absolute;
  top: 20px; /* 화면 위쪽에서의 거리 */
  left: 10px; /* 화면 왼쪽에서의 거리 */
}
</style>
