import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Tooltip, styled } from '@mui/material';
import type { AvatarProps } from '@mui/material/Avatar';
import Avatar from '@mui/material/Avatar';
import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import type { CardHeaderProps } from '@mui/material/CardHeader';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import type { MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import type { NestedOfficersInfo } from './_types';
import useGetterOfficerInfo from './useGetterOfficerInfo';
const OfficerCard = styled(Card, {
  shouldForwardProp: (p) => p !== 'isDragging' && p !== 'isGroupedOver',
})<
  CardProps & {
    isDragging?: boolean;
    isGroupedOver?: boolean;
  }
>(({ theme, isDragging, isGroupedOver }) => ({
  borderRadius: '2px',
  padding: '8px',
  minHeight: `32px`,
  marginBottom: '8px',
  width: 'auto',
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
const OfficerCardHeader = styled(CardHeader)<CardHeaderProps>({
  padding: 0,
});
const OfficerCardAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  width: 24,
  height: 24,
  background: theme.palette.primary.main,
}));
export type OfficerPickerItemProps = BoxProps & {
  index: number;
  data: NestedOfficersInfo;
  level: number;
  onLoadMore: (params: { unitId: string }) => void;
};
export default function OfficerPickerItem(props: OfficerPickerItemProps) {
  const { index, data, level, onLoadMore, ...otherProps } = props;
  const { hasChilds, officerName, subTitle, officerNameFirstChar } = useGetterOfficerInfo(data);
  const $Avatar = useMemo(
    () =>
      data?.Type !== 'DONVI' ? <OfficerCardAvatar>{officerNameFirstChar}</OfficerCardAvatar> : undefined,
    [data?.Type, officerNameFirstChar]
  );
  const handleLoadMore: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.stopPropagation?.();
      if (hasChilds) return;
      if (!data?.DonViId) return;
      onLoadMore?.({ unitId: data.DonViId });
    },
    [hasChilds, data?.DonViId, onLoadMore]
  );
  const $Loadmore = useMemo(() => {
    if (hasChilds) return undefined;
    if (data?.Type !== 'DONVI') return undefined;
    return (
      <Tooltip title="Tải thêm">
        <IconButton onClick={handleLoadMore}>
          <ArrowForwardIcon />
        </IconButton>
      </Tooltip>
    );
  }, [hasChilds, data?.Type, handleLoadMore]);
  const headerPropsWhenHasChilds: Partial<CardHeaderProps> = useMemo(() => {
    if (!hasChilds && data?.Type !== 'DONVI') return {};
    const _props: Partial<CardHeaderProps> = {
      action: $Loadmore,
      titleTypographyProps:
        data?.Type === 'DONVI'
          ? {
              fontSize: 14,
              fontWeight: 700,
              textTransform: 'uppercase',
            }
          : undefined,
    };
    return _props;
  }, [hasChilds, data?.Type, $Loadmore]);
  const $ChildItems = useMemo(() => {
    if (!data?._childrens) return null;
    if (!Array.isArray(data._childrens)) return null;
    if (data._childrens.length === 0) return null;
    return data._childrens.map((officer) => {
      return (
        <OfficerPickerItem
          key={officer.Id}
          index={(officer as any)?._index}
          data={officer}
          level={level + 1}
          onLoadMore={onLoadMore}
        />
      );
    });
  }, [data?._childrens, level, onLoadMore]);
  const isDraggable = useMemo(() => !hasChilds && data?.Type === 'CANBO', [hasChilds, data?.Type]);
  const draggableId = useMemo(() => data?.Id || '', [data?.Id]);
  return (
    <>
      <Draggable key={draggableId} draggableId={draggableId} index={index} isDragDisabled={!isDraggable}>
        {(provided, snapshot) => {
          const isDragging = !!snapshot?.isDragging;
          const isGroupedOver = !!snapshot?.combineTargetFor;
          return (
            <>
              <OfficerCard
                {...otherProps}
                isDragging={isDragging}
                isGroupedOver={isGroupedOver}
                ref={provided.innerRef}
                {...(provided.draggableProps as any)}
                {...(provided.dragHandleProps as any)}
                style={{
                  ...provided.draggableProps.style,
                  marginLeft: `${level * 16}px`,
                }}
                data-is-dragging={isDragging}
                data-testid={data.Id}
                data-index={index}
              >
                <OfficerCardHeader
                  avatar={$Avatar}
                  title={officerName}
                  subheader={subTitle}
                  {...headerPropsWhenHasChilds}
                />
              </OfficerCard>
            </>
          );
        }}
      </Draggable>
      {$ChildItems}
    </>
  );
}
