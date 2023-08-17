import { GridContainer, GridContainerProps, GridItem } from '@/components/grid';
import BoxHorizontalSrcoll from '@/components/box/BoxHorizontalSrcoll';
import ButtonAddDocument from './ButtonAddDocument';
import ButtonExportExcel from './ButtonExportExcel';
import ButtonRequestComment from './ButtonRequestComment';
import ButtonPublish from './ButtonPublish';
export default function ListActions(props: Partial<GridContainerProps>) {
  return (
    <GridContainer {...props} justifyContent="flex-end">
      <BoxHorizontalSrcoll height="40px" togglable>
        <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
          <ButtonAddDocument />
        </GridItem>
        <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
          <ButtonExportExcel />
        </GridItem>
        <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
          <ButtonRequestComment />
        </GridItem>
        <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
          <ButtonPublish />
        </GridItem>
      </BoxHorizontalSrcoll>
    </GridContainer>
  );
}
