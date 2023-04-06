import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { ReactNode } from 'react';

export type CommonTagInputItem = {
  id: string | number;
  label?: string;
  [x: string]: any;
};

export type CommonTagInputFieldProps = Omit<CommonTextFieldProps, 'value' | 'onChange'> & {
  value?: CommonTagInputItem[];
  onChange?: (tags?: CommonTagInputItem[]) => void;
  renderTag?: (tag: CommonTagInputItem, index: number, deleteTag: (tag: CommonTagInputItem) => void) => ReactNode;
};
