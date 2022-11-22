import type { RouteProps } from 'react-router-dom';

export type TRouteConfig = {
  /**
   * Name must be unique
   */
  name: string;
  /**
   * The same prop as `component` of `React Router V5`
   */
  component: React.FC<any>;
  breadcrumb?: React.FC<any>;
} & Omit<RouteProps, 'element'>;
