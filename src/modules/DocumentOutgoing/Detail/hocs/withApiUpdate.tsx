import wait from '@/helpers/asyncHelpers/wait';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import type { ComponentType } from 'react';
import { useCallback, useState } from 'react';
import type { FormProps, FormValues } from '../_types';
import { MUTATE_ACTION } from '../constants';
type SubmitHandler = Required<FormProps>['onSubmit'];
const ACTION = MUTATE_ACTION.UPDATE;
export default function withApiUpdate(WrappedComponent: ComponentType<FormProps>): ComponentType<FormProps> {
  return function FormWithApiUpdate(props: FormProps) {
    const { loading: loadingProp, onSubmit, onClose, ...otherProps } = props;
    const [loading, setLoading] = useState<boolean>(!!loadingProp);
    const { showSuccessNotify } = useSnackbarNotify();
    const requestApi = useCallback(
      async (_values: FormValues, reason: string) => {
        // TODO:
        // setLoading(true);
        // const [error, result] = await callHttp(async () =>
        //   http.put('END_POINT_HERE', values)
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
        showSuccessNotify('Thanh cong');
        onClose?.({ reason: 'after_success', feedback: { message: reason } });
      },
      [onClose, showSuccessNotify]
    );
    const handleSubmit: SubmitHandler = useCallback(
      (values, reason) => {
        if (reason !== ACTION && reason !== 'request_sign' && reason !== 'create_assigment') {
          onSubmit?.(values, reason);
          return;
        }
        requestApi(values, reason);
      },
      [onSubmit, requestApi]
    );
    return <WrappedComponent {...otherProps} onSubmit={handleSubmit} loading={loading} onClose={onClose} />;
  };
}
