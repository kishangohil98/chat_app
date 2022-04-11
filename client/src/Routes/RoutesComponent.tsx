import React from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import { Home } from '../Pages/Home';
import { Login } from '../Authentication/Login';
import { AuthGuard } from '../components/Guards/AuthGuard';

export const appRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
  },
  {
    path: 'login',
    element: <Login />,
  },
];

export const RoutesComponent = () => {
  const routes = useRoutes(appRoutes);

  return routes;
};
