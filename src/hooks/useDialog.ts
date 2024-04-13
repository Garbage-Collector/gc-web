// useDialog.ts
import { ref } from 'vue';

export function useDialog(emit) {
  const isOpen = ref(false);

  function openDialog() {
    isOpen.value = true;
    emit('dialog-open');
  }

  function closeDialog() {
    isOpen.value = false;
    emit('dialog-close');
  }

  return { isOpen, openDialog, closeDialog };
}
