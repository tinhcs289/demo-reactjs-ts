import render from '@/helpers/reactHelpers/render';
import type { SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import type { ICommonTableConfig } from './_types';

export const stickyFirstClass = 'sticky-first';
export const stickyLastClass = 'sticky-last';
export const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
  scrollBehavior: 'smooth',
  //#region scroll bar
  '::-webkit-scrollbar': {
    width: theme.spacing(1.2),
    height: theme.spacing(1.2),
  },
  '::-webkit-scrollbar-track': {
    background: theme.palette.action.hover,
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[400],
    borderRadius: theme.shape.borderRadius,
  },
  '::-webkit-scrollbar-thumb:hover': {
    cursor: 'pointer',
    background: theme.palette.grey[500],
    boxShadow: theme.shadows[2],
  },
  '::-webkit-scrollbar-thumb:active': {
    cursor: 'grab',
    background: theme.palette.primary.dark,
    boxShadow: theme.shadows[6],
  },
  '::-webkit-scrollbar-corner': {
    background: theme.palette.action.hover,
  },
  //#endregion
  //#region hover on row
  '& tbody > tr:hover > td': {
    background: theme.palette.action.hover,
    backdropFilter: 'blur(8px)',
  },
  //#endregion
}));
const cellEndDividerSx: SxProps<Theme> = {
  '& th': {
    ':after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      background: (t) => t?.palette?.grey?.[300],
      top: '50%',
      transform: 'translateY(-50%)',
      right: 0,
      width: '2px',
      height: '60%',
      borderRadius: '2px',
      overflowY: 'hidden',
    },
    ':last-child': {
      ':after': {
        opacity: 0,
      },
    },
  },
};
const stickySx: SxProps<Theme> = {
  position: 'sticky',
  whiteSpace: 'nowrap',
  overflowY: 'hidden',
  background: (t) => t?.palette?.background?.paper,
};
const boxShadowCellFirst =
  '0px 0px 0 0 rgb(0 0 0 / 0%), 4px 0px 4px 0px rgb(0 0 0 / 14%), inset 0px 0 0 0 rgb(0 0 0 / 0%)';
const boxShadowCellLast = '0px 0 0 0 rgb(0 0 0 / 0%), -4px 0 4px 0 rgb(0 0 0 / 14%), 0px 0 0 0 rgb(0 0 0 / 0%)';
const stickyFirstSx: SxProps<Theme> = { left: 0, right: 'unset', boxShadow: boxShadowCellFirst };
const stickyLastSx: SxProps<Theme> = { left: 'unset', right: 0, boxShadow: boxShadowCellLast };

