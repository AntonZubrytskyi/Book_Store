import React, { FC } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { textValues } from '../../constants/textValues';
import Button from '../UI/Button/Button';
import { deleteBookById } from '../../redux/slices/books/asyncActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './ConfirmationModal.module.scss';
import { commonHelper } from '../../helpers';

interface IConfirmModalProps {
  handleDeleteModal: () => void;
}
const ConfirmationModal:FC<IConfirmModalProps> = ({ handleDeleteModal }) => {
  const dispatch = useAppDispatch();
  const { bookId } = useAppSelector((state) => state.booksReducer);

  const deleteBook = () => {
    dispatch(deleteBookById({ id: bookId }));
    commonHelper.notification(textValues.deleted);
  };

  return (
    <div className={styles.confirm__modal}>
      <div className={styles.confirm__modal__container}>
        <ImCancelCircle className={styles.confirm__modal__icon} />
        <span className={styles.confirm__modal__text}>{textValues.confirmation}</span>
        <div className={styles.confirm__modal__btn__box}>
          <Button styleClass="btn__cancel" label="Cancel" onClick={handleDeleteModal} />
          <Button
            styleClass="btn__delete"
            label="Delete"
            onClick={() => { deleteBook(); handleDeleteModal(); }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
