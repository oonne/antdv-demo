import { ref } from 'vue';
import { defineStore } from 'pinia';
import config from '@/config/index';
import { authApi } from '@/api/index';
import { to, Utils } from '@/utils/index';
import type { IStaff } from '@/types/staff';

const { randomChars } = Utils;

/*
 * 生成UUID
 * 格式： 12位随机数字或字母（或广告ID末12位）+连词符+4位随机数字或字母
 */
const generateUUID = () => `${randomChars(12)}-${randomChars(4)}`;

/*
 * 账号
 */
export default defineStore('staff', () => {
  const uuid = ref('');

  /*
   * UUID
   */
  const initUUID = () => {
    let uuidValue = localStorage.getItem('UUID');
    if (!uuidValue) {
      uuidValue = generateUUID();
      localStorage.setItem('UUID', uuidValue);
    }
    uuid.value = uuidValue;
  };

  /*
   * 用户信息
   */
  const staffInfo = ref<IStaff>({
    staffId: '',
    name: '',
  });

  // 设置用户信息
  const setStaffInfo = (info: IStaff) => {
    staffInfo.value = info;
    localStorage.setItem('STAFF_INFO', JSON.stringify(info));
  };

  // 获取用户信息
  const getStaffInfo = () => {
    const staffInfoValue = localStorage.getItem('STAFF_INFO');
    if (staffInfoValue) {
      staffInfo.value = JSON.parse(staffInfoValue);
    }
  };

  /*
   * 刷新token
   */
  // 记录token刷新时间
  const setTokenRefreshTime = () => {
    localStorage.setItem('TOKEN_REFRESH_TIME', new Date().getTime().toString());
  };

  // 刷新token
  const refreshToken = async () => {
    const refreshTokenValue = localStorage.getItem('REFRESH_TOKEN');
    const tokenRefreshTime = localStorage.getItem('TOKEN_REFRESH_TIME');
    if (!refreshTokenValue || !tokenRefreshTime) {
      return;
    }

    // 如果最近一次刷新时间在 config.tokenRefreshTime 分钟内，则不刷新
    if (new Date().getTime() - parseInt(tokenRefreshTime, 10) < config.tokenRefreshTime) {
      return;
    }

    const [err, res] = await to(authApi.refreshToken());
    if (err) {
      return;
    }

    console.log(res);
  };

  /*
   * 清空所有信息
   * （退出登录的时候调用）
   */
  const clear = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('STAFF_INFO');

    staffInfo.value = {
      staffId: '',
      name: '',
    };
  };

  return {
    uuid,
    initUUID,

    staffInfo,
    setStaffInfo,
    getStaffInfo,

    setTokenRefreshTime,
    refreshToken,

    clear,
  };
});
