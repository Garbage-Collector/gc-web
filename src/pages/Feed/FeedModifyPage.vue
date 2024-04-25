<template>
  <div>
    <h3>피드 수정 페이지</h3>
    <p>게시글 아이디 === {{ route.params.id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped></style>
