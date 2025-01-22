import request from '../req';

export default {
  // 登录
  login(data: object) {
    return request({
      url: '/auth/login',
      data,
    });
  },
};
