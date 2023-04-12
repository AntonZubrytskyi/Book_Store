import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { useAppSelector } from '../../hooks';
import styles from './BooksView.module.scss';
import BooksViewItem from '../BooksViewItem/BooksViewItem';
import Button from '../UI/Button/Button';
import { urls } from '../../constants';
import BookImage from '../../assets/images/Books.jpg';

const BooksView:FC = () => {
  const {
    bookDetails: {
      id, name, author, year,
    },
  } = useAppSelector(
    (state) => state.booksReducer,
  );
  const navigate = useNavigate();

  const matches = useMediaQuery('(min-width: 768px)');

  const navigateTo = (url: string) => {
    navigate(url);
  };
  return (
    <div className={styles.view}>
      <Button styleClass="btn__go__back" onClick={() => navigateTo(`${urls.books}`)} />
      <h3 className={styles.view__header}>Book Information</h3>
      <div className={styles.view__container}>
        <BooksViewItem title="Name:" value={name} />
        <BooksViewItem title="Author:" value={author} />
        <BooksViewItem title="Published year:" value={year} />
      </div>
      <Button
        styleClass="btn__edit"
        label="Edit Book"
        onClick={() => navigateTo(`${urls.books}/${id}${urls.edit}`)}
      />
      {matches && <img className={styles.view__image} src={BookImage} alt={name} /> }
    </div>
  );
};

export default BooksView;
