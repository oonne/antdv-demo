/* eslint-disable max-len */
import type { ILangMsgs } from '@/types/index';

const msg: ILangMsgs = {
  400: {
    zh_CN: '请求参数不正确',
    zh_TW: '請求參數不正確',
    en_US: 'Request parameters are incorrect',
  },
  401: {
    zh_CN: '账号未登录',
    zh_TW: '賬號未登錄',
    en_US: 'Account not logged in',
  },
  403: {
    zh_CN: '没有该操作权限',
    zh_TW: '沒有該操作權限',
    en_US: 'No operation permission',
  },
  500: {
    zh_CN: '系统繁忙，请稍后重试',
    zh_TW: '系統繁忙，請稍後重試',
    en_US: 'System busy, please try again later',
  },
};
export default msg;
