import { EAuthLayoutVariant } from './constants';

export type TAuthLayoutVariant = `${EAuthLayoutVariant}`;

export interface IAuthLayoutProps {
  children?: React.ReactNode;
  variant: TAuthLayoutVariant;
}
