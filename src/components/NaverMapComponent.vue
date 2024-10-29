<!--<script setup>-->
<!--import { NaverMap, NaverMarker, NaverPolyline } from 'vue3-naver-maps';-->
<!--import { ref, onMounted } from 'vue';-->

<!--const props = defineProps({-->
<!--  datas: {-->
<!--    type: Array,-->
<!--  },-->
<!--});-->

<!--const mapOptions = ref({-->
<!--  latitude: 37.507342, // 기본 지도 중앙 위도-->
<!--  longitude: 127.052023, // 기본 지도 중앙 경도-->
<!--  zoom: 16,-->
<!--  zoomControl: false,-->
<!--  zoomControlOptions: { position: 'TOP_RIGHT' },-->
<!--});-->

<!--onMounted(() => {-->
<!--  if (navigator.geolocation) {-->
<!--    navigator.geolocation.getCurrentPosition(-->
<!--      (position) => {-->
<!--        mapOptions.value.latitude = position.coords.latitude;-->
<!--        mapOptions.value.longitude = position.coords.longitude;-->
<!--      },-->
<!--      (error) => {-->
<!--        console.error('Error getting location: ', error);-->
<!--      },-->
<!--    );-->
<!--  } else {-->
<!--    console.error('Geolocation is not supported by this browser.');-->
<!--  }-->
<!--});-->
<!--</script>-->

<!--<template>-->
<!--  <naver-map :mapOptions="mapOptions" style="width: 100%; height: 500px">-->
<!--    <naver-marker-->
<!--      v-for="data in props.datas"-->
<!--      :key="data.id"-->
<!--      :latitude="data.lat"-->
<!--      :longitude="data.lng"-->
<!--    >-->
<!--      <div class="marker">-->
<!--        <img-->
<!--          :src="data.imageUrl"-->
<!--          style="width: 60px; height: 70px; border-radius: 50%"-->
<!--        />-->
<!--      </div>-->
<!--    </naver-marker>-->
<!--    <naver-polyline-->
<!--      :path="props.datas.map((data) => ({ lat: data.lat, lng: data.lng }))"-->
<!--      :options="{-->
<!--        strokeColor: '#87db5e',-->
<!--        strokeWeight: 6,-->
<!--      }"-->
<!--    />-->
<!--  </naver-map>-->
<!--</template>-->

<!--<style scoped>-->
<!--.marker img {-->
<!--  width: 60px;-->
<!--  height: 70px;-->
<!--  border-radius: 50%;-->
<!--}-->
<!--</style>-->

<script setup>
import { NaverMap, NaverMarker, NaverPolyline } from 'vue3-naver-maps';
import { ref, onMounted } from 'vue';

const props = defineProps({
  datas: {
    type: Array,
  },
});

const mapOptions = ref({
  latitude: 37.507342, // 기본 지도 중앙 위도 (임시값)
  longitude: 127.052023, // 기본 지도 중앙 경도 (임시값)
  zoom: 18,
  zoomControl: false,
  zoomControlOptions: { position: 'TOP_RIGHT' },
});

// 지도 로딩 상태
const isLoading = ref(true);

function loadLocationFromLocalStorage() {
  const savedLat = localStorage.getItem('latitude');
  const savedLng = localStorage.getItem('longitude');

  if (savedLat && savedLng) {
    mapOptions.value.latitude = parseFloat(savedLat);
    mapOptions.value.longitude = parseFloat(savedLng);
    isLoading.value = false; // 로딩 완료
    return true;
  }
  return false;
}

onMounted(() => {
  if (!loadLocationFromLocalStorage()) {
    // 로컬 스토리지에 값이 없으면 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapOptions.value.latitude = latitude;
          mapOptions.value.longitude = longitude;

          // 위치 정보를 로컬 스토리지에 저장
          localStorage.setItem('latitude', latitude.toString());
          localStorage.setItem('longitude', longitude.toString());

          isLoading.value = false; // 로딩 완료
        },
        (error) => {
          console.error('Error getting location: ', error);
          alert('현재 위치를 가져올 수 없습니다. 기본 위치를 표시합니다.');
          isLoading.value = false; // 로딩 완료
        },
      );
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
  <naver-map v-else :mapOptions="mapOptions" style="width: 100%; height: 500px">
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
  font-size: 18px;
  text-align: center;
  padding: 20px;
}
</style>
