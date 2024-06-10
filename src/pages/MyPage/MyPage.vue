<template>
  <section class="main-wrapper">
    <div class="profile-wrapper">
      <q-avatar size="60px">
        <img src="../../assets/logo.png" alt="default_image" />
      </q-avatar>
      <q-btn class="upload-photo" label="Upload Photo"> </q-btn>
    </div>

    <div class="frame-1321314473">
      <div class="div">닉네임</div>
      <div class="juno">Juno</div>
      <div class="frame-1321314474">
        <div class="edit">Edit</div>
      </div>
      <div class="email">Email</div>
      <div class="siddxd-growthx-com">siddxd@growthx.com</div>
      <div class="frame-1321314475">
        <div class="edit">Edit</div>
      </div>
      <div class="div2">자주 플로깅하는 장소</div>
      <div class="div3">대전시 덕명동</div>
      <div class="frame-1321314476">
        <div class="edit">Edit</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main-wrapper {
  padding: 48px 24px;
}
.upload-photo {
  width: 120px;
  height: 10px;
  border-radius: 100px;
  background: #f0effa;
  font-size: 12px;
  margin-top: 12px;
}
.profile-wrapper {
  display: flex;
  flex-direction: column;
}
.frame-1321314473,
.frame-1321314473 * {
  box-sizing: border-box;
}
.frame-1321314473 {
  margin: 36px 0 0 0;
  border-radius: 5px;
  border-style: solid;
  border-color: var(--input-box-stroke-thin, rgba(0, 0, 0, 0.15));
  border-width: 1px;
  flex-shrink: 0;
  height: 277px;
  position: relative;
  box-shadow: var(
    --thin-shadow-2-2-10-box-shadow,
    0px 2px 2px 0px rgba(0, 0, 0, 0.1)
  );
  overflow: hidden;
}
.div {
  color: rgba(31, 31, 31, 0.7);
  text-align: left;
  font-family: 'Outfit-Medium', sans-serif;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  left: 16px;
  top: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.juno {
  color: rgba(34, 34, 34, 0.9);
  text-align: left;
  font-family: 'Outfit-Medium', sans-serif;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  left: 16px;
  top: 42px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.frame-1321314474 {
  background: #f0effa;
  border-radius: 72.66px;
  padding: 3.63px 11.63px 3.63px 11.63px;
  width: 46px;
  height: 18px;
  position: absolute;
  left: 271px;
  top: 40px;
  overflow: hidden;
}
.edit {
  color: var(--dark-all-content, rgba(31, 31, 31, 0.8));
  text-align: left;
  font-family: 'Outfit-Medium', sans-serif;
  font-size: 7.266055583953857px;
  font-weight: 500;
  position: absolute;
  left: calc(50% - 6px);
  top: calc(50% - 4px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.email {
  color: rgba(31, 31, 31, 0.7);
  text-align: left;
  font-family: 'Outfit-Medium', sans-serif;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  left: 16px;
  top: 76px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.siddxd-growthx-com {
  color: rgba(34, 34, 34, 0.9);
  text-align: left;
  font-family: 'Outfit-Medium', sans-serif;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  left: 16px;
  top: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.frame-1321314475 {
  background: #f0effa;
  border-radius: 72.66px;
  padding: 3.63px 11.63px 3.63px 11.63px;
  width: 46px;
  height: 18px;
  position: absolute;
  left: 271px;
  top: 98px;
  overflow: hidden;
}
.div2 {
  color: rgba(31, 31, 31, 0.7);
  text-align: left;
  font-family: 'Outfit-Medium', sans-serif;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  left: 16px;
  top: 134px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.div3 {
  color: rgba(34, 34, 34, 0.9);
  text-align: left;
  font-family: 'Outfit-Medium', sans-serif;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  left: 16px;
  top: 158px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.frame-1321314476 {
  background: #f0effa;
  border-radius: 72.66px;
  padding: 3.63px 11.63px 3.63px 11.63px;
  width: 46px;
  height: 18px;
  position: absolute;
  left: 271px;
  top: 156px;
  overflow: hidden;
}
</style>
