// 角色类型：1管理员 2合伙人
export type Role = 1 | 2 | 3 | 4;

/* 租户已购买套餐信息 */
export interface IStaff {
  id?: string;
  staffId: string;
  name: string;
  password?: string;
  role?: Role;
  isActive?: boolean;
  [key: string]: any;
}
