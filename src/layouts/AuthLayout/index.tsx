import withHOCs from '@/hocs/withHocs';
import { default as Layout } from './AuthLayout';
import withAuthChangeWarning from './withAuthChangeWarning';
const AuthLayout = withHOCs(withAuthChangeWarning)(Layout);
export default AuthLayout;
export { EAuthLayoutVariant } from './constants';
export type { AuthLayoutProps, AuthLayoutVariant } from './_types';
