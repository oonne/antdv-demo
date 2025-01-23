<template>
  <div
    class="header"
    @click="$emit('update:collapsed', !collapsed)"
  >
    <!-- LOGO -->
    <div :class="`${collapsed ? 'logo-collapsed': 'logo'}`">
      LOGO
    </div>
  </div>

  <!-- 菜单 -->
  <a-menu
    v-model:selected-keys="selectedKeys"
    v-model:open-keys="openKeys"
    mode="inline"
    class="side-menu"
    @click="onSelectMenu"
  >
    <template
      v-for="sideMenu of sideMenuList"
      key="key"
    >
      <!-- 二级导航 -->
      <template
        v-if="sideMenu.children"
      >
        <a-sub-menu
          :key="sideMenu.key"
        >
          <template #title>
            <Icon
              v-if="sideMenu.icon"
              :icon="sideMenu.icon"
            />
            <span>{{ sideMenu.title }}</span>
          </template>
          <a-menu-item
            v-for="subMenu of sideMenu.children"
            :key="subMenu.key"
          >
            <a-tooltip
              :title="subMenu.title"
              placement="right"
            >
              <span>{{ subMenu.title }}</span>
            </a-tooltip>
          </a-menu-item>
        </a-sub-menu>
      </template>

      <!-- 一级导航 -->
      <a-menu-item
        v-else
        :key="sideMenu.key"
        :title="sideMenu.title"
      >
        <Icon
          v-if="sideMenu.icon"
          :icon="sideMenu.icon"
        />
        <span>{{ sideMenu.title }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideMenuConfig from '@/config/side-menu';
import Icon from '@/components/icon-svg/index.vue';

const route = useRoute();
const router = useRouter();

const props = defineProps<{
  collapsed: boolean
}>();
defineEmits(['update:collapsed']);

/*
 * 筛选出显示的菜单
 */
const sideMenuList = computed(() => {
  console.log('TODO: 根据角色显示菜单');

  return SideMenuConfig;
});

/*
 * 高亮
 */
const sideKey = (route.meta?.sideKey || '') as string;
const selectedKeys = ref<string[]>([sideKey]);
router.afterEach((to) => {
  selectedKeys.value = [to.meta?.sideKey || ''] as string[];
});

/*
 * 展开菜单
 * 仅在展开侧边栏时展开菜单。折叠时不展示菜单
 */
const openKeys = ref<string[]>([]);
const getOpenKey = () => {
  const openKey = sideMenuList.value.find((sideMenu) => {
    if (props.collapsed) {
      return false;
    }
    if (!sideMenu?.children) {
      return false;
    }
    return sideMenu.children.find((subMenu) => subMenu.key === sideKey);
  });

  openKeys.value = openKey?.key ? [openKey.key] : [];
};
watch(() => props.collapsed, () => {
  getOpenKey();
});
getOpenKey();

/*
 * 菜单跳转
 */
const onSelectMenu = (selectedItem: any) => {
  const key = selectedItem.key as string;
  router.push({ name: key });
};
</script>

<style scoped>
.header{
  display: flex;
  cursor: pointer;
}

.logo{
  width: 160px;
  height: var(--header-height);
}
.logo-collapsed{
  width: var(--header-height);
  height: var(--header-height);
  overflow: hidden;
}
.logo-img{
  width: 160px;
  height: var(--header-height);
}

.collapsed-btn{
  font-size: 18px;
  line-height: var(--header-height);
  color: var(--color-primary);
  opacity: 0.4;
}

.side-menu{
  max-height: calc(100vh - var(--header-height));
  overflow-y: auto;
}
</style>
