import type { BoxProps } from '@mui/material/Box';
import type { GridProps } from '@mui/material/Grid';
import type { FormEventHandler } from 'react';

export type TFormGridContainerProps = GridProps & {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  formProps?: BoxProps<'form'>;
  loading?: boolean;
};
