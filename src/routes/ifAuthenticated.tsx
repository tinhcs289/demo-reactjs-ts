import authentication from '@/browser/cookies/authentication';
import { RouteFallback } from '@/components/fallback';
import PATHS from '@/constants/paths';
import DashboardLayout from '@/layouts/DashboardLayout';
import LandingLayout from '@/layouts/LandingLayout';
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { renderNotFound, renderRoutes } from './functions';
import { default as privateRoutes } from './private';
import { default as publicRoutes } from './public';
import type { AppRouterComponent, AppRouterProps } from './_types';
export default function ifAuthenticated(WrappedComponent: AppRouterComponent): AppRouterComponent {
  return function RoutesIfAuthenticated(props: AppRouterProps) {
    const accessToken = authentication.get()?.accessToken;
    if (!accessToken) return <WrappedComponent {...props} />;
    return (
      <BrowserRouter {...props}>
        <Routes>
          <Route element={<LandingLayout />}>{renderRoutes(publicRoutes)}</Route>
          <Route element={<DashboardLayout />}>{renderRoutes(privateRoutes)}</Route>
          <Route element={<DashboardLayout />}>
            <Route
              path={PATHS.notfound}
              element={
                <Suspense fallback={<RouteFallback />}>{renderNotFound({ contentOnly: true })}</Suspense>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to={PATHS.notfound} replace />} />
        </Routes>
      </BrowserRouter>
    );
  };
}
