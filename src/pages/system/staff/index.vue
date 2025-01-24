<template>
  <div>
    <a-button type="primary">
      新增
    </a-button>

    {{ staffList.length }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { IStaff } from '@/types/staff';

const staffList = ref<IStaff[]>([]);

/* 查询列表 */

onMounted(() => {

});

</script>

<style scoped>
</style>
