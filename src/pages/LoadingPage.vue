<template>
  <div class="loading">
    <div class="title">환경 보호 Application</div>
    <div class="subtitle">Garbage Collector</div>
    <img src="src/assets/gc-white.png" alt="Loading..." class="loading-image" />
  </div>
</template>

<script>
export default {
  name: 'LoadingPage',
  mounted() {
    // 로딩 페이지가 마운트될 때 배경색 변경
    document.body.style.backgroundColor = '#489743';
  },
  beforeUnmount() {
    // 로딩 페이지가 해제될 때 배경색을 흰색으로 변경
    document.body.style.backgroundColor = '#ffffff';
  },
};
</script>

<style>
.loading {
  display: flex;
  flex-direction: column; /* 이미지와 텍스트 세로로 정렬 */
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #489743; /* 원하는 배경색으로 변경 */
}

.loading-image {
  width: 80%; /* 화면 너비의 80%로 조정 */
  max-width: 200px; /* 최대 너비를 400px로 설정 */
  height: auto; /* 비율에 맞게 높이를 자동 조정 */
}

.title {
  font-family: 'OpenSans-Bold', sans-serif;
  font-size: 30px; /* 텍스트 크기 조정 */
  font-weight: bold; /* 굵게 설정 */
  color: white; /* 텍스트 색상 설정 */
  margin-bottom: 8px; /* 요소 간의 여백 조정 */
}

.subtitle {
  font-size: 20px; /* 텍스트 크기 조정 */
  font-weight: bold; /* 굵게 설정 */
  color: white;
  margin-bottom: 16px; /* 이미지와 간격을 두기 위해 여백 추가 */
}
</style>
