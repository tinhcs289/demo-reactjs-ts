import CommonFallback from '@/components/CommonFallback';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import LandingLayout from '@/layouts/LandingLayout';
import PATHS from '@/routes/paths';
import authRoutes from '@/routes/_auth/_routes';
import privateRoutes from '@/routes/_private/_routes';
import publicRoutes from '@/routes/_public/_routes';
import type { TRouteConfig } from '@/routes/_types';
import React from 'react';
import type { BrowserRouterProps } from 'react-router-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppRouter: React.FC<BrowserRouterProps> = (props) => {
  //TODO: render groups of routes by authentication state:
  // on page load of `AppRouter`, query `access token` from browser cookie
  // if token exsists, render private routes, if not, render public and auth routes.
  return (
    <BrowserRouter {...props}>
      <React.Suspense fallback={<CommonFallback />}>
        <Routes>
          <Route element={<LandingLayout />}>
            {publicRoutes.map((route: TRouteConfig) => {
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  element={React.createElement(route.component as React.ComponentType<any>)}
                />
              );
            })}
          </Route>
          <Route element={<AuthLayout variant="fullWidth" />}>
            {authRoutes.map((route: TRouteConfig) => {
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  element={React.createElement(route.component as React.ComponentType<any>)}
                />
              );
            })}
          </Route>
          <Route element={<DashboardLayout />}>
            {privateRoutes.map((route: TRouteConfig) => {
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  element={React.createElement(route.component as React.ComponentType<any>)}
                />
              );
            })}
          </Route>
          <Route path="*" element={<Navigate to={PATHS.notfound} replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
export default AppRouter;
