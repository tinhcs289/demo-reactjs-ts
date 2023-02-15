import type { GridProps } from '@mui/material/Grid';
export type TFormGridItemProps = GridProps & {
  contentProps?: GridProps;
  disabledXs?: boolean;
  label?: ReactNode;
};
