<template>
  <div class="blog-detail">
    <BaseIcon
      class="eva-arrow-back-fill"
      icon="backArrow"
      @click.stop="router.back()"
    />

    <div class="frame-4171">
      <img
        class="unsplash-b-hn-3-ww-jb-fzy"
        src="unsplash-b-hn-3-ww-jb-fzy0.png"
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
            <img class="rectangle-3764" src="rectangle-37640.png" />
          </div>
        </div>
      </div>
      <div class="frame-4167">
        <div
          class="lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-maecenas-id-sit-eu-tellus-sed-cursus-eleifend-id-porta-lorem-adipiscing-mus-vestibulum-consequat-porta-eu-ultrices-feugiat-et-faucibus-ut-amet-turpis-facilisis-faucibus-semper-cras-purus"
        >
          {{ record.content }}
        </div>
        <div
          class="lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-maecenas-id-sit-eu-tellus-sed-cursus-eleifend-id-porta"
        >
          테스트 텍스트1
        </div>
        <div
          class="fermentum-et-eget-libero-lectus-amet-tellus-aliquam-dignissim-enim-placerat-purus-nunc-ac-ipsum-ac-pretium"
        >
          테스트 텍스트2
        </div>
      </div>
    </div>

    <img class="image-5" src="image-50.png" />
    <div class="frame-3870"></div>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios';
import BaseIcon from 'src/components/BaseComponent/BaseIcon.vue';
import { useProfileStore } from 'src/stores/profileStore';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const profileStore = useProfileStore();
const router = useRouter();
const route = useRoute();

const userId = profileStore.profile.id;
const recordId = route.params.id;
const record = ref([]);

const fetchSingleRecord = async () => {
  const response = await api.get(`/records/${userId}/${recordId}`);

  record.value = response.data.record;
};

onMounted(() => {
  fetchSingleRecord();
});
</script>

<style scoped>
.blog-detail,
.blog-detail * {
  box-sizing: border-box;
}
.blog-detail {
  background: #ffffff;
  border-style: solid;
  border-color: #ffffff;
  border-width: 12px;
  height: 812px;
  position: relative;
  box-shadow: var(
    --shadow-box-shadow,
    0px 1.99px 2.09px 0px rgba(0, 0, 0, 0.02),
    0px 4.53px 4.76px 0px rgba(0, 0, 0, 0.02),
    0px 7.88px 8.28px 0px rgba(0, 0, 0, 0.03),
    0px 12.52px 13.15px 0px rgba(0, 0, 0, 0.04),
    0px 19.32px 20.29px 0px rgba(0, 0, 0, 0.04),
    0px 30.15px 31.65px 0px rgba(0, 0, 0, 0.05),
    0px 50.05px 52.55px 0px rgba(0, 0, 0, 0.05),
    0px 100px 105px 0px rgba(0, 0, 0, 0.07)
  );
  overflow: hidden;
}
.frame-4171 {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  left: 20px;
  top: 124px;
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
.lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-maecenas-id-sit-eu-tellus-sed-cursus-eleifend-id-porta-lorem-adipiscing-mus-vestibulum-consequat-porta-eu-ultrices-feugiat-et-faucibus-ut-amet-turpis-facilisis-faucibus-semper-cras-purus {
  color: var(--main-black, #2c2c2c);
  text-align: left;
  font-family: 'OpenSans-Regular', sans-serif;
  font-size: 16px;
  font-weight: 400;
  position: relative;
  width: 335px;
  height: 134px;
}
.lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-maecenas-id-sit-eu-tellus-sed-cursus-eleifend-id-porta {
  color: var(--main-black, #2c2c2c);
  text-align: left;
  font-family: 'OpenSans-Regular', sans-serif;
  font-size: 16px;
  font-weight: 400;
  position: relative;
  width: 335px;
  height: 69px;
}
.fermentum-et-eget-libero-lectus-amet-tellus-aliquam-dignissim-enim-placerat-purus-nunc-ac-ipsum-ac-pretium {
  color: var(--main-black, #2c2c2c);
  text-align: left;
  font-family: 'OpenSans-Regular', sans-serif;
  font-size: 16px;
  font-weight: 400;
  position: relative;
  width: 335px;
}
.eva-arrow-back-fill {
  width: 36px;
  height: 36px;
  position: absolute;
  left: 20px;
  top: 62px;
  overflow: visible;
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

<!-- <template>
  <div>
    <h3>피드 디테일 페이지</h3>
    <p>게시글 아이디 === {{ route.params.id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped></style> -->
