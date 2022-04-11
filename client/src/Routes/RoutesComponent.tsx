import React from 'react';
// import { Route, Routes } from "react-router";
import { Home } from '../Pages/Home';
import { Login } from '../Authentication/Login';
import {
  useRoutes,
  RouteObject
} from "react-router-dom";
import { AuthGuard } from '../components/Guards/AuthGuard';


export const appRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    )
  },
  {
    path: 'login',
    element: <Login />
  }
];

export const RoutesComponent = () => {
  const routes = useRoutes(appRoutes);

  return routes;
}
  