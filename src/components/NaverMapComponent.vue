<script setup>
import { NaverMap, NaverMarker, NaverPolyline } from 'vue3-naver-maps';
import { ref, onMounted } from 'vue';

const props = defineProps({
  datas: {
    type: Array,
  },
});

// 지도 옵션과 로딩 상태 설정
const mapOptions = ref({
  latitude: 37.507342, // 기본 지도 위도
  longitude: 127.052023, // 기본 지도 경도
  zoom: 18,
  zoomControl: false,
  zoomControlOptions: { position: 'TOP_RIGHT' },
});
const isLoading = ref(true);

const UPDATE_INTERVAL = 60 * 1000;

// 위치 정보를 로드하는 함수
function loadLocationFromLocalStorage() {
  const savedLat = localStorage.getItem('latitude');
  const savedLng = localStorage.getItem('longitude');
  const lastUpdated = localStorage.getItem('lastUpdated');

  if (savedLat && savedLng && lastUpdated) {
    const timeElapsed = Date.now() - parseInt(lastUpdated, 10);
    if (timeElapsed < UPDATE_INTERVAL) {
      mapOptions.value.latitude = parseFloat(savedLat);
      mapOptions.value.longitude = parseFloat(savedLng);
      isLoading.value = false; // 로딩 완료
      return true;
    }
  }
  return false;
}

// 위치 정보를 가져와서 localStorage에 저장하는 함수
function saveCurrentLocation(position) {
  const { latitude, longitude } = position.coords;
  mapOptions.value.latitude = latitude;
  mapOptions.value.longitude = longitude;

  // 위치 정보와 마지막 업데이트 시간을 로컬 스토리지에 저장
  localStorage.setItem('latitude', latitude.toString());
  localStorage.setItem('longitude', longitude.toString());
  localStorage.setItem('lastUpdated', Date.now().toString());

  isLoading.value = false; // 로딩 완료
  console.log('로딩 완료: 새 위치 정보 저장');
}

onMounted(() => {
  if (!loadLocationFromLocalStorage()) {
    // 로컬 스토리지에 저장된 위치가 없거나 업데이트 시간이 초과된 경우, 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(saveCurrentLocation, (error) => {
        console.error('Error getting location: ', error);
        alert('현재 위치를 가져올 수 없습니다. 기본 위치를 표시합니다.');
        isLoading.value = false; // 로딩 완료
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('위치 정보를 사용할 수 없는 브라우저입니다.');
      isLoading.value = false; // 로딩 완료
    }
  }
});
</script>

<template>
  <div v-if="isLoading" class="loading">지도를 로딩 중입니다...</div>
  <naver-map v-else :mapOptions="mapOptions" style="width: 100%; height: 470px">
    <naver-marker
      v-for="data in props.datas"
      :key="data.id"
      :latitude="data.lat"
      :longitude="data.lng"
    >
      <div class="marker">
        <img
          :src="data.imageUrl"
          style="width: 60px; height: 60px; border-radius: 50%"
        />
      </div>
    </naver-marker>
    <naver-polyline
      :path="props.datas.map((data) => ({ lat: data.lat, lng: data.lng }))"
      :options="{
        strokeColor: '#87db5e',
        strokeWeight: 6,
      }"
    />
  </naver-map>
</template>

<style scoped>
.marker img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.loading {
  font-size: 20px;
  text-align: center;
  padding: 20px;
}
</style>
