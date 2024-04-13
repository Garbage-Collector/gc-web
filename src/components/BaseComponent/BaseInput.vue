<template>
  <div class="input-root">
    <div class="base-label">
      <div class="label">
        <span>
          <span class="label-span">{{ label }}</span>
          <span class="label-span2" v-if="required">*</span>
        </span>
      </div>
    </div>
    <input
      class="input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
type Props = {
  label: string;
  required?: boolean;
  placeholder?: string;
  modelValue: string;
};

defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

//input 입력 이벤트 발생 시 부모컴포넌트로 입력값 전달
function handleInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  emit('update:modelValue', inputElement.value);
}
</script>

<style scoped>
.input-root,
.input-root * {
  box-sizing: border-box;
}

.input-root {
  border-radius: 8px;
  border-style: solid;
  border-color: #aadec2;
  border-width: 1px;
  padding: 16.5px 14px 16.5px 14px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 42px;
  position: relative;
  padding: 16.5px 0 16.5px 14px;
}

.base-label {
  background: #ffffff;
  padding: 0px 4px 0px 4px;
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 2px;
  position: absolute;
  left: 8px;
  top: -0.5px;
  z-index: 1;
}

.label {
  text-align: left;
  font-family: 'PretendardVariable-Regular', sans-serif;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  position: relative;
  background-color: #ffffff;
  /*padding-top: 16.5px;*/
  padding-left: 3px;
  padding-right: 3px;
}

.label-span {
  color: var(--text-inactive, rgba(0, 0, 0, 0.6));
  font-family: 'PretendardVariable-Regular', sans-serif;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
}

.label-span2 {
  color: rgba(255, 28, 28, 0.6);
  font-family: 'PretendardVariable-Regular', sans-serif;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  margin-left: 3px;
}

.input {
  color: #999999;
  text-align: left;
  font-family: 'PretendardVariable-Regular', sans-serif;
  font-size: 16px;
  line-height: 23px;
  font-weight: 400;
  position: relative;
  border: none;
  outline: none;
}
</style>
