import type { Translations } from '@/common/types/locale';

export const toastLocale: Translations = {
  en: {
    validation: {
      required: 'This field is required',
      minValue: 'Value should be greater than {value}'
    }
  },
  pl: {
    validation: {
      required: 'To pole jest wymagane',
      minValue: 'Wartość powinna być większa niż {value}'
    }
  }
};
