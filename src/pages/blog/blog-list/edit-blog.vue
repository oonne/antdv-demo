<template>
  <div class="app-form">
    <a-form
      ref="formRef"
      :model="formData"
      layout="vertical"
      hide-required-mark
    >
      <a-form-item
        label="标题"
        name="title"
        :rules="[{ required: true }]"
      >
        <a-input
          v-model:value="formData.title"
          placeholder="请输入标题"
        />
      </a-form-item>

      <a-form-item
        label="发布日期"
        name="publishDate"
        :rules="[{ required: true }]"
      >
        <a-date-picker
          v-model:value="formData.publishDate"
          placeholder="请选择发布日期"
          :style="{ width: '100%' }"
        />
      </a-form-item>

      <a-form-item label="内容">
        <a-textarea
          v-model:value="formData.content"
          placeholder="请输入内容"
        />
      </a-form-item>

      <a-form-item label="是否启用">
        <a-switch v-model:checked="formData.isActive" />
      </a-form-item>

      <a-form-item
        label="链接"
        name="linkUrl"
        :rules="[{ required: true }]"
      >
        <a-input
          v-model:value="formData.linkUrl"
          placeholder="请输入链接"
        />
      </a-form-item>

      <a-form-item label="Description">
        <a-input
          v-model:value="formData.description"
          placeholder="请输入Description"
        />
      </a-form-item>

      <a-form-item label="Keywords">
        <a-input
          v-model:value="formData.keywords"
          placeholder="请输入Keywords"
        />
      </a-form-item>

      <a-button
        type="primary"
        :loading="loading"
        @click="onSubmit"
      >
        保存
      </a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { emit as busEmit } from 'eventbus-typescript';
import { blogApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';
import type { IBlog } from '@/types/blog';

const route = useRoute();
const router = useRouter();

/* 表单 */
const formRef = ref();
const formData = ref<IBlog>({
  blogId: '',
  title: '',
  publishDate: '',
  content: '',
  linkUrl: '',
  isActive: true,
  description: '',
  keywords: '',
});

/* 查询详情 */
const getDetail = async () => {
  if (!route.query.blogId) {
    busEmit('UPDATE_PAGE_TITLE', '新增博客');
    return;
  }

  const [err, res] = await to(blogApi.getDetail({ blogId: route.query.blogId }));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '查询失败' }));
    return;
  }
  formData.value = {
    ...res.data,
    publishDate: dayjs(res.data.publishDate),
  };
  busEmit('UPDATE_PAGE_TITLE', `编辑博客 - ${formData.value.title}`);
};

/* 进入页面 */
onMounted(async () => {
  getDetail();
});

/* 提交 */
const loading = ref(false);
const onSubmit = async () => {
  if (loading.value) {
    return;
  }

  const [validateErr] = await to(formRef.value?.validate());
  if (validateErr) {
    return;
  }

  loading.value = true;
  const [err] = await to(
    formData.value.blogId
      ? blogApi.updateBlog(formData.value)
      : blogApi.addBlog(formData.value),
  );
  loading.value = false;

  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '提交失败' }));
    return;
  }

  message.success('提交成功');
  router.back();
};
</script>

<style scoped></style>
