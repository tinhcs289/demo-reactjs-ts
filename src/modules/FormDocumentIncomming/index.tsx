//#region  Components
import { default as FormDocumentIncomming } from './components/Form';
export default FormDocumentIncomming;
//#endregion
//#region types
export type {
  FormComponent as FormDocumentIncommingComponent,
  FormProps as FormDocumentIncommingProps,
  FormValues as FormDocumentIncommingValues,
} from './_types';
export { default as FormDocumentIncommingFields } from './components/FormFields';
//#endregion
//#region constants
export { defaultValues as defaultDocumentIncommingValues, fields } from './constants';
//#endregion
//#region hocs/funtions
export { default as withApiCreateDocumentIncomming } from './hocs/withApiCreate';
export { default as withApiCreateDraftDocumentIncomming } from './hocs/withApiCreateDraft';
export { default as withApiGetDetailDocumentIncomming } from './hocs/withApiGetDetail';
export { default as withApiUpdateDocumentIncomming } from './hocs/withApiUpdate';
export { default as withSubmitButtonDocumentIncomming } from './hocs/withFormActionsButtons';
//#endregion
