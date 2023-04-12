import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RoutePath } from '../../constants';
import { localStorageHelper } from '../../helpers';

const PrivateRoute = () => {
  const isAuthenticated = localStorageHelper.getFromLocalStorage('accessToken');

  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />;
};
export default PrivateRoute;
