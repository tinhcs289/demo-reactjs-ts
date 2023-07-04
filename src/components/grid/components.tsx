import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';
import type { ElementType } from 'react';
import { useMemo } from 'react';
export type GridContainerProps<D extends ElementType<any> = 'div'> = GridProps<D> & {
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
export type GridContainerPaperProps = GridContainerProps & {
  elevation?: number;
  paperProps?: Partial<PaperProps>;
};
export function GridContainerPaper(props: GridContainerPaperProps) {
  const { fullWidth = true, fullHeight = false, children, sx, elevation, paperProps, ...otherProps } = props;
  const gridSx = useMemo(
    () => ({
      ...(fullWidth ? { width: '100%' } : {}),
      ...(fullHeight ? { height: '100%' } : {}),
      ...sx,
    }),
    [sx, fullWidth, fullHeight]
  );
  return (
    <Grid component={Paper} {...paperProps} elevation={elevation} {...otherProps} sx={gridSx} container>
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
export type GridItemProps<D extends ElementType<any> = 'div'> = GridProps<D> & {
  contentProps?: Partial<GridProps>;
  disabledXs?: boolean;
};
export function GridItem(props: GridItemProps) {
  const { children, contentProps, disabledXs, ...otherProps } = props;
  const xs = useMemo(() => {
    if (!disabledXs) return { xs: 12 };
    return { width: 'auto' };
  }, [disabledXs]);
  return (
    <Grid {...otherProps} item container {...xs}>
      <Grid {...contentProps} sx={{ width: '100%', ...contentProps?.sx }} xs={12} item container>
        {children}
      </Grid>
    </Grid>
  );
}
export type GridItemPaperProps = GridProps & {
  contentProps?: Partial<GridProps>;
  elevation?: number;
  paperProps?: Partial<PaperProps>;
};
export function GridItemPaper(props: GridItemPaperProps) {
  const { children, contentProps, paperProps, elevation, ...otherProps } = props;
  return (
    <Grid {...otherProps} item container>
      <Grid
        {...contentProps}
        sx={{ ...contentProps?.sx, width: '100%' }}
        xs={12}
        item
        component={Paper}
        {...paperProps}
        elevation={elevation}
      >
        {children}
      </Grid>
    </Grid>
  );
}
