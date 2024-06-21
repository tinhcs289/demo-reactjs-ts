import BoxHorizontalSrcoll from '@/components/box/BoxHorizontalSrcoll';
import { GridContainer, GridContainerProps, GridItem, GridItemProps } from '@/components/grid';
export function ListActionButtonItem(props: GridItemProps) {
  const { children, sx, ...otherProps } = props;
  return (
    <GridItem disabledXs sx={{ py: '7px', px: 0.5, ...sx }} {...otherProps}>
      {children}
    </GridItem>
  );
}
export default function ListActionButtonContainer(props: Partial<GridContainerProps>) {
  const { children, ...otherProps } = props;
  return (
    <GridContainer justifyContent="flex-end" {...otherProps}>
      <BoxHorizontalSrcoll height="40px" togglable>
        {children}
      </BoxHorizontalSrcoll>
    </GridContainer>
  );
}
