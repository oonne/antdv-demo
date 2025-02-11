/*
 * 侧边栏配置
 */
export interface ISideConfig {
  key: string;
  title: string; // 标题
  icon?: string; // 图标
  roles?: number[];
  children?: ISideConfig[];
}

const sideMenu: ISideConfig[] = [
  // 首页
  {
    key: 'home',
    title: '首页',
    icon: 'home',
  },

  // 系统
  {
    key: 'system',
    title: '系统',
    icon: 'settings',
    children: [
      {
        key: 'staff',
        title: '账号管理',
        roles: [1],
      },
      {
        key: 'recycle',
        title: '回收站',
      },
    ],
  },

  // 博客
  {
    key: 'blog',
    title: '博客',
    icon: 'blog',
    roles: [1],
    children: [
      {
        key: 'blog-list',
        title: '文章列表',
      },
      {
        key: 'about-me',
        title: '关于我',
      },
    ],
  },
];

export default sideMenu;
