import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Utils } from '@/utils/index';
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
    clear,
  };
});
