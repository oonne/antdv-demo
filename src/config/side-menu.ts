/*
 * 侧边栏配置
 */
interface ISideConfig {
  key: string;
  title: string; // 标题
  icon?: string; // 图标
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
