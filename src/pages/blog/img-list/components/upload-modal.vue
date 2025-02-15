<template>
  <a-modal
    v-model:visible="visible"
    title="上传图片"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div>
      <!-- TODO: 这里添加上传组件 -->
      TODO
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const handleOk = () => {
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

// 对外暴露打开弹框的方法
const open = () => {
  visible.value = true;
};

defineExpose({
  open,
});
</script>
