<script setup>
import { NaverMap, NaverMarker, NaverPolyline } from 'vue3-naver-maps';
import { ref } from 'vue';

const props = defineProps({
  datas: {
    type: Array,
  },
});

const mapOptions = ref({
  latitude: 37.507342, // 기본 지도 중앙 위도
  longitude: 127.052023, // 기본 지도 중앙 경도
  zoom: 16,
  zoomControl: false,
  zoomControlOptions: { position: 'TOP_RIGHT' },
});
</script>

<template>
  <naver-map style="width: 100%; height: 500px" :mapOptions="mapOptions">
    <naver-marker
      v-for="data in props.datas"
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
