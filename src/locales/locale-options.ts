import { computed } from 'vue';
import i18n from '@/locales/i18n';
import type { LocaleSetting } from '@/types/index';

const { t, messages } = i18n.global;

interface ILocaleOption {
  key: LocaleSetting;
  label: string;
}

const options = computed(():ILocaleOption[] => [
  {
    key: 'SYSTEM',
    label: t('lang_system'),
  },
  {
    key: 'zh_CN',
    label: messages.zh_CN.lang_name,
  },
  {
    key: 'zh_TW',
    label: messages.zh_TW.lang_name,
  },
  {
    key: 'en_US',
    label: messages.en_US.lang_name,
  },
]);

export default options;
