import useVuelidate from '@vuelidate/core';

import { alphaNum, helpers, minLength, required } from '@vuelidate/validators';

export const useValidation = () => {
  return {
    validateFn: useVuelidate,
    alphaNum,
    helpers,
    minLength,
    required
  };
};
