import request from '../req';

export default {
  // 初始化
  init() {
    return request({
      url: '/auth/init',
    });
  },

  // 登录
  login(data: object) {
    return request({
      url: '/auth/login',
      data,
    });
  },

  // 换票
  refreshToken() {
    return request({
      url: '/auth/refresh-token',
    });
  },
};
