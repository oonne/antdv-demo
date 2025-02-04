/*
 * Ant Design 样式配置
 */
import { theme } from 'ant-design-vue';

const { compactAlgorithm } = theme;
type AliasToken = Partial<typeof compactAlgorithm>;

// 主题配置
const themeToken: AliasToken = {
  colorPrimary: '#6157b3',
  fontSize: 12,
  borderRadius: 4,
  wireframe: false,
};

export { themeToken };
