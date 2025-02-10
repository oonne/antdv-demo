// 回收类型: 1账号
export type RecycleType = 1;

/* 回收站信息 */
export interface IRecycle {
  id?: string;
  type: RecycleType;
  content: string;
  deleteStaffId?: string;
  deleteStaffName?: string;
  [key: string]: any;
}
