import type { TCommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { ReactNode } from 'react';

export type TCommonTagInput = {
  id: string | number;
  label?: string;
  [x: string]: any;
};

export type TCommonTagInputFieldProps = Omit<TCommonTextFieldProps, 'value' | 'onChange'> & {
  value?: TCommonTagInput[];
  onChange?: (tags?: TCommonTagInput[]) => void;
  renderTag?: (tag: TCommonTagInput, index: number, deleteTag: (tag: TCommonTagInput) => void) => ReactNode;
};
