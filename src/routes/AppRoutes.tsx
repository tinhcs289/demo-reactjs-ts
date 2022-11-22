import PageLoadingFallback from '@/components/loading/PageLoadingFallback';
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
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const AppRoutes: React.FC<BrowserRouterProps> = (props) => {
  //TODO add more handle to switch route group by folowing bussiness
  return (
    <BrowserRouter {...props}>
      <Switch>
        {publicRoutes.map((route: TRouteConfig) => {
          return (
            <Route
              key={route.name}
              path={route.path}
              exact
              render={(args) => {
                return (
                  <LandingLayout>
                    <React.Suspense key={route.name} fallback={<PageLoadingFallback />}>
                      {React.createElement(route.component as React.ComponentType<any>, args)}
                    </React.Suspense>
                  </LandingLayout>
                );
              }}
            />
          );
        })}
        {authRoutes.map((route: TRouteConfig) => {
          return (
            <Route
              key={route.name}
              path={route.path}
              exact
              render={(args) => {
                return (
                  <AuthLayout variant="fullWidth">
                    <React.Suspense key={route.name} fallback={<PageLoadingFallback />}>
                      {React.createElement(route.component as React.ComponentType<any>, args)}
                    </React.Suspense>
                  </AuthLayout>
                );
              }}
            />
          );
        })}
        {privateRoutes.map((route: TRouteConfig) => {
          return (
            <Route
              key={route.name}
              path={route.path}
              exact
              render={(args) => {
                console.log(`render: ${route.name}`);
                return (
                  <DashboardLayout>
                    <React.Suspense key={route.name} fallback={<PageLoadingFallback />}>
                      {React.createElement(route.component as React.ComponentType<any>, args)}
                    </React.Suspense>
                  </DashboardLayout>
                );
              }}
            />
          );
        })}
        <Redirect to={PATHS.notfound} />
      </Switch>
    </BrowserRouter>
  );
};
export default AppRoutes;
