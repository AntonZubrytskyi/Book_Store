import React, { FC } from 'react';
import BookForm from '../BookForm/BookForm';
import styles from './AddBookModal.module.scss';
import Button from '../UI/Button/Button';

interface IBookModal {
  handleOpen: () => void
}

const AddBookModal:FC<IBookModal> = ({ handleOpen }) => (
  <div className={styles.add__modal}>
    <div className={styles.add__modal__container}>
      <Button styleClass="btn__modal__close" label="X" onClick={handleOpen} />
      <BookForm handleOpen={handleOpen} />
    </div>
  </div>
);

export default AddBookModal;
