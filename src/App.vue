<template>
  <router-view v-slot="{ Component }">
    <component :is="layout">
      <component :is="Component" />
    </component>
  </router-view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';

defineOptions({
  name: 'App',
});

const route = useRoute();

const layout = computed(() => {
  return route.path === '/signin' ? 'div' : MainLayout;
});
</script>
