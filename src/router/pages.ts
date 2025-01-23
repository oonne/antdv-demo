import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const pages: RouteRecordRaw[] = [
  /*
   * 系统页面
   */
  // 异常
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/system/exception/index.vue'),
    meta: {
      noNeedLogin: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/system/exception/index.vue'),
    meta: {
      noNeedLogin: true,
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/pages/system/exception/index.vue'),
    meta: {
      noNeedLogin: true,
    },
  },

  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/system/login/login-form.vue'),
    meta: {
      noNeedLogin: true,
    },
  },

  /*
   * 首页
   */
  {
    path: '/home',
    component: Layout,
    children: [
      // 首页
      {
        path: 'index',
        component: () => import('@/pages/home/index.vue'),
        name: 'home',
        meta: {
          sideKey: 'home',
          title: 'title_home',
        },
      },
    ],
  },
];

export default pages;
