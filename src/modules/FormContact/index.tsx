//#region  Components
import { default as FormContact } from './components/Form';
export default FormContact;
//#endregion
//#region types
export type {
  FormComponent as FormContactComponent,
  FormProps as FormContactProps,
  FormValues as FormContactValues,
} from './_types';
export { default as FormContactFields } from './components/FormFields';
//#endregion
//#region constants
export { GENDERS, fields as contactFields, defaultContact, genderOptions } from './constants';
//#endregion
//#region hocs/funtions
export { default as withApiGetDetailContact } from './hocs/withApiGetDetail';
export { default as withApiSaveChangesContact } from './hocs/withApiSaveChanges';
export { default as withSubmitButtonContact } from './hocs/withSubmitButton';
//#endregion
