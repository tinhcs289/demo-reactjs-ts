import type { TableBodyProps } from '@mui/material/TableBody';
import TableBody from '@mui/material/TableBody';
import type { ReactNode } from 'react';
import { createRef, useCallback, useEffect, useMemo, useState, Children } from 'react';
export type TableBodyVirtualizedProps = TableBodyProps & {
  itemHeight: number;
  amount: number;
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
export default function TableBodyVirtualized(props: TableBodyVirtualizedProps) {
  const { children, itemHeight, amount, tolerance, minIndex, maxIndex, startIndex, ...otherProps } = props;
  const viewportHeight = useMemo(() => amount * itemHeight, [amount, itemHeight]);
  const totalHeight = useMemo(() => (maxIndex - minIndex + 1) * itemHeight, [maxIndex, minIndex, itemHeight]);
  const toleranceHeight = useMemo(() => tolerance * itemHeight, [tolerance, itemHeight]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const bufferHeight = useMemo(() => viewportHeight + 2 * toleranceHeight, [viewportHeight, toleranceHeight]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const bufferedItems = useMemo(() => amount + 2 * tolerance, [amount, tolerance]);
  const itemsAbove = useMemo(() => startIndex - tolerance - minIndex, [startIndex, tolerance, minIndex]);
  const tph = useMemo(() => itemsAbove * itemHeight, [itemsAbove, itemHeight]);
  const bph = useMemo(() => totalHeight - tph, [totalHeight, tph]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bottomPaddingHeight, setBottomPaddingHeight] = useState<number>(bph);
  const [topPaddingHeight, setTopPaddingHeight] = useState<number>(tph);

  const initialPosition = useMemo(
    () => topPaddingHeight + toleranceHeight,
    [topPaddingHeight, toleranceHeight]
  );
  const viewportElement = createRef<HTMLElement>();
  //@ts-ignore
  const runScroller = useCallback(({ target: { scrollTop } }) => {
    const index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
    const _tph = Math.max((index - minIndex) * itemHeight, 0);
    const _bph = Math.max(totalHeight - _tph - amount * itemHeight, 0);
    setTimeout(() => {
      setBottomPaddingHeight(_bph);
    }, 0);
    setTimeout(() => {
      setTopPaddingHeight(_tph);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  const $Loading = useMemo(() => {
    const childrens = Children.map(children, (c) => c);
    return childrens?.[0];
  }, [children]);
  const $Rows = useMemo(() => {
    // return getDataVirtualized({
    //   source: Children.map(Children.map(children as any, (c) => c)[1] as any, (c) => c),

    // })
    return <></>;
  }, []);
  return (
    <TableBody
      ref={viewportElement}
      {...(otherProps as any)}
      style={{ ...otherProps?.style, height: viewportHeight + 'px' } as any}
    >
      {$Loading}
      {$Rows}
    </TableBody>
  );
}
