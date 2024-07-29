import toTempUrl from '@/helpers/fileHelpers/toBrowserLocalTempUrl';
import toNumber from '@/helpers/formatHelpers/intOrDefault';
import newGuid from '@/helpers/stringHelpers/newGuid';
import styled from '@emotion/styled';
import cloneDeep from 'lodash/cloneDeep';
import type { DOMAttributes, HTMLAttributes } from 'react';
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DraggableProps } from 'react-draggable';
import Draggable from 'react-draggable';
import type { DocumentProps } from 'react-pdf';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('/scripts/pdfjs-dist/build/pdf.worker.min.js').toString();

const DivWrapper = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const DivContent = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  margin: 0 auto;
  flex-direction: column;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  & .react-pdf__Document {
    height: 100%;
    & > div {
      height: 100%;
    }
  }
  & .react-pdf__Page {
    height: 100%;
    display: flex;
    flex-direction: column;
    & > canvas.react-pdf__Page__canvas {
      height: 100% !important;
      width: auto !important;
      flex: 1;
    }
    /* border at top of each page (not for first page) */
    &:not(.pdf-page--first) {
      position: relative;
      &::before {
        position: absolute;
        content: '';
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
  /* disabled text selectable */
  & .react-pdf__Page__textContent {
    user-select: none;
  }
  /* scrollale by y-axis */
  overflow-y: auto;
  overflow-x: hidden;
`;
const DivSignature = styled.div`
  background: white;
  border: 1px solid blue;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  color: #8d8d8d;
`;
const DivSignatureContent = styled.div`
  padding: 8px;
  cursor: grab;
`;
type Coordinate = { x: number; y: number };
const DEFAULT_COORDINATE = { x: 0, y: 0 };
type Signature = {
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
type DocSize = { width: number; height: number; fullHeight: number };
const NO_DOC_SIZE: DocSize = { width: 0, height: 0, fullHeight: 0 };
type ChangeSignatureHandler = (
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
/**
 * get root element of the view
 */
function getRootWrapper(target: EventTarget): HTMLElement {
  return (target as HTMLElement)?.parentElement?.parentElement?.parentElement?.parentElement as HTMLElement;
}
function BoxSignature(props: SignatureComponentProps) {
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
const SIGNATURE: Signature = {
  _id: newGuid(),
  positionOnTheScreen: DEFAULT_COORDINATE,
  positionRelativeToTheParent: DEFAULT_COORDINATE,
  ratioRelativeToTheParent: DEFAULT_COORDINATE,
  width: { inPx: 0, inPercent: 0 },
  inPage: 1,
};
export default function FileView(props: { fileBase64Value: string }) {
  const { fileBase64Value } = props;
  /**
   * in-browser temporary url of the file.
   */
  const tempFileUrl = useMemo(() => (!fileBase64Value ? '' : toTempUrl(fileBase64Value)), [fileBase64Value]);
  /**
   * ref to the parent div of the file
   * which be used for calculating the file dimension (width, height, position, ...)
   */
  const refPdf = useRef<HTMLDivElement>();
  /**
   * list of ref to each page element.
   * this may be useful in future, but not to be used currently.
   */
  const pageRefs = useRef<ReturnType<typeof createRef<HTMLDivElement>>[]>([]);
  /**
   * list of signatures in the file.
   */
  const [signatures, setSignatures] = useState<Signature[]>([SIGNATURE]);
  /**
   * total of pages in the file, it will be calculated by the `getTotalPageAndPageRefsAfterFileLoaded` function.
   */
  const [pageCount, setPageCount] = useState<number>(0);
  /**
   * dimension of the file, it will be calculated by the `refPdf` after file mounted.
   */
  const [docSize, setDocSize] = useState<DocSize>(NO_DOC_SIZE);
  /**
   * on-screen position of the file, it will be calculated by the `refPdf` after file mounted.
   */
  const [documentPosition, setDocumentPosition] = useState<Coordinate>(DEFAULT_COORDINATE);
  /**
   * clear states of the component
   */
  const clearStates = () => {
    setPageCount(0);
    setSignatures([]);
    setDocSize(NO_DOC_SIZE);
    setDocumentPosition(DEFAULT_COORDINATE);
  };
  //
  useEffect(function cleanUpWhenUnmout() {
    return () => {
      clearStates();
    };
  }, []);
  useEffect(
    function collectDocSizeAndPositionAfterFileMounted() {
      setTimeout(() => {
        if (!refPdf?.current) return;
        const wrapperFullHeight = refPdf.current.scrollHeight;
        const {
          width: wrapperWidth,
          height: wrapperHeight,
          x: wrapperX,
          y: wrapperY,
        } = refPdf.current.getBoundingClientRect();
        setDocSize({
          width: wrapperWidth,
          height: wrapperHeight,
          fullHeight: wrapperFullHeight,
        });
        setDocumentPosition({
          x: wrapperX,
          y: wrapperY,
        });
      }, 300);
    },
    [fileBase64Value]
  );
  //
  const getTotalPageAndPageRefsAfterFileLoaded: Required<DocumentProps>['onLoadSuccess'] = useCallback(
    ({ numPages }) => {
      setPageCount(numPages);
      const refs = Object.keys([...Array(numPages)]).map(() => createRef<HTMLDivElement>());
      pageRefs.current = refs;
    },
    []
  );
  const updateSignatureAfterDrop: Required<SignatureComponentProps>['onDrop'] = useCallback(
    (signature, { positionOfScroll, positionOnTheScreen, positionRelativeToTheParent, width }) => {
      if (!signature?._id) return;
      const signatureIndex = signatures.findIndex((s) => s?._id === signature._id);
      if (signatureIndex === -1) return;
      // Collect the measurement of the area of the file
      const minX = documentPosition.x;
      const maxX = documentPosition.x + docSize.width;
      const minY = documentPosition.y;
      const maxY = documentPosition.y + docSize.height;
      // The signature must only be dragged and dropped onto the area of the file.
      const isX_InsideFileArea = minX <= positionOnTheScreen.x && positionOnTheScreen.x <= maxX;
      const isY_InsideFileArea = minY <= positionOnTheScreen.y && positionOnTheScreen.y <= maxY;
      const isInsideFileArea = isX_InsideFileArea && isY_InsideFileArea;
      if (!isInsideFileArea) return;
      //
      const newSignatures = cloneDeep(signatures);
      // When the view is scrolling,
      // there are always a maximum of 02 pages visible in the screen, one above and one below.
      // The signature is dragged then dropped onto one of these two pages.
      // We have to determine the destination page is the page above or the below one.
      const heightOfBelowPage = positionOfScroll % docSize.height;
      const heightOfAbovePage = docSize.height - heightOfBelowPage;
      const isOnBelowPage = positionRelativeToTheParent.y > heightOfAbovePage;
      const indexOfAbovePage = +`${(positionOfScroll + docSize.height) / docSize.height}`.split('.')[0] - 1;
      // Depending on the destination page is below or above,
      // we will calculate the destination page index and the new position of the signature by 02 different ways.
      const newPageIndex = 1 + (!isOnBelowPage ? indexOfAbovePage : indexOfAbovePage + 1);
      const y_RelativeToPage = !isOnBelowPage
        ? docSize.height - (heightOfAbovePage - (positionOnTheScreen.y - minY))
        : heightOfBelowPage - (maxY - positionOnTheScreen.y);
      // update signature with the new measurement
      newSignatures[signatureIndex] = {
        ...signature,
        inPage: newPageIndex,
        width: {
          inPx: width.inPx,
          inPercent: toNumber(width.inPx, 0) / docSize.width,
        },
        positionOnTheScreen,
        positionRelativeToTheParent: {
          x: positionRelativeToTheParent.x,
          y: (newPageIndex - 1) * docSize.height + y_RelativeToPage,
        },
        ratioRelativeToTheParent: {
          x: positionRelativeToTheParent.x / docSize.width,
          y: y_RelativeToPage / docSize.height,
        },
      };
      setSignatures(newSignatures);
      console.log(newSignatures);
    },
    [signatures, documentPosition?.x, documentPosition?.y, docSize?.height, docSize?.width]
  );
  const handleStartDrag: Required<SignatureComponentProps>['onDrag'] = useCallback(() => {
    //TODO: can do something when start dragging.
  }, []);
  const handleScrollOnView: Required<DOMAttributes<HTMLDivElement>>['onScroll'] = useCallback((e) => {
    //TODO do something when scroll on view
  }, []);
  const $Pages = useMemo(() => {
    return Object.keys([...Array(pageCount)]).map((_, pageIndex) => {
      const isFirstPage = pageIndex === 0;
      const signaturesInThisPage = signatures.filter((s) => s.inPage === pageIndex + 1);
      return (
        <div key={`key${pageIndex}`} ref={pageRefs?.current?.[pageIndex] as any}>
          <Page
            pageNumber={pageIndex + 1}
            pageIndex={pageIndex}
            className={`${isFirstPage ? `pdf-page--first ` : ''}pdf-page--${pageIndex + 1}`}
          />
          {signaturesInThisPage.map((signature, signatureIndex) => (
            <BoxSignature
              documentPosition={documentPosition}
              onDrag={handleStartDrag as any}
              onDrop={updateSignatureAfterDrop}
              index={signatureIndex}
              key={signature._id}
              data={signature}
            />
          ))}
        </div>
      );
    });
  }, [pageCount, handleStartDrag, updateSignatureAfterDrop, signatures, documentPosition]);
  return (
    <DivWrapper>
      <DivContent ref={refPdf as any} onScroll={handleScrollOnView}>
        <Document file={tempFileUrl} onLoadSuccess={getTotalPageAndPageRefsAfterFileLoaded}>
          {$Pages}
        </Document>
      </DivContent>
    </DivWrapper>
  );
}
