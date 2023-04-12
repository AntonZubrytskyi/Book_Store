import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { getBookById } from '../../redux/slices/books/asyncActions';
import BooksView from '../../components/BooksView/BooksView';

const BookDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    id && dispatch(getBookById({ id: +id }));
  }, []);
  return (
    <BooksView />
  );
};

export default BookDetailsPage;
