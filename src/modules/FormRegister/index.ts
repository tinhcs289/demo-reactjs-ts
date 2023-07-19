//#region  Components
import { default as FormRegister } from './components/Form';
export default FormRegister;
export { default as FormRegisterFields } from './components/FormFields';
//#endregion
//#region types
export type {
  FormComponent as FormRegisterComponent,
  FormProps as FormRegisterProps,
  FormValues as FormRegisterValues,
} from './_types';
//#endregion
//#region constants
export { fields as registerFields } from './constants';
//#endregion
//#region hocs/funtions
export { default as withReturnUri } from './hocs/withReturnUri';
export { default as withPasswordAndPasswordReEnterdMustMatch } from './hocs/withPasswordAndPasswordReEnterdMustMatch';
export { default as withRegisterViaInternalApi } from './hocs/withRegisterViaInternalApi';
export { default as withSubmitButton } from './hocs/withSubmitButton';
//#endregion
