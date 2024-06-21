import type { HTMLAttributes } from 'react';
export type Coordinate = { x: number; y: number };
export type Signature = {
  _id: string;
  positionOnTheScreen: Coordinate;
  positionRelativeToTheParent: Coordinate;
  ratioRelativeToTheParent: Coordinate;
  width: {
    inPx: number;
    inPercent?: number;
  };
  inPage?: number;
};
export type DocSize = { width: number; height: number; fullHeight: number };
export type ChangeSignatureHandler = (
  signature: Signature,
  position: Pick<Signature, 'positionOnTheScreen' | 'positionRelativeToTheParent' | 'width'> & {
    positionOfScroll: number;
  }
) => void;
export type SignatureComponentProps = {
  index: number;
  documentPosition: Coordinate;
  data: Signature;
  onClick?: Required<HTMLAttributes<HTMLDivElement>>['onClick'];
  onDrop?: ChangeSignatureHandler;
  onDrag?: ChangeSignatureHandler;
  [x: string]: any;
};