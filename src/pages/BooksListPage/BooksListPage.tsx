import React, { FC, useEffect } from 'react';
import BooksTable from '../../components/BooksTable/BooksTable';
import { getAllBooks } from '../../redux/slices/books/asyncActions';
import { useAppDispatch } from '../../hooks';

const BooksListPage:FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  return (
    <BooksTable />
  );
};

export default BooksListPage;
