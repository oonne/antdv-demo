<template>
  <div class="login-page">
    <div class="login-container">
      <a-form
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

const formState = ref({
  name: '',
  password: '',
});

const onLogin = () => {
  console.log('提交的表单数据:', formState);
  // 这里添加登录请求逻辑
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
