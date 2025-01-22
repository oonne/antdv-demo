/*
 * 业务相关的函数
 */

/**
 * 格式化时区
 * 输入 数字 如 8
 * 输出 UTC+8
 */
const formatTimeZone = (timeZone: number): string => {
  if (timeZone === 0) {
    return 'UTC';
  }
  if (timeZone > 0) {
    return `UTC+${timeZone}`;
  }
  return `UTC-${timeZone}`;
};

/**
 * 获取文件大小
 */
const getFileSize = (fileSize?: number, fixed = 2) => {
  if (!fileSize) {
    return '0';
  }

  if (fileSize < 1024) {
    return `${fileSize}B`;
  }

  if (fileSize < 1024 * 1024) {
    return `${Math.round(fileSize / 1024)}KB`;
  }

  return `${(fileSize / 1024 / 1024).toFixed(fixed)}MB`;
};

export default {
  formatTimeZone,
  getFileSize,
};
