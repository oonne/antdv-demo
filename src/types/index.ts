// 时间
export type Timer = ReturnType<typeof setTimeout> | null;
export type Interval = ReturnType<typeof setInterval> | null;

// 多语言
export type LocaleType = 'zh_CN' | 'zh_TW' | 'en_US';
export interface ILangMsg {
  zh_CN: string;
  zh_TW: string;
  en_US: string;
}
export interface ILangMsgs {
  [key: string | number]: ILangMsg;
}
