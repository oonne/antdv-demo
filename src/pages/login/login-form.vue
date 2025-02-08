<template>
  <div class="login-page">
    <div class="login-container">
      <a-form
        ref="formRef"
        :model="formState"
        name="login"
        @finish="onLogin"
      >
        <a-form-item
          name="name"
          :rules="[{ required: true, message: '请输入账号名!' }]"
        >
          <a-input
            v-model:value="formState.name"
            placeholder="账号名"
          />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="密码"
          />
        </a-form-item>

        <a-button
          type="primary"
          html-type="submit"
          class="login-button"
        >
          登录
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { authApi } from '@/api/index';
import { to, buildErrorMsg, Utils } from '@/utils/index';

const { createHash } = Utils;

/*
 * 表单
 */
const formRef = ref();
const formState = ref({
  name: '',
  password: '',
});
const loading = ref(false);

/*
 * 初始化
 */
const initSystem = async () => {
  loading.value = true;
  const [err] = await to(authApi.init());
  loading.value = false;
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '初始化失败' }));
    return;
  }

  message.success('初始化成功');
};

/*
 * 登录
 */
const onLogin = async () => {
  if (loading.value) {
    return;
  }

  const [validateErr] = await to(formRef.value?.validate());
  if (validateErr) {
    return;
  }

  // 如果账号名和密码都是 admin，则初始化系统
  if (formState.value.name === 'admin' && formState.value.password === 'admin') {
    await initSystem();
    return;
  }

  // 登录逻辑
  loading.value = true;
  const [err, res] = await to(authApi.login({
    name: formState.value.name,
    password: createHash(formState.value.password, 32),
  }));
  loading.value = false;

  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '登录失败' }));
    return;
  }

  message.success('登录成功');
  console.log(res);
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.login-container {
  width: 300px;
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-button {
  width: 100%;
}
</style>
