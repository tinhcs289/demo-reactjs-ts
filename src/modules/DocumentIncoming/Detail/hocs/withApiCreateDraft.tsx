import { http } from '@/api';
import callHttp from '@/helpers/asyncHelpers/callHttp';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import type { ComponentType } from 'react';
import { useCallback, useState } from 'react';
import type { FormProps, FormValues } from '../_types';
type SubmitHandler = Required<FormProps>['onSubmit'];
const ACTION = 'draft';
export default function withApiCreateDraft(
  WrappedComponent: ComponentType<FormProps>
): ComponentType<FormProps> {
  return function FormWithApiCreateDraft(props: FormProps) {
    const { loading: loadingProp, onSubmit, onClose, ...otherProps } = props;
    const [loading, setLoading] = useState<boolean>(!!loadingProp);
    const { showErrorNotify } = useSnackbarNotify();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const requestApi = useCallback(
      async (values: FormValues) => {
        setLoading(true);
        const [error, result] = await callHttp(async () =>
          http.post('END_POINT_HERE', values)
        ).waitForSuccess();
        setLoading(false);
        if (error) {
          showErrorNotify('Đã có lỗi xảy ra');
          return;
        }
        onClose?.({ reason: 'after_success', feedback: result });
        return;
      },
      [onClose, showErrorNotify]
    );
    const handleSubmit: SubmitHandler = useCallback(
      (values, reason) => {
        if (reason !== ACTION) {
          onSubmit?.(values, reason);
          return;
        }
        //requestApi(values);
      },
      [onSubmit] //, requestApi]
    );
    return <WrappedComponent {...otherProps} onSubmit={handleSubmit} loading={loading} />;
  };
}
