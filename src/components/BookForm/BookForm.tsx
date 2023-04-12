import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import styles from './BookForm.module.scss';
import Button from '../UI/Button/Button';
import { createBook, updateById } from '../../redux/slices/books/asyncActions';
import { IBook } from '../../interfaces';
import { urls } from '../../constants';
import { textValues } from '../../constants/textValues';
import { commonHelper } from '../../helpers';
import 'react-toastify/dist/ReactToastify.css';

interface IBookFromProps {
  handleOpen?: () => void;
}

const BookForm:FC<IBookFromProps> = ({ handleOpen }) => {
  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string().max(70).required(),
    author: yup.string().max(120).required(),
    year: yup.number()
      .typeError('Year is required field')
      .positive()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
  }).required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBook>({
    resolver: yupResolver(schema),
  });

  const { bookDetails } = useAppSelector((state) => state.booksReducer);
  const isEmptyBookDetails = Object.keys(bookDetails).length === 0;

  useEffect(() => {
    if (!isEmptyBookDetails) {
      const { name, author, year } = bookDetails;
      setValue('name', name);
      setValue('author', author);
      setValue('year', year);
    }
  }, [bookDetails]);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSubmitForm:SubmitHandler<IBook> = (data) => {
    const bookObject = { book: data };

    if (!isEmptyBookDetails) {
      dispatch(updateById({ id: bookDetails.id, book: data }));
      commonHelper.notification(textValues.updated);

      navigate(urls.books);
      return;
    }
    dispatch(createBook(bookObject));
    commonHelper.notification(textValues.added);
    handleOpen && handleOpen();
  };

  const errorsLength = Object.keys(errors).length !== 0;
  useEffect(
    () => (
      errorsLength ? setIsDisabled(true) : setIsDisabled(false)),
    [errorsLength],
  );

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
      <div>
        <label className={styles.form__label} htmlFor="name">Name: </label>
        <input
          {...register('name', {

          })}
          className={styles.form__input}
          type="text"
          id="name"
          name="name"
          maxLength={70}
        />
        {errors.name && <p className={styles.form__error__message}>{errors.name.message}</p>}
        <label className={styles.form__label} htmlFor="author">Author: </label>
        <input
          {...register('author')}
          className={styles.form__input}
          type="text"
          id="author"
          name="author"
          maxLength={120}
        />
        {errors.author && <p className={styles.form__error__message}>{errors.author.message}</p>}
        <label className={styles.form__label} htmlFor="year">Published year: </label>
        <input
          {...register('year')}
          className={styles.form__input}
          type="number"
          id="year"
          name="year"
        />
        {errors.year && <p className={styles.form__error__message}>{errors.year.message}</p>}
      </div>
      <Button
        styleClass="btn__auth"
        disabled={isDisabled}
        label={isEmptyBookDetails ? 'Add Book' : 'Update Book'}
        type="submit"
      />
    </form>
  );
};

export default BookForm;
