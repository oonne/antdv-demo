import request from '../req';

export default {
  // 查询账号列表
  getList(data: object) {
    return request({
      url: '/staff/get-list',
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

  // 新增账号
  addStaff(data: object) {
    return request({
      url: '/staff/add',
      data,
    });
  },

  // 编辑账号
  editStaff(data: object) {
    return request({
      url: '/staff/edit',
      data,
    });
  },

  // 删除账号
  delStaff(data: object) {
    return request({
      url: '/staff/delete',
      data,
    });
  },
};
