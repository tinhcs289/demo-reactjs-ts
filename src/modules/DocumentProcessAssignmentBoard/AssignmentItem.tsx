import { AnyObject } from '@/types';
import { styled } from '@mui/material';
import type { AvatarProps } from '@mui/material/Avatar';
import Avatar from '@mui/material/Avatar';
import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import type { CardHeaderProps } from '@mui/material/CardHeader';
import CardHeader from '@mui/material/CardHeader';
import { useMemo } from 'react';
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import useGetterOfficerInfo from './useGetterOfficerInfo';
const imageSize = 32;
const AssignmentCard = styled(Card, {
  shouldForwardProp: (p) => p !== 'isDragging' && p !== 'isGroupedOver',
})<
  CardProps & {
    isDragging?: boolean;
    isGroupedOver?: boolean;
  }
>(({ theme, isDragging, isGroupedOver }) => ({
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
const AssigmentCardHeader = styled(CardHeader)<CardHeaderProps>({
  padding: 0,
});
const AssigmentCardAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  width: 24,
  height: 24,
  background: theme.palette.primary.main,
}));
export type AssignmentItemProps<ItemDataType extends AnyObject = AnyObject> = BoxProps & {
  draggableProvided: DraggableProvided;
  dragSnapshot: DraggableStateSnapshot;
  index: number;
  data: ItemDataType;
};
export default function AssignmentItem<ItemDataType extends AnyObject = AnyObject>(
  props: AssignmentItemProps<ItemDataType>
) {
  const { index, data, dragSnapshot, draggableProvided: provided, style, ...otherProps } = props;
  const isDragging = useMemo(() => !!dragSnapshot?.isDragging, [dragSnapshot?.isDragging]);
  const isGroupedOver = useMemo(() => !!dragSnapshot?.combineTargetFor, [dragSnapshot?.combineTargetFor]);
  const { officerId, officerName, officerNameFirstChar, subTitle } = useGetterOfficerInfo(data);
  const $Avatar = useMemo(
    () =>
      data?.Type !== 'DONVI' ? <AssigmentCardAvatar>{officerNameFirstChar}</AssigmentCardAvatar> : undefined,
    [data?.Type, officerNameFirstChar]
  );
  return (
    <AssignmentCard
      {...otherProps}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...(provided.dragHandleProps as any)}
      style={{
        ...provided.draggableProps.style,
        ...style,
      }}
      data-is-dragging={isDragging}
      data-testid={officerId}
      data-index={index}
    >
      <AssigmentCardHeader sx={{ px: 1 }} avatar={$Avatar} title={officerName} subheader={subTitle} />
    </AssignmentCard>
  );
}
