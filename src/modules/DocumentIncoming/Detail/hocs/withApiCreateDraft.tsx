import wait from '@/helpers/asyncHelpers/wait';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import type { ComponentType } from 'react';
import { useCallback, useState } from 'react';
import type { FormProps, FormValues } from '../_types';
import { MUTATE_ACTION } from '../constants';
const ACTION = MUTATE_ACTION.DRAFT_THEN_ASSIGN;
export default function withApiCreateDraft(
  WrappedComponent: ComponentType<FormProps>
): ComponentType<FormProps> {
  return function FormWithApiCreateDraft(props: FormProps) {
    const { loading: loadingProp, onSubmit, onClose, ...otherProps } = props;
    const [loading, setLoading] = useState<boolean>(!!loadingProp);
    const { showSuccessNotify } = useSnackbarNotify();
    const requestApi = useCallback(
      async (_values: FormValues) => {
        // TODO: call creating draft api here
        //  setLoading(true);
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
        onClose?.({ reason: 'after_success', feedback: { message: 'ok_then_creat_sign_request' } });
        return;
      },
      [onClose, showSuccessNotify]
    );
    const handleSubmit: Required<FormProps>['onSubmit'] = useCallback(
      (values, reason) => {
        if (reason !== ACTION) {
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
