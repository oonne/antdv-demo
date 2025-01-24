import request from '../req';

export default {
  // 查询账号列表
  getList(data: object) {
    return request({
      url: '/staff/all',
      data,
    });
  },

  // 查询账号详情
  getDetail(data: object) {
    return request({
      url: '/staff/get-detail',
      data,
    });
  },
};
