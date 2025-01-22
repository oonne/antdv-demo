/* eslint-disable max-len */
import type { ILangMsgs } from '@/types/index';

/*
 * 其他
 */
const msg: ILangMsgs = {
  /*
   * 系统支持的语言
   */
  zh_CN: {
    zh_CN: '中文（简体）',
    zh_TW: '中文（简体）',
    en_US: 'Chinese (Simplified)',
  },
  zh_TW: {
    zh_CN: '中文（繁体）',
    zh_TW: '中文（繁体）',
    en_US: 'Chinese (Traditional)',
  },
  en_US: {
    zh_CN: '英文',
    zh_TW: '英文',
    en_US: 'English',
  },

  /*
   * 异常 exception_
   */
  exception_403: {
    zh_CN: '没有访问权限',
    zh_TW: '沒有訪問權限',
    en_US: 'No Access',
  },
  exception_404: {
    zh_CN: '页面不存在',
    zh_TW: '頁面不存在',
    en_US: 'Page does not exist',
  },
  exception_500: {
    zh_CN: '服务器错误',
    zh_TW: '服務器錯誤',
    en_US: 'Server Error',
  },
};

export default msg;
