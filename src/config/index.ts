/*
 * 全局配置
 */
import PackageJson from '../../package.json';

export default {
  version: PackageJson.version,
  source: 1,

  // 在线客服入口
  service: {
    orgi: '221',
    appid: '20173',
    baseUrl: 'https://app.salechaty.com/api/',
  },

  // 超时时间
  apiTimeOut: 10000,
  uploadTimeOut: 60000,
  msgTimeOut: 60000,
  // 客户端ws心跳间隔（单位：秒）
  wsClintHeartbeatTime: 10,
  // 服务端ws心跳检测（单位：秒）
  wsServerHeartbeatTime: 25,
  // 分页大小
  pageSize: 10,

  // 聊天文本最大长度
  maxChatTextLength: 1000,
  // 上传图片大小限制（单位：MB）
  maxUploadImgSize: 10,
  // 上传图片类型限制
  uploadImgType: '.jpg,.jpeg,.png',
  // 上传视频大小限制（单位：MB）
  maxUploadVideoSize: 100,
  // 上传视频类型限制
  uploadVideoType: '.mp4',
  // 上传文件大小限制（单位：MB）
  maxUploadFileSize: 100,
  // 上传文件类型限制
  uploadFileType: '.zip,.rar,.7z,.pdf,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
  // 允许一次上传的最大文件数量
  maxUploadFileCount: 10,
  // 上传文件分片大小（单位：MB）
  uploadChunkSize: 5,
  // 邮件内容最大长度
  maxEmailContentLength: 16 * 1024,
  // 邮件附件大小限制（单位：MB）
  maxEmailAttachmentSize: 10,

  // 流程图 最大节点数
  flowMaxNodeCount: 100,
  // 流程图 条件 最大分支数
  flowMaxBranchCount: 10,
  // 流程图 发消息 最大消息数
  flowMaxMsgCount: 10,
  // 流程图 消息关键词 最大数量
  flowMaxKeywordCount: 100,

  // 群发最大消息数量
  massMaxMsgCount: 10,

  // 默认 Embedding Modal
  defaultEmbeddingModal: 'ZhipuAI',
  // 默认 Large Language Modal
  defaultLargeLanguageModal: 'ZhipuAI',
  // 最小分段大小
  minSegmentSize: 30,
  // 最大分段大小
  maxSegmentSize: 2000,

  // 开户名称
  bankAccountName: '广州阿尔戈信息科技有限公司',
  // 开户银行
  bankName: '中国工商银行股份有限公司广州星汇园支行',
  // 汇款账号
  bankRemittanceAccount: '3602176409100257037',
};
