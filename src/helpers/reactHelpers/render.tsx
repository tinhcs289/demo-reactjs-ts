import { createElement, cloneElement, isValidElement } from 'react';
import type { Attributes } from 'react';
type Props = Partial<unknown> & Attributes;
export default function render(component: any, props?: any) {
  if (!component) return null;
  if (isValidElement(component)) {
    return cloneElement(component, props as Props);
  }
  if (typeof (component as any)?.render === 'function' || typeof component?.type?.render === 'function') {
    return createElement(component as any, props as Props);
  }
  if (typeof component === 'function') {
    return component(props as Props);
  }
  return null;
}
