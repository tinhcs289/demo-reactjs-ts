import { ButtonNegative } from '@/components/buttons';
import type { CheckGroupOption, CommonCheckGroupFieldProps } from '@/components/inputs/CommonCheckGroupField';
import CommonCheckGroupField from '@/components/inputs/CommonCheckGroupField';
import type { CommonTableProps } from '@/components/table/CommonTable/_types';
import createFastContext from '@/functions/createFastContext';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import type { TooltipProps } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';
import { cloneDeep } from 'lodash';
import type { ComponentType, MouseEvent, ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';
export type CommonTableColumnVisibilityContextValues = {
  columns: CommonTableProps['columns'];
  visibledColumns: string[];
};
const { Provider, useGetter, useSetter, useDefaultPropInit } =
  createFastContext<CommonTableColumnVisibilityContextValues>({ visibledColumns: [], columns: [] });
export type CommonTableColumnVisibilityProps = {
  columns: CommonTableProps['columns'];
  children?: ReactNode;
};
function VisibilityInitializer(props: { visibledColumns: string[]; columns: CommonTableProps['columns'] }) {
  useDefaultPropInit('visibledColumns', props?.visibledColumns);
  useDefaultPropInit('columns', props?.columns);
  return <></>;
}
export function CommonTableColumnVisibility({ columns, children }: CommonTableColumnVisibilityProps) {
  return (
    <Provider>
      <VisibilityInitializer columns={columns} visibledColumns={columns?.map?.((c) => `${c?.field}`) || []} />
      {children}
    </Provider>
  );
}
export function useColumnVisibility() {
  const setState = useSetter();
  const _columns = useGetter((s) => s?.columns);
  const columns = useGetter((s) => s?.visibledColumns);
  const visibledColumns = useMemo(() => arrayOrEmpty(columns), [columns]);
  const showColumn = useCallback(
    (col: string) => {
      if (!col) return;
      if (columns.includes(col)) return;
      const newCols = cloneDeep(columns);
      newCols.push(col);
      setState({ visibledColumns: newCols });
    },
    [columns, setState]
  );
  const hideColumn = useCallback(
    (col: string) => {
      if (!col) return;
      if (!columns.includes(col)) return;
      const newCols = columns.filter((c) => c !== col);
      setState({ visibledColumns: newCols });
    },
    [columns, setState]
  );
  const setColumnsVisibility = useCallback(
    (cols: string[]) => {
      if (!Array.isArray(cols)) return;
      setState({ visibledColumns: cols });
    },
    [setState]
  );
  return {
    columns: _columns,
    visibledColumns,
    showColumn,
    hideColumn,
    setColumnsVisibility,
  };
}
export function withColumnVisibility(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function TableWithColumnVisibility(props: any) {
    const { columns: clms, ...otherProps } = props;
    const visibledColumns = useGetter((s) => s?.visibledColumns);
    const columns = useMemo(() => {
      const newColumns: CommonTableProps['columns'] = [];
      (clms as CommonTableProps['columns']).forEach((c) => {
        if (!visibledColumns.includes(`${c?.field}`)) return;
        newColumns.push(c);
      });
      return newColumns;
    }, [clms, visibledColumns]);
    return <WrappedComponent {...otherProps} columns={columns} />;
  };
}
function ColumnList() {
  const { columns, visibledColumns, setColumnsVisibility } = useColumnVisibility();
  const checkGroup: CheckGroupOption[] = useMemo(() => {
    if (!Array.isArray(columns)) return [];
    return columns.map((col) => ({
      value: `${col?.field}`,
      label: col?.headCell as any,
    }));
  }, [columns]);
  const value: CheckGroupOption[] = useMemo(() => {
    if (!Array.isArray(visibledColumns)) return [];
    return columns
      .filter((col) => visibledColumns.includes(`${col?.field}`))
      .map((col) => ({
        value: `${col?.field}`,
        label: col?.headCell as any,
      }));
  }, [columns, visibledColumns]);
  const handleUpdate: Required<CommonCheckGroupFieldProps>['onChange'] = useCallback(
    (options) => {
      if (!Array.isArray(options)) {
        setTimeout(() => {
          setColumnsVisibility([]);
        }, 0);
        return;
      }
      const newVisibledColumns = options.map((o) => `${o?.value}`);
      setTimeout(() => {
        setColumnsVisibility(newVisibledColumns);
      }, 0);
      return;
    },
    [setColumnsVisibility]
  );
  return (
    <CommonCheckGroupField
      label="Lựa chọn cột hiển thị"
      options={checkGroup}
      value={value}
      onChange={handleUpdate}
    />
  );
}
function SelectAllColumn() {
  const { columns, visibledColumns, setColumnsVisibility } = useColumnVisibility();
  const colLength = useMemo(() => columns?.length || 0, [columns?.length]);
  const vcolLength = useMemo(() => visibledColumns?.length || 0, [visibledColumns?.length]);
  const shouldShow = useMemo(() => colLength > vcolLength, [colLength, vcolLength]);
  const selectAllColumn = useCallback(() => {
    setTimeout(() => {
      setColumnsVisibility(columns.map((c) => `${c?.field}`));
    }, 0);
  }, [setColumnsVisibility, columns]);
  const $Button = useMemo(() => {
    if (!shouldShow) return <div></div>;
    return <ButtonNegative onClick={selectAllColumn}>Chọn tất cả</ButtonNegative>;
  }, [shouldShow, selectAllColumn]);
  return $Button;
}
export type ChangeColumnVisibilityIconButtonProps = IconButtonProps & {
  icon?: ReactNode;
  tooltipProps?: Partial<TooltipProps>;
};
export function ChangeColumnVisibilityIconButton(props: ChangeColumnVisibilityIconButtonProps) {
  const { tooltipProps, icon, ...otherProps } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const handleToggle = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event?.stopPropagation?.();
      setAnchorEl(anchorEl ? null : event?.currentTarget);
    },
    [setAnchorEl, anchorEl]
  );
  const handleClickAway = useCallback(
    (event: globalThis.MouseEvent | TouchEvent) => {
      if (!open) return;
      event?.stopPropagation?.();
      setAnchorEl(null);
      return;
    },
    [open, setAnchorEl]
  );
  return (
    <>
      <Tooltip title="Thay đổi hiển thị các cột" {...tooltipProps}>
        <IconButton size="small" onClick={handleToggle} {...otherProps}>
          {icon || <ViewColumnIcon color="primary" />}
        </IconButton>
      </Tooltip>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper placement="bottom-start" sx={{ zIndex: 1300 }} open={open} anchorEl={anchorEl}>
          <Card elevation={5} sx={{ minWidth: 375 }}>
            <CardContent>
              <ColumnList />
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <SelectAllColumn />
              <ButtonNegative onClick={handleToggle}>Đóng</ButtonNegative>
            </CardActions>
          </Card>
        </Popper>
      </ClickAwayListener>
    </>
  );
}
