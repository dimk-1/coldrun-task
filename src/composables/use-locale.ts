import { useI18n } from 'vue-i18n';
import { useApplicationStore } from '@/store/modules/application';

import { LanguageCode } from '@/common/constants/locale';

export const useLocale = (): {
  t: ReturnType<typeof useI18n>['t'];
  setLocale: (lang: LanguageCode) => void;
} => {
  const applicationStore = useApplicationStore();
  const { t } = useI18n();

  const setLocale = (lang: LanguageCode) => {
    applicationStore.setLanguage(lang);
  };

  return { t, setLocale };
};
