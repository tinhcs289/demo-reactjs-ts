import { RouteFallback } from '@/components/fallback';
import type { ComponentType } from 'react';
import { createElement, Suspense } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { InDevelopRoute, NotFoundRoute } from './common';
import type { RouteConfig } from './_types';
import type { NotFoundPageProps } from '@/pages/NotFoundPage';
export function renderNotFound(props?: Partial<NotFoundPageProps>) {
  if (!NotFoundRoute[0].component) return null;
  return createElement(NotFoundRoute[0].component, props);
}
export function renderDevelopment() {
  if (!InDevelopRoute[0].component) return null;
  return createElement(InDevelopRoute[0].component);
}
export function renderPage(page?: ComponentType<any>) {
  if (!page) return renderDevelopment();
  return createElement(page);
}
export function renderRoutes(routes: RouteConfig[]) {
  return routes.map((route: RouteConfig) => {
    if (!route.navigateTo)
      return (
        <Route
          key={route.name}
          path={route.path}
          element={<Suspense fallback={<RouteFallback />}>{renderPage(route.component)}</Suspense>}
        />
      );
    else
      return (
        <Route
          key={route.name}
          path={route.path}
          element={<Navigate to={route.navigateTo || ''} replace />}
        />
      );
  });
}
