import CommonTable, { CommonPagination, ItemActionMenu, CommonTablePagination } from '@/components/CommonTable';
import type {
  ICommonPaginationProps,
  ICommonTableProps,
  TBodyCellInnerComponent,
  TItemMenuAction,
  TItemMenuActionComponent,
  ICommonTablePaginationProps,
} from '@/components/CommonTable/_types';
import createAsyncListContext from '@/functions/createAsyncListContext';
import { ACTION, ERequestStatus } from '@/hooks/useAsyncListState/constants';
import { TAny } from '@/_types/TAny';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import type { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { FC, MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';

function createAsyncListContextWithComponent<T extends TAny>() {
  const { useAsyncList, AsyncListProvider } = createAsyncListContext<T>();

  const ListTable: FC<Omit<ICommonTableProps<T>, 'rows' | 'selectable' | 'loading'>> = (props) => {
    const { columns, ...otherProps } = props;

    const [data] = useAsyncList((s) => s.data);
    const [isCheckAll] = useAsyncList((s) => s.isCheckAll);
    const [isSelected] = useAsyncList((s) => s.isSelected);
    const [checkAllItems] = useAsyncList((s) => s.control?.checkAllItems);
    const [checkOneItem] = useAsyncList((s) => s.control?.checkOneItem);
    const [fetchState] = useAsyncList((s) => s.fetchState);

    const selectable = useMemo(() => {
      return {
        isCheckAll,
        onCheckAll: checkAllItems,
        onCheckRow: checkOneItem,
        isRowSelected: isSelected,
      };
    }, [isCheckAll, checkAllItems, checkOneItem, isSelected]);

    const loading = useMemo(() => {
      return fetchState === ERequestStatus.REQUESTING;
    }, [fetchState]);

    return <CommonTable {...otherProps} rows={data} columns={columns} loading={loading} selectable={selectable} />;
  };

  const ListTablePaging: FC<Omit<ICommonTablePaginationProps, 'pageIndex' | 'pageSize' | 'totalCount' | 'onChange'>> = (
    props,
  ) => {
    const [pageIndex] = useAsyncList((s) => s.listState.pageIndex);
    const [pageSize] = useAsyncList((s) => s.listState.pageSize);
    const [totalCount] = useAsyncList((s) => s.listState.totalCount);
    const [updatePaging] = useAsyncList((s) => s.control?.updatePaging);

    const handleChangePage = useCallback(
      (page: number, size: number) => {
        updatePaging?.(page, size);
      },
      [updatePaging],
    );

    return (
      <CommonTablePagination
        {...props}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        onChange={handleChangePage}
      />
    );
  };

  const ListPaging: FC<Omit<ICommonPaginationProps, 'pageIndex' | 'pageSize' | 'totalCount' | 'onChange'>> = (
    props,
  ) => {
    const [pageIndex] = useAsyncList((s) => s.listState.pageIndex);
    const [pageSize] = useAsyncList((s) => s.listState.pageSize);
    const [totalCount] = useAsyncList((s) => s.listState.totalCount);
    const [updatePaging] = useAsyncList((s) => s.control?.updatePaging);

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

  const ListItemActionMenuToggle: TBodyCellInnerComponent<T, { actionType?: string }> = (props) => {
    const { row, actionType } = props;
    const [set] = useAsyncList((s) => s.action?.set);

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

    const toggler = useMemo(() => {
      return (
        <IconButton onClick={toggleAction}>
          <MoreVertIcon />
        </IconButton>
      );
    }, [toggleAction]);

    return toggler;
  };

  const ListItemActionMenu: FC<
    Omit<MenuProps, 'anchorEl' | 'open' | 'onClose'> & {
      actionType?: string;
      actions?: TItemMenuAction<T>[];
    }
  > = (props) => {
    const { actionType, actions, ...otherProps } = props;
    const [anchorEl] = useAsyncList((s) => s.anchorEl);
    const [interactItem] = useAsyncList((s) => s.interactItem);
    const [clear] = useAsyncList((s) => s.action?.clear);
    const [isItemInteractWithAnchorAction] = useAsyncList((s) => s.action?.isItemInteractWithAnchorAction);
    const [list] = useAsyncList((s) => s);

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

    const clearAction = useCallback(() => {
      clear?.();
    }, [clear]);

    const open = useMemo(() => {
      return isItemInteractWithAnchorAction?.(memoAction) || false;
    }, [isItemInteractWithAnchorAction, memoAction]);

    return (
      <ItemActionMenu
        dataItem={interactItem as T}
        anchorEl={anchor}
        onClose={clearAction}
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        actions={memoConfigs}
        {...otherProps}
      />
    );
  };

  const ListItemActionDelete: TItemMenuActionComponent<T, TAny> = (props) => {
    const { icon, label, props: otherProps } = props;
    const [set] = useAsyncList((s) => s?.action?.set);

    const handleClick = useCallback(() => {
      set?.({
        action: ACTION.DELETE,
        keepInteract: true,
        keepAnchor: true,
      });
    }, [set]);

    return (
      <MenuItem {...(otherProps as any)} onClick={handleClick}>
        {icon()}
        {label()}
      </MenuItem>
    );
  };

  const ListItemActionEdit: TItemMenuActionComponent<T, TAny> = (props) => {
    const { icon, label, props: otherProps } = props;
    const [set] = useAsyncList((s) => s?.action?.set);

    const handleClick = useCallback(() => {
      set?.({
        action: ACTION.OPEN_DETAIL,
        keepInteract: true,
      });
    }, [set]);

    return (
      <MenuItem {...(otherProps as any)} onClick={handleClick}>
        {icon()}
        {label()}
      </MenuItem>
    );
  };

  return {
    AsyncListProvider,
    useAsyncList,
    AsyncListTable: ListTable,
    AsyncListPaging: ListPaging,
    AsyncListTablePaging: ListTablePaging,
    ListItemActionMenuToggle,
    ListItemActionMenu,
    ListItemActionEdit,
    ListItemActionDelete,
  };
}
export default createAsyncListContextWithComponent;
