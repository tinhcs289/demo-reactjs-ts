import { AnyObject } from '@/types';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useMemo } from 'react';
import { get } from 'lodash';
import { CommonTypography } from '@/components/typo';
const imageSize = 40;
const BoxContainer = styled(Box, { shouldForwardProp: (p) => p !== 'isDragging' && p !== 'isGroupedOver' })<
  BoxProps & {
    isDragging?: boolean;
    isGroupedOver?: boolean;
  }
>(({ theme, isDragging, isGroupedOver }) => ({
  borderRadius: '2px',
  border: '2px solid transparent',
  boxSizing: 'border-box',
  padding: '8px',
  minHeight: `${imageSize}px`,
  marginBottom: '8px',
  userSelect: 'none',
  display: 'flex',
  ...(!!isDragging
    ? {
        backgroundColor: theme.palette.primary.main,
        borderColor: 'transparent',
        boxShadow: theme.shadows[20],
      }
    : {
        backgroundColor: !!isGroupedOver ? '#EBECF0' : theme.palette.background.paper,
      }),
  color: '#091e42',
  '&:hover': {
    color: '#091e42',
    textDecoration: 'none',
  },
  '&:active': {
    color: '#091e42',
    textDecoration: 'none',
  },
  '&:focus': {
    outline: 'none',
  },
}));
const BoxContent = styled(Box)<BoxProps>({
  /* flex child */
  flexGrow: 1,
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flexBasis: '100%',
  /* flex parent */
  display: 'flex',
  flexDirection: 'column',
});
// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
export type BoxDndItemProps<ItemDataType extends AnyObject = AnyObject> = BoxProps & {
  draggableProvided: DraggableProvided;
  dragSnapshot: DraggableStateSnapshot;
  index: number;
  data: ItemDataType;
};
export default function BoxDndItem<ItemDataType extends AnyObject = AnyObject>(
  props: BoxDndItemProps<ItemDataType>
) {
  const { index, data, dragSnapshot, draggableProvided: provided, style, ...otherProps } = props;
  const isDragging = useMemo(() => !!dragSnapshot?.isDragging, [dragSnapshot?.isDragging]);
  const isGroupedOver = useMemo(() => !!dragSnapshot?.combineTargetFor, [dragSnapshot?.combineTargetFor]);
  return (
    <BoxContainer
      component={Paper}
      {...otherProps}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      ref={provided.innerRef}
      {...provided.draggableProps}
      // put this to element which be grabbing point to drag item
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        ...style,
      }}
      data-is-dragging={isDragging}
      data-testid={data._id}
      data-index={index}
    >
      <BoxContent>
        <CommonTypography color="Highlight">{get(data, 'bookingCode')}</CommonTypography>
      </BoxContent>
    </BoxContainer>
  );
}
