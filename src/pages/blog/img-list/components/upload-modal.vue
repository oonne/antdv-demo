<template>
  <a-modal
    v-model:visible="showModal"
    title="上传图片"
    @ok="onUpload"
  >
    <div>
      TODO
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['save']);

/*
 * 弹框
 */
const showModal = ref(false);

// 打开弹框
const openModal = () => {
  showModal.value = true;
};

// 暴露方法
defineExpose({
  openModal,
});

/*
 * 上传
 */
const loading = ref(false);

// 上传
const onUpload = () => {
  if (loading.value) {
    return;
  }

  // loading.value = true;
  // TODO

  showModal.value = false;
  emits('save');
};
</script>
