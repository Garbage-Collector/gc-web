<script setup>
import { NaverMap, NaverMarker, NaverPolyline } from 'vue3-naver-maps';
import imageUrl from '../assets/마커이미지.png';

const mapOptions = {
  latitude: 37.507342, // 지도 중앙 위도
  longitude: 127.052023, // 지도 중앙 경도
  zoom: 16,
  zoomControl: false,
  zoomControlOptions: { position: 'TOP_RIGHT' },
};
const datas = [
  { id: 1, lat: 37.507342, lng: 127.052023, imageUrl: imageUrl }, // 선릉 입구
  { id: 2, lat: 37.508567, lng: 127.053091, imageUrl: imageUrl },
  { id: 3, lat: 37.511171, lng: 127.048258, imageUrl: imageUrl },
  { id: 4, lat: 37.50998, lng: 127.04607, imageUrl: imageUrl },
  { id: 5, lat: 37.50923, lng: 127.044336, imageUrl: imageUrl },
  { id: 6, lat: 37.507884, lng: 127.045616, imageUrl: imageUrl },
  { id: 7, lat: 37.50688, lng: 127.049415, imageUrl: imageUrl },
];
</script>

<template>
  <naver-map style="width: 100%; height: 500px" :mapOptions="mapOptions">
    <naver-marker
      v-for="data in datas"
      :key="data.id"
      :latitude="data.lat"
      :longitude="data.lng"
      @click="console.log('tset')"
    >
      <div class="marker">
        <img
          :src="data.imageUrl"
          style="width: 60px; height: 70px; border-radius: 50%"
        />
      </div>
    </naver-marker>
    <naver-polyline
      :path="datas.map((data) => ({ lat: data.lat, lng: data.lng }))"
      :options="{
        strokeColor: '#87db5e',
        strokeWeight: 6,
      }"
    />
  </naver-map>
</template>
