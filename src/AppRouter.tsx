import authentication from '@/appCookies/authentication';
import { FallBackAbsolute } from '@/components/CommonFallback';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
import useReturnUrlHashBuilder from '@/hooks/useReturnUrlHashBuilder';
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

  const { buildReturnHash } = useReturnUrlHashBuilder();

  if (!accessToken)
    return (
      <BrowserRouter {...props}>
        <Routes>
          <Route element={<LandingLayout />}>
            {publicRoutes.map((route: TRouteConfig) => {
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  element={
                    <Suspense fallback={<FallBackAbsolute open />}>
                      {createElement(route.component as ComponentType<any>)}
                    </Suspense>
                  }
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
                  element={
                    <Suspense fallback={<FallBackAbsolute open />}>
                      {createElement(route.component as ComponentType<any>)}
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
          {privateRoutes.map((route: TRouteConfig) => {
            const returnHash = buildReturnHash(route);
            return (
              <Route
                key={route.name}
                path={route.path}
                element={<Navigate to={toEncodeUri(PATHS.login, returnHash)} replace />}
              />
            );
          })}
          <Route path="*" element={<Navigate to={PATHS.notfound} replace />} />
        </Routes>
      </BrowserRouter>
    );
  else
    return (
      <BrowserRouter {...props}>
        <Routes>
          <Route element={<LandingLayout />}>
            {publicRoutes.map((route: TRouteConfig) => {
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  element={
                    <Suspense fallback={<FallBackAbsolute open />}>
                      {createElement(route.component as ComponentType<any>)}
                    </Suspense>
                  }
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
                  element={
                    <Suspense fallback={<FallBackAbsolute open />}>
                      {createElement(route.component as ComponentType<any>)}
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
          <Route path="*" element={<Navigate to={PATHS.notfound} replace />} />
        </Routes>
      </BrowserRouter>
    );
};
export default AppRouter;
