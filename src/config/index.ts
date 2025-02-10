/*
 * 全局配置
 */
import PackageJson from '../../package.json';

export default {
  version: PackageJson.version,
  // 超时时间
  apiTimeOut: 10000,
  uploadTimeOut: 60000,

  // token刷新时间
  tokenRefreshTime: 1000 * 60 * 12,

  // 分页大小
  pageSize: 10,
};
