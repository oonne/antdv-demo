<template>
  <div class="app-form">
    <a-form
      :model="formData"
      layout="vertical"
    >
      <a-form-item label="账号名">
        <a-input
          v-model:value="formData.name"
          placeholder="请输入账号名"
        />
      </a-form-item>

      <a-form-item label="密码">
        <a-input
          v-model:value="formData.password"
          placeholder="请输入密码"
        />
      </a-form-item>

      <a-form-item label="角色">
        <a-select v-model:value="formData.role">
          <a-select-option :value="1">
            管理员
          </a-select-option>
          <a-select-option :value="2">
            合伙人
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-button type="primary">
        保存
      </a-button>
    </a-form>
  </div>
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
