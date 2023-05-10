import { REGEX_EMAIL, REGEX_PHONE } from '@/constants/regex';
import type { ValidationRule } from 'react-hook-form';
export const required = (message: string): { required: string | ValidationRule<boolean> } => ({
  required: { value: true, message },
});
export const min = (value: number, message: string): { min: ValidationRule<number | string> } => ({
  min: { value, message: message },
});
export const max = (value: number, message: string): { max: ValidationRule<number | string> } => ({
  max: { value, message: message },
});
export const minLength = (value: number, message: string): { minLength: ValidationRule<number> } => ({
  minLength: { value, message },
});
export const maxLength = (value: number, message: string): { maxLength: ValidationRule<number> } => ({
  maxLength: { value, message },
});
export const pattern = (value: RegExp, message: string): { pattern: ValidationRule<RegExp> } => ({
  pattern: { value, message },
});
export const email = (message: string) => pattern(REGEX_EMAIL, message);
export const phone = (message: string) => pattern(REGEX_PHONE, message);
