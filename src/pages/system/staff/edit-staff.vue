<template>
  <div>
    编辑表单
  </div>
  <a-button type="primary">
    保存
  </a-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { staffApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';
import type { IStaff } from '@/types/staff';

const route = useRoute();

/* 表单信息 */
const formData = ref<IStaff>({
  staffId: '',
  name: '',
  password: '',
  role: 1,
  isActive: true,
});

/* 查询详情 */
const getDetail = async () => {
  if (!route.params.staffId) {
    return;
  }

  const [err, res] = await to(staffApi.getDetail({ staffId: route.params.staffId }));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '查询失败' }));
    return;
  }
  formData.value = res.data;
};

/* 进入页面 */
onMounted(async () => {
  getDetail();
});
</script>

<style scoped></style>
