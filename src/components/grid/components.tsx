import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';
import { useMemo } from 'react';
export type GridContainerProps = GridProps & {
  fullWidth?: boolean;
  fullHeight?: boolean;
};
export function GridContainer(props: GridContainerProps) {
  const { fullWidth = true, fullHeight = false, children, sx, ...otherProps } = props;
  const gridSx = useMemo(
    () => ({
      ...(fullWidth ? { width: '100%' } : {}),
      ...(fullHeight ? { height: '100%' } : {}),
      ...sx,
    }),
    [sx, fullWidth, fullHeight]
  );
  return (
    <Grid {...otherProps} sx={gridSx} container>
      {children}
    </Grid>
  );
}
export function GridContainerRelative(props: GridContainerProps) {
  const { children, sx, ...otherProps } = props;
  return (
    <GridContainer {...otherProps} sx={{ ...sx, position: 'relative' }}>
      {children}
    </GridContainer>
  );
}
export type GridItemProps = GridProps & {
  contentProps?: GridProps;
};
export function GridItem(props: GridItemProps) {
  const { children, contentProps, ...otherProps } = props;
  return (
    <Grid {...otherProps} item container>
      <Grid {...contentProps} sx={{ ...contentProps?.sx, width: '100%' }} xs={12} item>
        {children}
      </Grid>
    </Grid>
  );
}
export type GridItemPaperProps = GridProps & {
  contentProps?: GridProps;
  paperProps?: PaperProps;
};
export function GridItemPaper(props: GridItemPaperProps) {
  const { children, contentProps, paperProps, ...otherProps } = props;
  return (
    <Grid {...otherProps} item container>
      <Grid
        {...contentProps}
        sx={{ ...contentProps?.sx, width: '100%' }}
        xs={12}
        item
        component={Paper}
        {...paperProps}
        elevation={paperProps?.elevation || 4}
      >
        {children}
      </Grid>
    </Grid>
  );
}
