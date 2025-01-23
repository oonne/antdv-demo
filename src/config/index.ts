/*
 * 全局配置
 */
import PackageJson from '../../package.json';

export default {
  version: PackageJson.version,
  // 超时时间
  apiTimeOut: 10000,
  uploadTimeOut: 60000,

  // 分页大小
  pageSize: 2,
};
