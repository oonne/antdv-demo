<template>
  <img
    v-if="iconUrl"
    :src="iconUrl"
    alt=""
  >
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // 图标名称（不需要带.svg后缀）
  icon: {
    type: String,
    required: true,
  },
});

// 计算图标URL
const iconUrl = computed(() => {
  try {
    // 动态导入SVG文件
    return new URL(`../../assets/icon/${props.icon}.svg`, import.meta.url).href;
  } catch (error) {
    console.warn(`Icon not found: ${props.icon}.svg`);
    return '';
  }
});
</script>

<style scoped></style>
