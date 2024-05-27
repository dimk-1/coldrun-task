import { isAxiosError } from 'axios';
import { toast } from 'vue3-toastify';
import type { ToastContainerOptions } from 'vue3-toastify';
import { i18n_global } from '@/locale';

export const useToast = () => {
  const toastOptions: ToastContainerOptions = {
    theme: 'auto',
    position: toast.POSITION.TOP_RIGHT,
    transition: toast.TRANSITIONS.FLIP,
    autoClose: 3000
  };

  const getError = (error: unknown) => {
    if (isAxiosError(error) && error.response?.data?.error) {
      const { code } = error.response.data.error;
      return `${i18n_global.t('common.code')}: ${code}\n${i18n_global.t('common.error')}`;
    }

    return i18n_global.t('common.error', JSON.stringify(error));
  };

  const successToast = (message: string, options?: ToastContainerOptions) => {
    toast.success(message, options ? { ...toastOptions, ...options } : toastOptions);
  };

  const errorToast = (message: string, options?: ToastContainerOptions) => {
    toast.error(message, options ? { ...toastOptions, ...options } : toastOptions);
  };

  return {
    getError,
    successToast,
    errorToast
  };
};
