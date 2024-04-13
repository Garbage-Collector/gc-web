<!--<template>-->
<!--  <div class="base-input">-->
<!--    <q-input-->
<!--      :label="computedLabel"-->
<!--      :placeholder="placeholder"-->
<!--      :rules="inputRules"-->
<!--      bordered-->
<!--      :model-value="modelValue"-->
<!--      @update:model-value="updateValue"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { computed } from 'vue';-->
<!--import { QInput } from 'quasar';-->

<!--interface BaseInputProps {-->
<!--  label: string;-->
<!--  placeholder?: string;-->
<!--  required?: boolean;-->
<!--  modelValue: string;-->
<!--}-->

<!--const props = defineProps<BaseInputProps>();-->
<!--// const emits = defineEmits(['update:modelValue']);  // 이벤트를 정의-->


<!--const inputRules = computed(() => {-->
<!--  if (props.required) {-->
<!--    return [-->
<!--      (val: string | null) => (val && val.length > 0) || 'This field is required',-->
<!--    ];-->
<!--  }-->
<!--  return [];-->
<!--});-->

<!--const computedLabel = computed(() => {-->
<!--  return props.required ? `${props.label} *` : props.label;-->
<!--});-->

<!--function updateValue(value: string | number | null): void {-->
<!--  // value가 null이나 number일 수 있으므로, 처리 로직에 이에 대한 처리가 필요할 수 있음-->
<!--  if (value === null) {-->
<!--    // null일 때의 처리-->
<!--    console.log("Value is null");-->
<!--  } else {-->
<!--    // string 또는 number일 때의 처리-->
<!--    console.log("Value is:", value);-->
<!--  }-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->
<!--.base-input .q-field__label.required::after {-->
<!--  content: '*';-->
<!--  color: red;-->
<!--}-->
<!--</style>-->
