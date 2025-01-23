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
    icon: 'HomeOutlined',
  },

  // 系统
  {
    key: 'system',
    title: '系统',
    icon: 'TeamOutlined',
    children: [
      {
        key: 'staff',
        title: '账号管理',
      },
    ],
  },
];

export default sideMenu;
