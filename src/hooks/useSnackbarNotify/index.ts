import stringOrEmpty from '@/helpers/formatHelpers/stringOrEmpty';
import { SNACKBAR_VARIANT } from '@/redux/snackbar/contants';
import type { OptionsObject } from 'notistack';
import { useSnackbar } from 'notistack';

const useSnackbarNotify = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showNotify = (variant: `${SNACKBAR_VARIANT}`, message: string, options?: OptionsObject) => {
    enqueueSnackbar(stringOrEmpty(message), {
      autoHideDuration: 2000,
      variant: variant || SNACKBAR_VARIANT.DEFAULT,
      ...options,
    });
  };

  const showSuccessNotify = (message: string, options?: Omit<OptionsObject, 'variant'>) => {
    enqueueSnackbar(stringOrEmpty(message), {
      autoHideDuration: 2000,
      variant: SNACKBAR_VARIANT.SUCCESS,
      ...options,
    });
  };

  const showWaringNotify = (message: string, options?: Omit<OptionsObject, 'variant'>) => {
    enqueueSnackbar(stringOrEmpty(message), {
      autoHideDuration: 2000,
      variant: SNACKBAR_VARIANT.WARNING,
      ...options,
    });
  };

  const showInfoNotify = (message: string, options?: Omit<OptionsObject, 'variant'>) => {
    enqueueSnackbar(stringOrEmpty(message), {
      autoHideDuration: 2000,
      variant: SNACKBAR_VARIANT.INFO,
      ...options,
    });
  };

  return { showNotify, showSuccessNotify, showWaringNotify, showInfoNotify };
};
export default useSnackbarNotify;
