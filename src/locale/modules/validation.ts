import type { Translations } from '@/common/types/locale';

export const validationLocale: Translations = {
  en: {
    validation: {
      required: 'This field is required',
      minLength: 'Length should be greater than {value}'
    }
  },
  pl: {
    validation: {
      required: 'To pole jest wymagane',
      minLength: 'Długość powinna być większa niż {value}'
    }
  }
};
