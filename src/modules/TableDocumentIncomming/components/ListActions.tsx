import { GridContainer, GridContainerProps, GridItem } from '@/components/grid';
import ButtonAddDocument from './ButtonAddDocument';
import ButtonExportExcel from './ButtonExportExcel';
import ScrollableContainer from '@/containers/ScrollableContainer';
export default function ListActions(props: Partial<GridContainerProps>) {
  return (
    <GridContainer {...props} justifyContent="flex-end">
      <ScrollableContainer height="40px" togglable>
        <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
          <ButtonExportExcel />
        </GridItem>
        <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
          <ButtonAddDocument />
        </GridItem>
      </ScrollableContainer>
    </GridContainer>
  );
}
