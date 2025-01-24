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
    component: () => import('@/pages/exception/index.vue'),
    meta: {
      noNeedLogin: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/exception/index.vue'),
    meta: {
      noNeedLogin: true,
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/pages/exception/index.vue'),
    meta: {
      noNeedLogin: true,
    },
  },

  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login-form.vue'),
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
          noNeedLogin: true,
          sideKey: 'home',
          title: '首页',
        },
      },
    ],
  },

  /*
   * 系统
   */
  {
    path: '/system',
    component: Layout,
    children: [
      // 成员管理
      {
        path: 'staff',
        component: () => import('@/pages/system/staff/index.vue'),
        name: 'staff',
        meta: {
          noNeedLogin: true,
          sideKey: 'staff',
          title: '账号管理',
        },
      },
      // 回收站
      {
        path: 'recycle',
        component: () => import('@/pages/system/recycle/index.vue'),
        name: 'recycle',
        meta: {
          noNeedLogin: true,
          sideKey: 'recycle',
          title: '回收站',
        },
      },
    ],
  },

  /*
   * 博客
   */
  {
    path: '/blog',
    component: Layout,
    children: [
      // 博客列表
      {
        path: 'blog-list',
        component: () => import('@/pages/blog/blog-list/index.vue'),
        name: 'blog-list',
        meta: {
          noNeedLogin: true,
          sideKey: 'blog-list',
          title: '博客列表',
        },
      },
      // 关于我
      {
        path: 'about-me',
        component: () => import('@/pages/blog/about-me/index.vue'),
        name: 'about-me',
        meta: {
          noNeedLogin: true,
          sideKey: 'about-me',
          title: '关于我',
        },
      },
    ],
  },
];

export default pages;
