import type { TableBodyProps } from '@mui/material/TableBody';
import TableBody from '@mui/material/TableBody';
import type { ReactNode, CSSProperties } from 'react';
import { createRef, useCallback, useEffect, useMemo, useState, Children } from 'react';
export type TableBodyVirtualizedProps = TableBodyProps & {
  rowHeight: number;
  totalOfRowsToDisplay: number;
  tolerance: number;
  minIndex: number;
  maxIndex: number;
  startIndex: number;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDataVirtualized(args: {
  source: ReactNode[];
  offset: number;
  limit: number;
  minIndex: number;
  maxIndex: number;
}) {
  const { source, offset, limit, minIndex, maxIndex } = args;
  const data: ReactNode[] = [];
  const start = Math.max(minIndex, offset);
  const end = Math.min(offset + limit - 1, maxIndex);
  if (start <= end) {
    for (let i = start; i <= end; i++) {
      data.push(source[i]);
    }
  }
  return data;
}
function getElementIndex(args: {
  rootScrollTop?: number;
  minIndex: number;
  rowHeight: number;
  toleranceHeight: number;
}) {
  const { rootScrollTop = 0, minIndex, rowHeight, toleranceHeight } = args;
  return minIndex + Math.floor((rootScrollTop - toleranceHeight) / rowHeight);
}
export default function TableBodyVirtualized(props: TableBodyVirtualizedProps) {
  const {
    children,
    rowHeight,
    totalOfRowsToDisplay,
    tolerance,
    minIndex,
    maxIndex,
    startIndex,
    ...otherProps
  } = props;
  const viewportHeight = useMemo(() => totalOfRowsToDisplay * rowHeight, [totalOfRowsToDisplay, rowHeight]);
  const totalHeight = useMemo(() => (maxIndex - minIndex + 1) * rowHeight, [maxIndex, minIndex, rowHeight]);
  const toleranceHeight = useMemo(() => tolerance * rowHeight, [tolerance, rowHeight]);
  // const bufferHeight = useMemo(() => viewportHeight + 2 * toleranceHeight, [viewportHeight, toleranceHeight]);
  const bufferedItems = useMemo(
    () => totalOfRowsToDisplay + 2 * tolerance,
    [totalOfRowsToDisplay, tolerance]
  );
  const itemsAbove = useMemo(() => startIndex - tolerance - minIndex, [startIndex, tolerance, minIndex]);
  const tph = useMemo(() => itemsAbove * rowHeight, [itemsAbove, rowHeight]);
  const bph = useMemo(() => totalHeight - tph, [totalHeight, tph]);
  const [bottomPaddingHeight, setBottomPaddingHeight] = useState<number>(bph);
  const [topPaddingHeight, setTopPaddingHeight] = useState<number>(tph);
  const initialPosition = useMemo(() => tph + toleranceHeight, [tph, toleranceHeight]);
  const viewportElement = createRef<HTMLElement>();
  const initIndex = useMemo(
    () => getElementIndex({ minIndex, rowHeight, toleranceHeight }),
    [minIndex, rowHeight, toleranceHeight]
  );
  const [index, setIndex] = useState<number>(initIndex);
  const runScroller: (args: { target: { scrollTop: number } }) => void = useCallback(
    ({ target: { scrollTop } }) => {
      const i = getElementIndex({ rootScrollTop: scrollTop, minIndex, rowHeight, toleranceHeight });
      setTimeout(() => {
        setIndex(i);
      }, 0);
      const _tph = Math.max((i - minIndex) * rowHeight, 0);
      const _bph = Math.max(totalHeight - _tph - totalOfRowsToDisplay * rowHeight, 0);
      setTimeout(() => {
        setBottomPaddingHeight(_bph);
      }, 0);
      setTimeout(() => {
        setTopPaddingHeight(_tph);
      }, 0);
    },
    [minIndex, rowHeight, toleranceHeight, totalHeight, totalOfRowsToDisplay]
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!viewportElement?.current) return;
      viewportElement.current.scrollTop = initialPosition;
      if (!initialPosition) {
        runScroller({ target: { scrollTop: 0 } });
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const $Rows = useMemo(() => {
    let rows = Children.map(children, (c) => c) as ReactNode[];
    if (!rows) return null;
    rows = getDataVirtualized({
      source: rows as Array<any>,
      offset: index,
      limit: bufferedItems,
      minIndex,
      maxIndex,
    }) as ReactNode[];
    return rows;
  }, [index, children, bufferedItems, maxIndex, minIndex]);
  const styles: CSSProperties = useMemo(
    () => ({
      ...otherProps?.style,
      height: `${viewportHeight}px`,
      paddingTop: `${topPaddingHeight}px`,
      paddingBottom: `${bottomPaddingHeight}px`,
    }),
    [otherProps?.style, viewportHeight, topPaddingHeight, bottomPaddingHeight]
  );
  return (
    <TableBody ref={viewportElement} {...(otherProps as any)} style={styles}>
      {$Rows}
    </TableBody>
  );
}
