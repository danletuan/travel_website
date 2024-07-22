<template>
  <div v-if="isVisible" class="dialog-overlay">
    <div class="dialog-content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="dialog-actions">
        <button @click="emitCancel">{{ cancelText }}</button>
        <button @click="emitConfirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'ConfirmationDialog',
  props: {
    isVisible: Boolean,
    title: String,
    message: String,
    cancelText: String,
    confirmText: String,
  },
  setup(props, { emit }) {
    const { isVisible, title, message, cancelText, confirmText } = toRefs(props);

    const emitCancel = () => {
      emit('cancel');
    };

    const emitConfirm = () => {
      emit('confirm');
    };

    return {
      isVisible,
      title,
      message,
      cancelText,
      confirmText,
      emitCancel,
      emitConfirm,
    };
  },
});
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
