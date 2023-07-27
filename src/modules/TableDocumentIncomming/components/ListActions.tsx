import { GridContainer, GridContainerProps, GridItem } from '@/components/grid';
import ScrollableContainer from '@/containers/ScrollableContainer';
import ButtonAddDocument from './ButtonAddDocument';
import ButtonExportExcel from './ButtonExportExcel';
import ButtonRequestComment from './ButtonRequestComment';
import ButtonPublish from './ButtonPublish';
export default function ListActions(props: Partial<GridContainerProps>) {
  return (
    <GridContainer {...props} justifyContent="flex-end">
      <ScrollableContainer height="40px" togglable>
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
      </ScrollableContainer>
    </GridContainer>
  );
}
