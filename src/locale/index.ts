import { createI18n, type I18nOptions } from 'vue-i18n';
import { LanguageCode } from '@/common/constants/locale';
import { deepMerge } from '@/common/utils/object-utils';

// Translations
import { commonLocale } from './modules/common';
import { enumLocale } from './modules/enum';
import { validationLocale } from './modules/validation';

const messages = deepMerge(commonLocale, enumLocale, validationLocale);

const i18nOptions: I18nOptions = {
  legacy: false,
  locale: LanguageCode.en,
  fallbackLocale: LanguageCode.en,
  messages,
  silentFallbackWarn: true
};

const i18n = createI18n<false, I18nOptions>(i18nOptions);

const i18n_global = i18n.global;

export { i18n, i18n_global };
