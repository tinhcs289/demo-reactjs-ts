import type { ComponentType } from 'react';
import type { RouteProps, BrowserRouterProps } from 'react-router-dom';
type RouterV5Props = Omit<RouteProps, 'element'>
export type RouteConfig = RouterV5Props & {
  name: string;
  component?: ComponentType<any>;
  breadcrumb?: ComponentType<any>;
  navigateTo?: string;
};
export type AppRouterProps = Partial<BrowserRouterProps>;
export type AppRouterComponent = ComponentType<AppRouterProps>;
export type AppRouterHoc = (WrappedComponent: AppRouterComponent) => AppRouterComponent;