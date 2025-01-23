<template>
  <a-flex
    justify="space-between"
    align="center"
  >
    <!-- 标题 -->
    <a-space class="title">
      {{ title }}
    </a-space>
  </a-flex>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router';
import useEventOn from '@/hooks/use-event-on';
import { Type } from '@/utils/index';
import i18n from '@/locales/i18n';

const { t } = i18n.global;
const { isString } = Type;

/*
 * 设置Title
 */
const title = ref<string>('');
const updateTitle = (raw: RouteLocationNormalizedLoaded) => {
  title.value = isString(raw.meta?.title) ? t(raw.meta.title) : '';
};

// 监听路由更新
const route = useRoute();
const router = useRouter();
updateTitle(route);
router.afterEach((toRoute) => {
  updateTitle(toRoute);
});

// 监听语言设置
watch(() => i18n.global.locale, () => {
  updateTitle(route);
});

// 监听页面修改标题
useEventOn('UPDATE_PAGE_TITLE', 'layout-header', (text: string) => {
  title.value = text;
});
</script>

<style scoped>
.title {
  font-size: 14px;
  color: #666;
}
</style>
