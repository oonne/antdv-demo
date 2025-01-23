<template>
  <a-flex
    justify="space-between"
    align="center"
  >
    <!-- 标题 -->
    <div class="title">
      {{ title }}
    </div>
  </a-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router';
import { Type } from '@/utils/index';

const { isString } = Type;

/*
 * 设置Title
 */
const title = ref<string>('');
const updateTitle = (raw: RouteLocationNormalizedLoaded) => {
  title.value = isString(raw.meta?.title) ? raw.meta.title : '';
};

// 监听路由更新
const route = useRoute();
const router = useRouter();
updateTitle(route);
router.afterEach((toRoute) => {
  updateTitle(toRoute);
});
</script>

<style scoped>
.title {
  font-size: 14px;
  color: #666;
}
</style>
