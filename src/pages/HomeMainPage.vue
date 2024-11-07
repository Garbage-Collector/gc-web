<template>
  <section class="home-wrapper">
    <HeaderComponent />
    <PloggingRecord />
    <RecentRecord />
    <ShareRecord/>
  </section>
</template>

<script setup lang="ts">
import HeaderComponent from 'components/homeTab/HeaderComponent.vue';
import PloggingRecord from 'components/homeTab/MyPloggingRecord.vue';
import RecentRecord from 'components/homeTab/RecentRecord.vue';
import ShareRecord     from 'components/homeTab/ShareRecord.vue';
</script>

<style scoped lang="scss">
.home-wrapper {
  padding: 48px 24px;
}
</style>
