import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { ReactNode, ComponentType } from 'react';

export type CommonTagInputItem = {
  id: string | number;
  label?: string;
  [x: string]: any;
};
export type TagComponentProps = {
  tag: CommonTagInputItem;
  index: number;
  deleteTag: (tag: CommonTagInputItem) => void
};
export type TagComponent = ComponentType<TagComponentProps>;
export type TagComponentRender = (props: TagComponentProps) => ReactNode;
export type CommonTagInputFieldProps = Omit<CommonTextFieldProps, 'value' | 'onChange'> & {
  value?: CommonTagInputItem[];
  onChange?: (tags?: CommonTagInputItem[]) => void;
  renderTag?: TagComponentRender | TagComponent;
  maxOfTags?: number;
};
