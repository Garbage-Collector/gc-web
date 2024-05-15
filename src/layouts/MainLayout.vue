<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-green-5 text-white">
      <q-toolbar class="flex items-center justify-around">
        <!--homeTab-->
        <div
          class="flex justify-center items-center column cursor-pointer q-mt-md"
          @click="router.push('/home')"
        >
          <q-icon name="home" size="24px" :color="isActiveRoute('/home')" />
          <p>Home</p>
        </div>
        <!--homeTab-->

        <!--Feed-->
        <div
          class="flex justify-center items-center column cursor-pointer q-mt-md"
          @click="router.push('/feed')"
        >
          <q-icon name="feed" size="24px" :color="isActiveRoute('/feed')" />
          <p>Feed</p>
        </div>
        <!--Feed-->

        <!--Map-->
        <div
          class="flex justify-center items-center column cursor-pointer q-mt-md"
          @click="router.push('/map')"
        >
          <q-icon name="map" size="24px" :color="isActiveRoute('/map')" />
          <p>Map</p>
        </div>
        <!--Map-->

        <!--My-->
        <div
          class="flex justify-center items-center column cursor-pointer q-mt-md"
          @click="router.push('/mypage')"
        >
          <q-icon name="person" size="24px" :color="isActiveRoute('/mypage')" />
          <p>My</p>
        </div>
        <!--My-->
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isActiveRoute = (targetPath: string): string => {
  return route.path === targetPath ? 'light-green-10' : 'white';
};
</script>

<style lang="scss"></style>