const stickyHeadCellSx: SxProps<Theme> = { ...stickySx, zIndex: (t) => t?.zIndex?.modal - 1 };
const stickyBodyCellSx: SxProps<Theme> = { ...stickySx, zIndex: (t) => t?.zIndex?.modal - 2 };
export const CheckSellHeadSx: SxProps<Theme> = { ...stickyHeadCellSx, ...stickyFirstSx };
export const CheckSellBodySx: SxProps<Theme> = { ...stickyBodyCellSx, ...stickyFirstSx };
export const renderHeadCell = <T extends Record<string, any>>(head: ICommonTableConfig<T>) => {
  if (!head || !!head?.isHide || !head?.headCell) return null;
  const _cellProps = head?.headCellProps || {};
  if (!!head?.stickyFirst) {
    _cellProps.sx = { ..._cellProps.sx, ...stickyHeadCellSx, ...stickyFirstSx } as any;
    if (!`${_cellProps.className || ''}`.includes(stickyFirstClass))
      _cellProps.className = `${_cellProps.className || ''} ${stickyFirstClass}`;
  } else if (!!head?.stickyLast) {
    _cellProps.sx = { ..._cellProps.sx, ...stickyHeadCellSx, ...stickyLastSx } as any;
    if (!`${_cellProps.className || ''}`.includes(stickyLastClass))
      _cellProps.className = `${_cellProps.className || ''} ${stickyLastClass}`;
  }
  if (typeof head.headCell === 'string' || typeof head.headCell === 'number' || typeof head.headCell === 'boolean')
    return <TableCell {..._cellProps}>{head.headCell}</TableCell>;
  return render(head.headCell, _cellProps);
};
export const renderBodyCell = <T extends Record<string, any>>(
  cell: ICommonTableConfig<T>,
  row: T,
  rowIndex?: number,
) => {
  if (!row || !cell || !!cell?.isHide) return null;
  const _cellProps = !!cell.bodyCellProps
    ? typeof cell.bodyCellProps === 'function'
      ? cell.bodyCellProps(row, rowIndex)
      : cell.bodyCellProps
    : {};
  if (!!cell?.stickyFirst) {
    _cellProps.sx = { ..._cellProps.sx, ...stickyBodyCellSx, ...stickyFirstSx } as any;
    if (!`${_cellProps.className || ''}`.includes(stickyFirstClass))
      _cellProps.className = `${_cellProps.className || ''} ${stickyFirstClass}`;
  } else if (!!cell?.stickyLast) {
    _cellProps.sx = { ..._cellProps.sx, ...stickyBodyCellSx, ...stickyLastSx } as any;
    if (!`${_cellProps.className || ''}`.includes(stickyLastClass))
      _cellProps.className = `${_cellProps.className || ''} ${stickyLastClass}`;
  }
  if (!!cell.bodyCellInner)
    return <TableCell {..._cellProps}>{render(cell.bodyCellInner, { row, rowIndex })}</TableCell>;
  if (!!cell.bodyCell) return render(cell.bodyCell, { ..._cellProps, row, rowIndex });
  if (typeof cell.field === 'string') return <TableCell {..._cellProps}>{row[cell.field] || ''}</TableCell>;
  return null;
};
export const defaultContainerProps = (sx?: SxProps<Theme>): SxProps<Theme> => ({
  maxHeight: (t) => t?.spacing?.(72),
  ...sx,
  position: 'relative',
});
export const defaultTableProps = (sx?: SxProps<Theme>): SxProps<Theme> => ({
  width: '100%',
  ...sx,
});
export const defaultTableHeadProps = (sx?: SxProps<Theme>): SxProps<Theme> => ({
  whiteSpace: 'nowrap',
  ...cellEndDividerSx,
  ...sx,
  position: 'relative',
});
//#region Init Sticky column
function sumWidth(elements?: HTMLElement[]) {
  if (!Array.isArray(elements) || elements.length === 0) return 0;
  return elements.reduce((width, el) => {
    width = width + el.offsetWidth;
    return width;
  }, 0);
}
function reCalculateLeftOfElements(elements?: HTMLElement[], isScrollbarDisplayed?: boolean) {
  if (!Array.isArray(elements) || elements.length === 0) return;
  elements.forEach((e, i, es) => {
    // if (!isScrollbarDisplayed) e.style.boxShadow = 'none';
    // else e.style.boxShadow = boxShadowCellFirst;
    if (i === 0) return;
    e.style.left = sumWidth(es.filter((_, j) => j < i)) + 'px';
  });
}
function reCalculateRightOfElements(elements?: HTMLElement[], isScrollbarDisplayed?: boolean) {
  if (!Array.isArray(elements) || elements.length === 0) return;
  elements.reverse().forEach((e, i, es) => {
    // if (!isScrollbarDisplayed) e.style.boxShadow = 'none';
    // else e.style.boxShadow = boxShadowCellLast;
    if (i !== es.length - 1) e.style.boxShadow = 'none';
    if (i === 0) return;
    e.style.right = sumWidth(es.filter((_, j) => j < i)) + 'px';
  });
}
function querySelectorAll(root: Element, selector: string) {
  return Array.from(root.querySelectorAll<HTMLElement>(selector));
}
export function initStickyColumn(tableEl?: Element) {
  if (!(tableEl instanceof Element)) return;

  // TODO: only display box-shadow if the scroll-bar is visible

  let isScrollbarDisplayed = true;
  if (tableEl.parentElement instanceof Element) {
    isScrollbarDisplayed = tableEl.parentElement.scrollWidth > tableEl.parentElement.offsetWidth;
  }

  const stickeyFirstHeads = querySelectorAll(tableEl, `thead > tr > th.${stickyFirstClass}`);
  reCalculateLeftOfElements(stickeyFirstHeads, isScrollbarDisplayed);

  const stickyLastHeads = querySelectorAll(tableEl, `thead > tr > th.${stickyLastClass}`);
  reCalculateRightOfElements(stickyLastHeads, isScrollbarDisplayed);

  querySelectorAll(tableEl, 'tbody > tr').forEach((tr) => {
    const stickyFirstCells = querySelectorAll(tr, `td.${stickyFirstClass}`);
    reCalculateLeftOfElements(stickyFirstCells, isScrollbarDisplayed);

    const stickyLastCells = querySelectorAll(tr, `td.${stickyLastClass}`);
    reCalculateRightOfElements(stickyLastCells, isScrollbarDisplayed);
  });
}
//#endregion
