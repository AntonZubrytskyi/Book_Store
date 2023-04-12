import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { getBookById } from '../../redux/slices/books/asyncActions';
import BookForm from '../../components/BookForm/BookForm';
import styles from './BookEdit.module.scss';
import Button from '../../components/UI/Button/Button';

const BookEditPage:FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    id && dispatch(getBookById({ id: +id }));
  }, []);
  return (
    <div className={styles.edit}>
      <Button
        styleClass="btn__go__back"
        onClick={() => navigate(-1)}
      />
      <h3 className={styles.edit__title}>Update Book Information</h3>
      <BookForm />
    </div>
  );
};

export default BookEditPage;
