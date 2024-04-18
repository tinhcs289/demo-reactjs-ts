import wait from '@/helpers/asyncHelpers/wait';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import type { ComponentType } from 'react';
import { useCallback, useState } from 'react';
import type { FormProps, FormValues } from '../_types';
import { MUTATE_ACTION } from '../constants';
type SubmitHandler = Required<FormProps>['onSubmit'];
export default function withApiSaveChanges(
  WrappedComponent: ComponentType<FormProps>
): ComponentType<FormProps> {
  return function FormWithApiSaveChanges(props: FormProps) {
    const { loading: loadingProp, onSubmit, onClose, ...otherProps } = props;
    const [loading, setLoading] = useState<boolean>(!!loadingProp);
    const { showSuccessNotify } = useSnackbarNotify();
    const requestApi = useCallback(
      async (_values: FormValues) => {
        // TODO: call api here
        // setLoading(true);
        // const [error, result] = await callHttp(async () =>
        //   http.post('END_POINT_HERE', values)
        // ).waitForSuccess();
        // setLoading(false);
        // if (error) {
        //   showErrorNotify('Đã có lỗi xảy ra');
        //   return;
        // }
        // onClose?.({ reason: 'after_success', feedback: result });
        // return;
        await wait(1000);
        setLoading(false);
        showSuccessNotify('Đã lưu');
        onClose?.({ reason: 'after_success', feedback: { message: 'ok' } });
        return;
      },
      [onClose, showSuccessNotify]
    );
    const handleSubmit: SubmitHandler = useCallback(
      (values, reason) => {
        if (reason !== MUTATE_ACTION) {
          onSubmit?.(values, reason);
          return;
        }
        requestApi(values);
      },
      [onSubmit, requestApi]
    );
    return <WrappedComponent {...otherProps} onSubmit={handleSubmit} loading={loading} onClose={onClose} />;
  };
}
