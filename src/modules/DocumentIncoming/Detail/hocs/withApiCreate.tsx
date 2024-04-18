import wait from '@/helpers/asyncHelpers/wait';
import type { ComponentType } from 'react';
import { useCallback, useState } from 'react';
import type { FormProps, FormValues } from '../_types';
import DialogSaveSuccess from '../components/DialogSaveSuccess';
import { MUTATE_ACTION } from '../constants';
type SubmitHandler = Required<FormProps>['onSubmit'];
const ACTION = MUTATE_ACTION.CREATE;
export default function withApiCreate(WrappedComponent: ComponentType<FormProps>): ComponentType<FormProps> {
  return function FormWithApiCreate(props: FormProps) {
    const { loading: loadingProp, onSubmit, onClose, ...otherProps } = props;
    const [loading, setLoading] = useState<boolean>(!!loadingProp);
    const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
    const requestApi = useCallback(async (_values: FormValues) => {
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
      setShowSuccessDialog(true);
      return;
    }, []);
    const handleClose = useCallback(() => {
      onClose?.({ reason: 'after_success', feedback: { message: 'ok' } });
    }, [onClose]);
    const handleContinueAssign = useCallback(() => {
      onClose?.({ reason: 'after_success', feedback: { message: 'ok_then_creat_assigment' } });
    }, [onClose]);
    const handleContinueRequestSign = useCallback(() => {
      onClose?.({ reason: 'after_success', feedback: { message: 'ok_then_creat_sign_request' } });
    }, [onClose]);
    const handleSubmit: SubmitHandler = useCallback(
      (values, reason) => {
        if (reason !== ACTION) {
          onSubmit?.(values, reason);
          return;
        }
        requestApi(values);
      },
      [onSubmit, requestApi]
    );
    return (
      <>
        <WrappedComponent {...otherProps} onSubmit={handleSubmit} loading={loading} onClose={onClose} />
        {showSuccessDialog ? (
          <DialogSaveSuccess
            open
            onClose={handleClose}
            onContinueAssign={handleContinueAssign}
            onContinueRequestSign={handleContinueRequestSign}
          />
        ) : null}
      </>
    );
  };
}
