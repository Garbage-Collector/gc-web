<template>
  <section class="main-wrapper">
    <BaseIcon
      class="eva-arrow-back-fill"
      icon="backArrow"
      @click.stop="router.back()"
    />

    <div class="frame-4171">
      <img
        class="unsplash-b-hn-3-ww-jb-fzy"
        :src="`${baseUrl}${record.image[0].imageUrl}`"
        alt="Record Image"
      />
      <div class="frame-4170">
        <div class="frame-4169">
          <div class="frame-4149">
            <div class="div">{{ record.location }}</div>
          </div>
          <div class="frame-4160">
            <div class="jan-1-2021">{{ record.startTime }}</div>
          </div>
        </div>
        <div class="div2">
          <br />
          {{ record.title }}
        </div>
        <div class="frame-4168">
          <div class="group-4170">
            <div class="by-mason-eduard">
              <span>
                <span class="by-mason-eduard-span">By:</span>
                <span class="by-mason-eduard-span2">{{
                  profileStore.profile.nickname
                }}</span>
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
        <div class="record-content">
          {{ record.content }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import BaseIcon from 'src/components/BaseComponent/BaseIcon.vue';
import { useProfileStore } from 'src/stores/profileStore';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import profilePicture from '../../assets/logo.png';

const profileStore = useProfileStore();
const router = useRouter();
const route = useRoute();
const baseUrl = import.meta.env.VITE_BASE_URL.slice(0, -4);

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

const fetchSingleRecord = async () => {
  await api.get(`/records/${userId}/${recordId}`).then((res) => {
    console.log(res.data.record);
    record.value = res.data.record;
  });
};

onBeforeMount(() => {
  fetchSingleRecord();
});
</script>

<style scoped>
.main-wrapper {
  padding: 48px 24px;
}
.frame-4171 {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
}
.unsplash-b-hn-3-ww-jb-fzy {
  border-radius: 16px;
  flex-shrink: 0;
  width: 335px;
  height: 204px;
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
  color: var(--gray-3, #828282);
  text-align: right;
  font-family: 'OpenSans-Light', sans-serif;
  font-size: 10px;
  font-weight: 300;
  position: relative;
  width: 60px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.div2 {
  color: var(--main-black, #2c2c2c);
  text-align: left;
  font-family: 'OpenSans-Bold', sans-serif;
  font-size: 24px;
  font-weight: 700;
  position: relative;
  width: 335px;
  height: 70px;
}
.frame-4168 {
  display: flex;
  flex-direction: row;
  gap: 186px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
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
  color: var(--gray-1, #333333);
  font-family: 'OpenSans-Regular', sans-serif;
  font-size: 10px;
  font-weight: 400;
  text-decoration: underline;
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
</style>
