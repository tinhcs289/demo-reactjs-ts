import { FormGridFields, withDisplayAsDialog, withRHF, withRHFSubmitHandler } from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import type { DialogFormComponent, DialogFormProps, FormProps } from '../_types';
import { fields } from '../constants';
import withApiCreate from '../hocs/withApiCreate';
import withApiCreateDraft from '../hocs/withApiCreateDraft';
import withApiGetDetail from '../hocs/withApiGetDetail';
import withApiUpdate from '../hocs/withApiUpdate';
import withFormActionsButtons from '../hocs/withFormActionsButtons';
import DialogFormActions from './DialogFormActions';
import DialogFormTitle from './DialogFormTitle';
import withContextFormState from '../hocs/withContextFormState';
/**
 * HOCs that provide API connection functionality
 */
const apiHocs = [withApiGetDetail, withApiUpdate, withApiCreateDraft, withApiCreate];
/**
 * HOCs for react-hook-form integration
 */
const rhfHocs = [withRHF(), withRHFSubmitHandler];
/**
 * Basic Form
 */
const Form = withHOCs(
  withContextFormState,
  ...apiHocs,
  ...rhfHocs,
  withFormActionsButtons
)(function FormFields(_props: FormProps) {
  return <FormGridFields fields={fields} />;
});
export default Form;
/**
 * Dialog Form
 */
export const DialogForm = withHOCs(
  withContextFormState,
  ...apiHocs,
  ...rhfHocs,
  withDisplayAsDialog({
    titleComponent: DialogFormTitle,
    actionsComponent: DialogFormActions,
  })
)(function FormFields(_props: DialogFormProps) {
  return <FormGridFields fields={fields} />;
}) as DialogFormComponent;
