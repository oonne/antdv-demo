<template>
  <Loading
    v-if="loading"
    class="app-detail-loading"
  />
  <div v-else>
    <div>KEY: {{ detail.key }}</div>
    <br>

    <div>VALUE: </div>
    <TextContent :content="detail.value" />
    <br>

    <div>备注: </div>
    <TextContent :content="detail.remark" />
    <br>

    <div>更新时间: {{ dayjs(detail.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { settingApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';
import Loading from '@/components/loading/index.vue';
import TextContent from '@/components/text-content/index';
import type { ISetting } from '@/types/setting';

const route = useRoute();

const detail = ref<ISetting>({
  settingId: '',
  key: '',
  value: '',
  remark: '',
});
const loading = ref(false);

/* 查询详情 */
const getDetail = async () => {
  if (!route.query.settingId) {
    return;
  }

  loading.value = true;
  const [err, res] = await to(settingApi.getDetail({ settingId: route.query.settingId }));
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
