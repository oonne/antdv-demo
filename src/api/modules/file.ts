import request from '../req';

export default {
  // 查询文件列表
  getList(data: object) {
    return request({
      url: '/file/get-list',
      data,
    });
  },

  // 查询文件详情
  getDetail(data: object) {
    return request({
      url: '/file/get-detail',
      data,
    });
  },

  // 新增文件
  addFile(data: object) {
    return request({
      url: '/file/add',
      data,
    });
  },

  // 删除文件
  deleteFile(data: object) {
    return request({
      url: '/file/delete',
      data,
    });
  },
};
