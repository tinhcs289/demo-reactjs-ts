import type { ReactNode } from 'react';
export type TextWithRequiredMarkProps = {
  children?: ReactNode;
  required?: boolean;
  mask?: ReactNode;
};
export function TextWithRequiredMark(props: TextWithRequiredMarkProps) {
  if (!props?.children) return null;
  return (
    <>
      {props.children}
      {!!props?.required ? <>&nbsp;{props?.mask || '*'}</> : null}
    </>
  );
}
