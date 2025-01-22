import { createI18n } from 'vue-i18n';
import type { LocaleType, ILangMsgs } from '@/types/index';

const { VITE_DEFAULT_LOCALE } = import.meta.env;
const models: any = import.meta.glob('./modules/**/*.ts', { eager: true }) || {};

/* 获取msg */
interface IMsg {
  [key: string | number]: string;
}

const getMsg = (locale: LocaleType): IMsg => {
  const defMsg: ILangMsgs = {};
  Object.keys(models).forEach((key: string | number) => {
    Object.assign(defMsg, models[key].default || {});
  });

  const msg: IMsg = {};
  Object.keys(defMsg).forEach((key: string | number) => {
    msg[key] = defMsg[key][locale];
  });
  return msg;
};

/* i18n */
const i18n = createI18n({
  locale: VITE_DEFAULT_LOCALE,
  messages: {
    zh_CN: getMsg('zh_CN'),
    zh_TW: getMsg('zh_TW'),
    en_US: getMsg('en_US'),
  },
});

export default i18n;
