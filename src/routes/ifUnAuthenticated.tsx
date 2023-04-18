import authentication from '@/appCookies/authentication';
import { RouteFallback } from '@/components/fallback';
import PATHS from '@/constants/paths';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
import useReturnUrlHashBuilder from '@/hooks/useReturnUrlHashBuilder';
import AuthLayout from '@/layouts/AuthLayout';
import LandingLayout from '@/layouts/LandingLayout';
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { default as authRoutes } from './auth';
import { renderNotFound, renderRoutes } from './functions';
import { default as privateRoutes } from './private';
import { default as publicRoutes } from './public';
import type { AppRouterComponent, AppRouterProps, RouteConfig } from './_types';
export default function ifUnAuthenticated(WrappedComponent: AppRouterComponent): AppRouterComponent {
  return function RoutesIfUnAuthenticated(props: AppRouterProps) {
    const accessToken = authentication.get()?.accessToken;
    const { buildReturnHash } = useReturnUrlHashBuilder();
    if (!!accessToken) return <WrappedComponent {...props} />;
    return (
      <BrowserRouter {...props}>
        <Routes>
          <Route element={<LandingLayout />}>{renderRoutes(publicRoutes)}</Route>
          <Route element={<AuthLayout variant="side" />}>{renderRoutes(authRoutes)}</Route>
          {privateRoutes.map((route: RouteConfig) => {
            const returnHash = buildReturnHash(route);
            return (
              <Route
                key={route.name}
                path={route.path}
                element={<Navigate to={toEncodeUri(PATHS.login, returnHash)} replace />}
              />
            );
          })}
          <Route element={<LandingLayout />}>
            <Route
              path={PATHS.notfound}
              element={<Suspense fallback={<RouteFallback />}>{renderNotFound()}</Suspense>}
            />
          </Route>
          <Route path="*" element={<Navigate to={PATHS.notfound} replace />} />
        </Routes>
      </BrowserRouter>
    );
  };
}
