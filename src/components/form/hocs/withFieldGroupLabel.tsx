import { H4 } from '@/components/typo';
import { styled } from '@mui/material';
import type { DividerProps } from '@mui/material/Divider';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { ComponentType } from 'react';
const DividerStyled = styled(Divider)<DividerProps>(({ theme }) => ({
  borderColor: theme.palette.grey[200],
}));
export default function withFieldGroupLabel(label: string) {
  return function withFieldGroupLabelHoc(WrappedComponent: ComponentType<any>): ComponentType<any> {
    return function FieldGroupWithLabel(props: any) {
      return (
        <>
          <Grid item xs={12}>
            <H4 color="GrayText" fontSize={14}>
              {label}
            </H4>
          </Grid>
          <Grid item xs={12} mb={2}>
            <DividerStyled />
          </Grid>
          <WrappedComponent {...props} />
        </>
      );
    };
  };
}
