import CommonTable, { CommonPagination, ItemActionMenu } from '@/components/CommonTable';
import type {
  ICommonPaginationProps,
  ICommonTableProps,
  TBodyCellComponent,
  TItemMenuAction,
} from '@/components/CommonTable/_types';
import createStaticListContext from '@/functions/createStaticListContext';
import { ACTION } from '@/hooks/useStaticListState/constants';
import { TAny } from '@/_types/TAny';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import type { MenuProps } from '@mui/material/Menu';
import TableCell from '@mui/material/TableCell';
import type { FC, MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';

function createStaticListContextWithComponent<T extends TAny>() {
  const { useStaticList, StaticListProvider } = createStaticListContext<T>();

  const ListTable: FC<Omit<ICommonTableProps<T>, 'rows' | 'selectable' | 'loading'>> = (props) => {
    const { columns, ...otherProps } = props;

    const [data] = useStaticList((s) => s.data);
    const [isCheckAll] = useStaticList((s) => s.isCheckAll);
    const [isSelected] = useStaticList((s) => s.isSelected);
    const [checkAllItems] = useStaticList((s) => s.control?.checkAllItems);
    const [checkOneItem] = useStaticList((s) => s.control?.checkOneItem);

    const selectable = useMemo(() => {
      return {
        isCheckAll,
        onCheckAll: checkAllItems,
        onCheckRow: checkOneItem,
        isRowSelected: isSelected,
      };
    }, [isCheckAll, checkAllItems, checkOneItem, isSelected]);

    return <CommonTable {...otherProps} rows={data} columns={columns} selectable={selectable} />;
  };

  const ListPaging: FC<Omit<ICommonPaginationProps, 'pageIndex' | 'pageSize' | 'totalCount' | 'onChange'>> = (
    props,
  ) => {
    const [pageIndex] = useStaticList((s) => s.listState.pageIndex);
    const [pageSize] = useStaticList((s) => s.listState.pageSize);
    const [totalCount] = useStaticList((s) => s.listState.totalCount);
    const [updatePaging] = useStaticList((s) => s.control?.updatePaging);

    const handleChangePage = useCallback(
      (page: number) => {
        updatePaging?.(page, 10);
      },
      [updatePaging],
    );

    return (
      <CommonPagination
        {...props}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        onChange={handleChangePage}
      />
    );
  };

  const ListItemActionMenuToggle: TBodyCellComponent<T, { actionType?: string }> = (props) => {
    const { row, actionType, ...otherProps } = props;
    const [set] = useStaticList((s) => s.action?.set);

    const memoAction = useMemo(() => {
      return actionType || ACTION.MORE_ACTION;
    }, [actionType]);

    const item = useMemo(() => {
      return row;
    }, [row]);

    const setAction = useCallback(
      (actionDetail: {
        action: string;
        item?: T | undefined;
        element?: any;
        keepAnchor?: boolean | undefined;
        keepInteract?: boolean | undefined;
      }) => {
        set?.(actionDetail);
      },
      [set],
    );

    const toggleAction: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        if (!event?.target) return;
        if (!item) return;
        setAction({
          item,
          action: memoAction,
          element: event.target,
        });
        return;
      },
      [item, memoAction, setAction],
    );

    return (
      <TableCell {...otherProps}>
        {useMemo(() => {
          return (
            <IconButton onClick={toggleAction}>
              <MoreVertIcon />
            </IconButton>
          );
        }, [toggleAction])}
      </TableCell>
    );
  };

  const ListItemActionMenu: FC<
    Omit<MenuProps, 'anchorEl' | 'open' | 'onClose'> & {
      actionType?: string;
      actions?: TItemMenuAction<T>[];
    }
  > = (props) => {
    const { actionType, actions, ...otherProps } = props;
    const [anchorEl] = useStaticList((s) => s.anchorEl);
    const [interactItem] = useStaticList((s) => s.interactItem);
    const [isItemInteractWithAnchorAction] = useStaticList((s) => s.action?.isItemInteractWithAnchorAction);
    const [clear] = useStaticList((s) => s.action?.clear);
    const [list] = useStaticList((s) => s);

    const memoConfigs = useMemo(() => {
      return Array.isArray(actions)
        ? actions.map((a) => {
            if (!a?.onClick) return a;
            const _onClick = a.onClick;
            a.onClick = (i, e) => {
              _onClick(i, e, list as any);
            };
            return a;
          })
        : [];
    }, [actions, list]);

    const memoAction = useMemo(() => {
      return actionType || ACTION.MORE_ACTION;
    }, [actionType]);

    const anchor = useMemo(() => {
      return anchorEl;
    }, [anchorEl]);

    const open = useMemo(() => {
      return isItemInteractWithAnchorAction?.(memoAction) || false;
    }, [isItemInteractWithAnchorAction, memoAction]);

    const clearAction = useCallback(() => {
      clear?.();
    }, [clear]);

    return (
      <ItemActionMenu
        dataItem={interactItem as T}
        anchorEl={anchor}
        open={open}
        onClose={clearAction}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        actions={memoConfigs}
        {...otherProps}
      />
    );
  };

  return {
    StaticListProvider,
    useStaticList,
    StaticListTable: ListTable,
    StaticListPaging: ListPaging,
    ListItemActionMenuToggle,
    ListItemActionMenu,
  };
}
export default createStaticListContextWithComponent;
