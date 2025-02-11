<template>
  <div>
    内容TODO
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { recycleApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';
import type { IRecycle } from '@/types/recycle';

const route = useRoute();

const detail = ref<IRecycle>({
  type: 1,
  content: '',
});
const loading = ref(false);

/* 查询详情 */
const getDetail = async () => {
  if (!route.query.recycleId) {
    return;
  }

  loading.value = true;
  const [err, res] = await to(recycleApi.getDetail({ recycleId: route.query.recycleId }));
  loading.value = false;

  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '查询失败' }));
    return;
  }

  detail.value = res.data;
};

/* 进入页面 */
onMounted(async () => {
  getDetail();
});
</script>

<style scoped></style>
