import type { Translations } from '@/common/types/locale';

export const validationLocale: Translations = {
  en: {
    validation: {
      alphaNum: 'This field should contain only letters and numbers',
      required: 'This field is required',
      minLength: 'Length should be greater than {value}'
    }
  },
  pl: {
    validation: {
      alphaNum: 'To pole powinno zawierać tylko litery i cyfry',
      required: 'To pole jest wymagane',
      minLength: 'Długość powinna być większa niż {value}'
    }
  }
};
