import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { localStorageHelper } from '../../helpers';
import { RoutePath } from '../../constants';

const PublicRoute = () => {
  const isAuthenticated = localStorageHelper.getFromLocalStorage('accessToken');

  return isAuthenticated ? <Navigate to={RoutePath.BOOKS} /> : <Outlet />;
};

export default PublicRoute;
