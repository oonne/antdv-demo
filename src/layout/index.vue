<template>
  <a-layout class="page-layout">
    <!-- 侧导航 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      theme="light"
      :trigger="null"
      collapsible
    >
      侧导航导航TODO
      <!-- <SideView v-model:collapsed="collapsed" /> -->
    </a-layout-sider>

    <a-layout>
      <!-- 顶栏 -->
      <a-layout-header class="header">
        <HeaderView />
      </a-layout-header>

      <!-- 内容 -->
      <a-layout-content>
        <AppView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import {
  ref, watch,
} from 'vue';
import AppView from './app-view.vue';
import HeaderView from './header-view.vue';
// import SideView from './side-view.vue';

/*
 * 是否折叠侧导航
 */
const defaultCollapsed = localStorage.getItem('SETTING_SIDE_COLLAPSED') === 'true';
const collapsed = ref<boolean>(defaultCollapsed);
watch(collapsed, (value) => {
  localStorage.setItem('SETTING_SIDE_COLLAPSED', value.toString());
});

</script>

<style scoped>
.page-layout{
  min-height: 100vh;
  min-width: 1180px;
}
.header{
  background-color: #fff;
  padding: 0 24px;
  height: var(--header-height);
  line-height: var(--header-height);
}
</style>
