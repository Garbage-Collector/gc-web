<script setup>
import { NaverMap, NaverMarker } from 'vue3-naver-maps';
import imageUrl from '../assets/마커이미지.png';


const mapOptions = {
  latitude: 37.51347, // 지도 중앙 위도
  longitude: 127.041722, // 지도 중앙 경도
  zoom: 13,
  zoomControl: false,
  zoomControlOptions: { position: 'TOP_RIGHT' }
};
const datas = [
  { id: 1, lat: 37.51347, lng: 127.041722, imageUrl: imageUrl },
  { id: 2, lat: 37.5126285, lng: 127.0493169, imageUrl: imageUrl },
  { id: 3, lat: 37.5063252, lng: 127.0297763, imageUrl: imageUrl },
];
</script>

<template>
  <naver-map style="width: 100%; height: 500px" :mapOptions="mapOptions">
    <naver-marker
      v-for="(data) in datas"
      :key="data.id"
      :latitude="data.lat"
      :longitude="data.lng"
      @click="console.log('tset');"
    >
      <div class="marker">
        <img :src="data.imageUrl" style="width: 60px; height: 70px;border-radius: 50%;">
      </div>
    </naver-marker>
  </naver-map>
</template>
