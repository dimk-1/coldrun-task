import { ref } from 'vue';
import { defineStore } from 'pinia';
import { i18n } from '@/locale';

import { LanguageCode } from '@/common/constants/locale';

export const useApplicationStore = defineStore(
  'application',
  () => {
    const languageCode = ref<LanguageCode>(LanguageCode.en);

    const setLanguage = (lang: LanguageCode) => {
      languageCode.value = lang;
      updateI18n();
    };

    const updateI18n = () => {
      i18n.global.locale.value = languageCode.value ?? LanguageCode.en;
    };

    return {
      languageCode,
      setLanguage,
      updateI18n
    };
  },
  { persist: { key: 'application', storage: window.localStorage } }
);
