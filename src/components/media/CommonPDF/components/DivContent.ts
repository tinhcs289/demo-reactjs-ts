import styled from '@emotion/styled';
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
export default DivContent;