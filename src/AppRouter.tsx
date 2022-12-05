import authentication from '@/appCookies/authentication';
import CommonFallback from '@/components/CommonFallback';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import LandingLayout from '@/layouts/LandingLayout';
import PATHS from '@/routes/paths';
import authRoutes from '@/routes/_auth/_routes';
import privateRoutes from '@/routes/_private/_routes';
import publicRoutes from '@/routes/_public/_routes';
import type { TRouteConfig } from '@/routes/_types';
import type { ComponentType, FC } from 'react';
import { createElement, Suspense } from 'react';
import type { BrowserRouterProps } from 'react-router-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppRouter: FC<BrowserRouterProps> = (props) => {
  const accessToken = authentication.get()?.accessToken;

  if (!accessToken)
    return (
      <BrowserRouter {...props}>
        <Suspense fallback={<CommonFallback />}>
          <Routes>
            <Route element={<LandingLayout />}>
              {publicRoutes.map((route: TRouteConfig) => {
                return (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={createElement(route.component as ComponentType<any>)}
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
                    element={createElement(route.component as ComponentType<any>)}
                  />
                );
              })}
            </Route>
            <Route path="*" element={<Navigate to={PATHS.notfound} replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  else
    return (
      <BrowserRouter {...props}>
        <Suspense fallback={<CommonFallback />}>
          <Routes>
            <Route element={<LandingLayout />}>
              {publicRoutes.map((route: TRouteConfig) => {
                return (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={createElement(route.component as ComponentType<any>)}
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
                    element={createElement(route.component as ComponentType<any>)}
                  />
                );
              })}
            </Route>
            <Route path="*" element={<Navigate to={PATHS.notfound} replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
};
export default AppRouter;
