/*
 * 业务相关的函数
 */
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

  if (fileSize < 1024 * 1024 * 1024) {
    return `${(fileSize / 1024 / 1024).toFixed(fixed)}MB`;
  }

  return `${(fileSize / 1024 / 1024 / 1024).toFixed(fixed)}GB`;
};

export default {
  getFileSize,
};
