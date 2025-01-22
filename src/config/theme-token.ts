/*
 * Ant Design 样式配置
 */
import { theme } from 'ant-design-vue';

const { compactAlgorithm } = theme;
type AliasToken = Partial<typeof compactAlgorithm>;

// 主题配置
const themeToken: AliasToken = {
  colorPrimary: '#007FFF', // 默认颜色
  colorLink: '#007FFF', // 链接颜色
  colorTextBase: '#3f3f4a', // 默认字体颜色
  fontSize: 14, // 默认字体
  borderRadius: 4, // 圆角
  colorSplit: 'rgba(5, 5, 5, 0.03)', // 分割线颜色
  controlHeight: 28, // 控件高度
};

export {
  themeToken,
};
