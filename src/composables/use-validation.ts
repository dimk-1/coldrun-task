import useVuelidate from '@vuelidate/core';

import { helpers, minLength, required } from '@vuelidate/validators';

export const useValidation = () => {
  return {
    validateFn: useVuelidate,
    helpers,
    minLength,
    required
  };
};
