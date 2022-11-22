import type { RouteProps } from 'react-router-dom';

export type TRouteConfig = {
  /**
   * Name must be unique
   */
  name: string;
  breadcrumb?: React.FC<any>;
} & RouteProps;
