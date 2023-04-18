import newGuid from '@/helpers/stringHelpers/newGuid';
import useToggle from '@/hooks/useToggle';
import type { AnyObject } from '@/types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import cloneDeep from 'lodash/cloneDeep';
import type { ReactNode } from 'react';
import { createRef, useCallback, useEffect, useMemo, useRef } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import type {
  BodyCellComponent,
  BodyCellInnerComponent,
  BodyCellInnerRenderFunction,
  BodyCellRenderFunction,
  CommonTableConfig,
  DetailPanelComponent,
  DetailPanelToggleComponent,
  ItemMenuActionComponent,
  ItemMenuActionConfig,
  ItemMenuActionRenderFunction,
} from './_types';
//#region Table
/**
 * create an array of configurations for table columns
 * @param headers
 * @returns
 */
export function tableConfig<RowData extends AnyObject>(
  ...headers: Array<Omit<CommonTableConfig<RowData>, '_key'>>
): Array<CommonTableConfig<RowData>> {
  return headers.map((head) => ({ ...head, _key: newGuid() }));
}
/**
 * Override the `TableCell` Component
 * @param Cell the custom cell Component
 * @returns
 */
export function createCellComponent<RowData extends AnyObject>(
  Cell: BodyCellComponent<RowData, AnyObject>
): BodyCellRenderFunction<RowData, AnyObject> {
  return function CustomCell(args) {
    return <Cell {...args} />;
  };
}
/**
 * Override the `children` of `TableCell` Component
 * @param Cell the custom cell children
 */
export function createCellInnerComponent<RowData extends AnyObject>(
  CellInner: BodyCellInnerComponent<RowData, AnyObject>
): BodyCellInnerRenderFunction<RowData, AnyObject> {
  return function CustomCellInner(args) {
    return <CellInner {...args} />;
  };
}
//#endregion
//#region ActionMenu
/**
 * Override the `ListItem` Component
 * @param Item the custom ListItem Component
 * @returns
 */
export function createMenuActionItem<RowData extends AnyObject>(
  Item: ItemMenuActionComponent<RowData, AnyObject>
): ItemMenuActionRenderFunction<RowData, AnyObject> {
  return function CustomActionItem(args) {
    const { key, ...otherArgs } = args;
    return <Item key={key} {...otherArgs} />;
  };
}
/**
 * create an array of configurations for popover menu for each row
 * @param actions
 * @returns
 */
export function menuActions<RowData extends AnyObject>(
  actions: Array<
    Omit<ItemMenuActionConfig<RowData>, 'key' | 'type'> & Partial<Pick<ItemMenuActionConfig<RowData>, 'type'>>
  >
): ItemMenuActionConfig<RowData>[] {
  return actions.map((a) => ({ ...a, key: newGuid(), type: a?.type || 'item' }));
}
//#endregion
//#region Detail Panel

function DetailPanelBox(props: { children?: ReactNode }) {
  const { children } = props;
  const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    if (!ref?.current || !(ref?.current instanceof Element)) return;
    const table = ref.current.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
    if (!table || !(table instanceof Element)) return;
    ref.current.style.width = `${table.clientWidth || 0}px`;
    new ResizeObserver(function () {
      if (!ref?.current) return;
      ref.current.style.width = `${table.clientWidth || 0}px`;
    }).observe(table);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box ref={ref} sx={{ position: 'sticky', left: 0, p: 0, m: 0 }}>
      {children}
    </Box>
  );
}
function getTableCellElement(rowId: any, position: 'top' | 'bottom') {
  if (!rowId || !position) return null;
  const $panel = document?.querySelector?.(`tr#common-table-detail-panel-${position}--${rowId} > td`);
  if ($panel instanceof Element) return $panel as HTMLElement;
  return null;
}
function displayTableCellContent(element: HTMLElement | null | undefined) {
  if (!element) return;
  element.style.display = 'table-cell';
}
export function createDetalPanel<T extends AnyObject>(
  DetailPanelComponent: DetailPanelComponent<T>,
  ToggleComponent?: DetailPanelToggleComponent<T>
): BodyCellInnerComponent<T, AnyObject> {
  return function TableRowDetailPanel({ row, rowIndex }) {
    const [open, toggle] = useToggle(false);
    const refTop = useRef<Root | null>();
    const refBottom = useRef<Root | null>();
    //#region Bottom Panel
    const closeBottomPanel = useCallback(() => {
      if (!refBottom?.current) return;
      const panel = getTableCellElement(row?.id, 'bottom');
      if (!!panel) panel.style.display = 'none';
      refBottom.current.unmount();
      refBottom.current = null;
    }, [row?.id]);
    const _closeBottomPanel = useCallback(() => {
      toggle();
      closeBottomPanel();
    }, [toggle, closeBottomPanel]);
    const openBottomPanel = useCallback(() => {
      const panel = getTableCellElement(row?.id, 'bottom');
      if (!panel) return;
      const root = refBottom?.current || createRoot(panel);
      if (!refBottom?.current) refBottom.current = root;
      root.render(
        <DetailPanelBox>
          <DetailPanelComponent row={row} rowIndex={rowIndex} closePanel={_closeBottomPanel} />
        </DetailPanelBox>
      );
      displayTableCellContent(panel);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row?.id, rowIndex, _closeBottomPanel]);
    //#endregion
    //#region Top Panel
    const closeTopPanel = useCallback(() => {
      if (!refTop?.current) return;
      const panel = getTableCellElement(row?.id, 'top');
      if (!!panel) panel.style.display = 'none';
      refTop.current.unmount();
      refTop.current = null;
    }, [row?.id]);
    const _closeTopPanel = useCallback(() => {
      toggle();
      closeTopPanel();
    }, [toggle, closeTopPanel]);
    const openTopPanel = useCallback(() => {
      const panel = getTableCellElement(row?.id, 'top');
      if (!panel) return;
      const root = refTop?.current || createRoot(panel);
      if (!refTop?.current) refTop.current = root;
      root.render(
        <DetailPanelBox>
          <DetailPanelComponent row={row} rowIndex={rowIndex} closePanel={_closeTopPanel} />
        </DetailPanelBox>
      );
      displayTableCellContent(panel);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row?.id, rowIndex, rowIndex, _closeTopPanel]);
    //#endregion
    const handleToggle = useCallback(
      (e: any, position: 'top' | 'bottom' = 'bottom') => {
        e?.preventDefault?.();
        if (!position) toggle();
        const currentOpen = cloneDeep(open);
        if (currentOpen) {
          toggle();
          if (position === 'top') closeTopPanel();
          if (position === 'bottom') closeBottomPanel();
        } else {
          toggle();
          if (position === 'top') openTopPanel();
          if (position === 'bottom') openBottomPanel();
        }
      },
      [open, toggle, openTopPanel, openBottomPanel, closeTopPanel, closeBottomPanel]
    );
    const $toggler = useMemo(() => {
      if (!ToggleComponent)
        return (
          <IconButton onClick={handleToggle} title={open ? 'open' : 'close'}>
            {!open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        );
      return <ToggleComponent open={open} toggle={handleToggle as any} row={row} rowIndex={rowIndex} />;
    }, [open, handleToggle, row, rowIndex]);
    return <>{$toggler}</>;
  };
}
//#endregion
