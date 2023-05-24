import { stickyFirstClass, stickyLastClass } from '../constants';
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
    if (i === 0) return;
    e.style.left = sumWidth(es.filter((_, j) => j < i)) + 'px';
  });
}
function reCalculateRightOfElements(elements?: HTMLElement[], isScrollbarDisplayed?: boolean) {
  if (!Array.isArray(elements) || elements.length === 0) return;
  elements.reverse().forEach((e, i, es) => {
    if (i !== es.length - 1) e.style.boxShadow = 'none';
    if (i === 0) return;
    e.style.right = sumWidth(es.filter((_, j) => j < i)) + 'px';
  });
}
function querySelectorAll(root: Element, selector: string) {
  return Array.from(root.querySelectorAll<HTMLElement>(selector));
}
export default function initStickyColumn(tableEl?: Element | HTMLElement) {
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