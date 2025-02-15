import config from '@/config/index';
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

  // 删除文件
  deleteFile(data: object) {
    return request({
      url: '/file/delete',
      data,
    });
  },

  // 上传文件
  upload(file: File) {
    const formdata = new FormData();
    formdata.append('file', file);

    return request({
      url: '/file/upload',
      data: formdata,
      timeout: config.uploadTimeOut,
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8',
      },
    });
  },
};
