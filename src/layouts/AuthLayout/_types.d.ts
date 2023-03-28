import { EAuthLayoutVariant } from './constants';
import type { ReactNode } from 'react';
export type AuthLayoutVariant = `${EAuthLayoutVariant}`;
export type AuthLayoutProps = {
  children?: ReactNode;
  variant: AuthLayoutVariant;
}
