<template>
  <div
    class="header"
    @click="$emit('update:collapsed', !collapsed)"
  >
    <!-- Ring -->
    <div
      class="sidebar-logo"
      :class="`${collapsed ? 'logo logo-collapsed' : 'logo'}`"
      :style="logoStyle"
    >
      <img
        :src="AuraImg"
        class="logo-rotation"
        :style="rotationStyle"
      >
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
      <template v-if="sideMenu.children">
        <a-sub-menu :key="sideMenu.key">
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
import {
  ref, watch, computed, onMounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideMenuConfig from '@/config/side-menu';
import Icon from '@/components/icon-svg/index.vue';
import AuraImg from '@/assets/img/aura.png';

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

/* 旋转光环 */
const logoStyle = ref({});
const rotationStyle = ref({});

const initStyle = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const animationDelay = `-${seconds}s`;
  logoStyle.value = {
    'animation-delay': animationDelay,
    'background-image': 'linear-gradient(135deg, #e7604a, #de6262)',
  };
  rotationStyle.value = {
    display: 'block',
    'animation-delay': animationDelay,
  };
};

onMounted(() => {
  initStyle();
});
</script>

<style scoped>
.header {
  display: flex;
  cursor: pointer;
}

/* LOGO */
.logo {
  width: 200px;
  height: 200px;
}

.logo-collapsed {
  width: 80px;
  height: 80px;
}

.sidebar-logo {
  display: block;
  background-image: -webkit-linear-gradient(135deg, #333, #333);
  background-image: linear-gradient(135deg, #333, #333);
  -webkit-animation: hue 60s linear infinite;
  animation: hue 60s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

@-webkit-keyframes hue {
  from {
    -webkit-filter: hue-rotate(0deg);
    filter: hue-rotate(0deg);
  }

  to {
    -webkit-filter: hue-rotate(-360deg);
    filter: hue-rotate(-360deg);
  }
}

@keyframes hue {
  from {
    -webkit-filter: hue-rotate(0deg);
    filter: hue-rotate(0deg);
  }

  to {
    -webkit-filter: hue-rotate(-360deg);
    filter: hue-rotate(-360deg);
  }
}

.sidebar-logo img {
  height: 88%;
  width: 88%;
}

.logo-rotation {
  display: none;
  -webkit-animation: rotation linear 30s infinite;
  animation: rotation linear 30s infinite;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* 菜单 */
.side-menu {
  max-height: calc(100vh - var(--header-height));
  overflow-y: auto;
}
</style>
