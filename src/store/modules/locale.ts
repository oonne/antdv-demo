import { ref } from 'vue';
import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import i18n from '@/locales/i18n';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import zhTW from 'ant-design-vue/es/locale/zh_TW';
import enUS from 'ant-design-vue/es/locale/en_US';
import type { LocaleType } from '@/types/index';

import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/en';

const { VITE_DEFAULT_LOCALE } = import.meta.env;

/*
 * 语言常量
 */
const localeSettings = {
  zh_CN: {
    antLocale: zhCN,
    dayjsLocale: 'zh-cn',
  },
  zh_TW: {
    antLocale: zhTW,
    dayjsLocale: 'zh-tw',
  },
  en_US: {
    antLocale: enUS,
    dayjsLocale: 'en',
  },
};

/**
 * 获取浏览器默认的语言
 */
const getSystemLang = (): LocaleType => {
  const { language } = window.navigator;

  // 简体中文
  if (language === 'zh-CN') {
    return 'zh_CN';
  }
  // 其他中文默认繁体
  if (language.includes('zh')) {
    return 'zh_TW';
  }
  // 英文
  if (language === 'en') {
    return 'en_US';
  }

  // 缺省语言
  return 'en_US';
};

/*
 * 多语言设置
 */
export default defineStore('locale', () => {
  // 当前语言
  const locale = ref<LocaleType>(VITE_DEFAULT_LOCALE);
  const antLocale = ref(localeSettings[VITE_DEFAULT_LOCALE as LocaleType].antLocale);

  // 更改语言
  const setLocale = (value: LocaleType) => {
    locale.value = value;
    i18n.global.locale = value;
    antLocale.value = localeSettings[value].antLocale;
    dayjs.locale(localeSettings[value].dayjsLocale);

    localStorage.setItem('LOCALE', value);
  };

  // 预设语言
  const initLocaleSetting = () => {
    const storageLocale = localStorage.getItem('LOCALE');
    if (!storageLocale) {
      // 获取浏览器语言
      setLocale(getSystemLang());
      return;
    }

    setLocale(storageLocale as LocaleType);
  };

  /*
   * 根据不同语言，返回不同内容
   * 通常用于样式处理
   */
  interface IFormLabelColOptions<T>{
    default: T;
    [key: string]: T;
  }
  const getLocalOption = (options: IFormLabelColOptions<any>) => {
    if (options[locale.value]) {
      return options[locale.value];
    }

    return options.default;
  };

  return {
    locale,
    antLocale,

    initLocaleSetting,
    getLocalOption,
  };
});
