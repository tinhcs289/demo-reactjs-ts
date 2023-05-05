import { createElement, cloneElement, isValidElement } from 'react';
import type { Attributes } from 'react';
export default function renderNextSibling(component: any, props: any, element: Element) {
  if (!component) return null;
  if (isValidElement(component)) {
    return cloneElement(component, props as Partial<unknown> & Attributes);
  }
  if (typeof (component as any)?.render === 'function' || typeof component?.type?.render === 'function') {
    return createElement(component as any, props as Partial<unknown> & Attributes);
  }
  if (typeof component === 'function') {
    return component(props as Partial<unknown> & Attributes);
  }
  return null;
}
