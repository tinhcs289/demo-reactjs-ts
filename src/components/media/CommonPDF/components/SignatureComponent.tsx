import toNumber from '@/helpers/formatHelpers/intOrDefault';
import { useCallback, useMemo } from 'react';
import type { DraggableProps } from 'react-draggable';
import Draggable from 'react-draggable';
import type { SignatureComponentProps } from '../_types';
import { DEFAULT_COORDINATE } from '../contants';
import DivSignature from './DivSignature';
import DivSignatureContent from './DivSignatureContent';
/**
 * get root element of the view
 */
function getRootWrapper(target: EventTarget): HTMLElement {
  return (target as HTMLElement)?.parentElement?.parentElement?.parentElement?.parentElement as HTMLElement;
}
export default function SignatureComponent(props: SignatureComponentProps) {
  const { data, onClick, onDrop, onDrag, documentPosition } = props;
  const signId = useMemo(() => data?._id, [data?._id]);
  const xOfDoc = useMemo(() => toNumber(documentPosition?.x, 0), [documentPosition?.x]);
  const yOfDoc = useMemo(() => toNumber(documentPosition?.y, 0), [documentPosition?.y]);
  const xRelative = useMemo(
    () => toNumber(data?.positionRelativeToTheParent?.x, 0),
    [data?.positionRelativeToTheParent?.x]
  );
  const yRelative = useMemo(
    () => toNumber(data?.positionRelativeToTheParent?.y, 0),
    [data?.positionRelativeToTheParent?.y]
  );
  const absoluteStyle: { top: number; left: number } = useMemo(
    () => ({
      zIndex: 100,
      position: 'absolute',
      top: yRelative,
      left: xRelative,
    }),
    [xRelative, yRelative]
  );
  const handleDrop: Required<DraggableProps>['onStop'] = useCallback(
    (event, _dndData) => {
      const signatureElement = (event as MouseEvent)?.target;
      if (!signatureElement) return;
      const { x, y, width } = (signatureElement as HTMLElement).getBoundingClientRect();
      const docWrapper = getRootWrapper(signatureElement);
      if (!docWrapper) return;
      const newXRelative = x - xOfDoc;
      const newYRelative = y - yOfDoc;
      onDrop?.(data, {
        positionOfScroll: docWrapper.scrollTop,
        width: {
          inPx: width,
          inPercent: data?.width?.inPercent,
        },
        positionOnTheScreen: { x, y },
        positionRelativeToTheParent: {
          x: newXRelative,
          y: newYRelative,
        },
      });
    },
    [onDrop, data, xOfDoc, yOfDoc]
  );
  const handleDrag: Required<DraggableProps>['onStart'] = useCallback(
    (event, _dndData) => {
      const signatureElement = (event as MouseEvent)?.target;
      if (!signatureElement) return;
      const { x, y, width } = (signatureElement as HTMLElement).getBoundingClientRect();
      const docWrapper = getRootWrapper(signatureElement);
      if (!docWrapper) return;
      const newXRelative = x - xOfDoc;
      const newYRelative = y - yOfDoc;
      onDrag?.(data, {
        positionOfScroll: docWrapper.scrollTop,
        width: {
          inPx: width,
          inPercent: data?.width?.inPercent,
        },
        positionOnTheScreen: { x, y },
        positionRelativeToTheParent: {
          x: newXRelative,
          y: newYRelative,
        },
      });
    },
    [onDrag, data, xOfDoc, yOfDoc]
  );
  return (
    <Draggable key={signId} onStop={handleDrop} onStart={handleDrag} position={DEFAULT_COORDINATE}>
      <DivSignature style={{ ...absoluteStyle }} onClick={onClick}>
        <DivSignatureContent>{`Chữ ký`}</DivSignatureContent>
      </DivSignature>
    </Draggable>
  );
}