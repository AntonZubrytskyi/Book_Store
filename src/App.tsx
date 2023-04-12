import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { RoutePath } from './constants';
import LoginPage from './pages/LoginPage/LoginPage';
import { localStorageHelper } from './helpers';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import BooksListPage from './pages/BooksListPage/BooksListPage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import BookEditPage from './pages/BookEditPage/BookEditPage';

const App: FC = () => {
  const isAuthenticated = localStorageHelper.getFromLocalStorage('accessToken');

  return (
    <Routes>
      <Route
        index
        path="/"
        element={isAuthenticated
          ? <Navigate to={RoutePath.BOOKS} /> : <Navigate to={RoutePath.LOGIN} />}
      />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<PrivateRoute />}>
          <Route path={RoutePath.BOOKS} element={<BooksListPage />} />
          <Route path={RoutePath.BOOKS_DETAILS} element={<BookDetailsPage />} />
          <Route path={RoutePath.BOOKS_EDIT} element={<BookEditPage />} />
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route index path={RoutePath.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
