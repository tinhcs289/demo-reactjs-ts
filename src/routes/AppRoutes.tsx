import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import LandingLayout from '@/layouts/LandingLayout';
import PATHS from '@/routes/paths';
import authRoutes from '@/routes/_auth/_routes';
import privateRoutes from '@/routes/_private/_routes';
import publicRoutes from '@/routes/_public/_routes';
import React from 'react';
import { BrowserRouter, BrowserRouterProps, Redirect, Route, Switch } from 'react-router-dom';

const AppRoutes: React.FC<BrowserRouterProps> = (props) => {
  return (
    <BrowserRouter {...props}>
      <Switch>
        {publicRoutes.map((r) => (
          <Route
            key={r.name}
            path={r.path}
            exact
            render={(routeProps) => {
              return (
                <LandingLayout>
                  {React.createElement(r.component as React.ComponentType<any>, routeProps)}
                </LandingLayout>
              );
            }}
          />
        ))}
        {authRoutes.map((r) => (
          <Route
            key={r.name}
            path={r.path}
            exact
            render={(routeProps) => {
              return (
                <AuthLayout variant="fullWidth">
                  {React.createElement(r.component as React.ComponentType<any>, routeProps)}
                </AuthLayout>
              );
            }}
          />
        ))}
        {privateRoutes.map((r) => (
          <Route
            key={r.name}
            path={r.path}
            exact
            render={(routeProps) => {
              return (
                <DashboardLayout>
                  {React.createElement(r.component as React.ComponentType<any>, routeProps)}
                </DashboardLayout>
              );
            }}
          />
        ))}
        <Redirect to={PATHS.notfound} />
      </Switch>
    </BrowserRouter>
  );
};
export default AppRoutes;
