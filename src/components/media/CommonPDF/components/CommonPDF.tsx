import toTempUrl from '@/helpers/fileHelpers/toBrowserLocalTempUrl';
import toNumber from '@/helpers/formatHelpers/intOrDefault';
import cloneDeep from 'lodash/cloneDeep';
import type { DOMAttributes } from 'react';
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DocumentProps } from 'react-pdf';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { Coordinate, DocSize, Signature, SignatureComponentProps } from '../_types';
import { DEFAULT_COORDINATE, NO_DOC_SIZE, SIGNATURE } from '../contants';
import DivContent from './DivContent';
import DivWrapper from './DivWrapper';
import SignatureComponent from './SignatureComponent';
// register sevice worker required for 'read-pdf' 
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
export default function CommonPDF(props: { fileBase64Value: string }) {
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
            <SignatureComponent
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
