import createFastContext from '@/helpers/contextHelpers/createFastContext';
import type { FormProps } from './_types';
type FormViewType = Required<FormProps>['viewType'];
type FormStateContextValues = {
  viewType: FormViewType;
  loading: boolean;
};
const VIEW_TYPE: FormViewType = 'editable';
const {
  Provider: FormStateProvider,
  useDefaultPropInit,
  useGetter: useFormState,
  useSetter: useFormSetState,
} = createFastContext<FormStateContextValues>({
  viewType: VIEW_TYPE,
  loading: false,
});
type FormStateInitProps = Pick<FormProps, 'viewType' | 'loading'>;
function FormStateInit(props: FormStateInitProps) {
  useDefaultPropInit('viewType', props?.viewType || VIEW_TYPE, true);
  useDefaultPropInit('loading', props?.loading, true);
  return <></>;
}
export { FormStateInit, FormStateProvider, useFormState, useFormSetState };
