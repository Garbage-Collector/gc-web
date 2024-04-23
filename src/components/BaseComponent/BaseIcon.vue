<template>
  <component :is="iconComponent" v-if="iconComponent"></component>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import icons from '../../Icon';
import type { Component } from 'vue';

const props = defineProps<{
  icon: keyof typeof icons;
}>();

const iconComponent = computed<Component | undefined>(() => icons[props.icon]);
</script>

<style scoped></style>
