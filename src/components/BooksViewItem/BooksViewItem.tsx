import React, { FC } from 'react';
import styles from './BooksViewItem.module.scss';

interface IViewItemProps {
  title: string;
  value: string | number;
}

const BooksViewItem: FC<IViewItemProps> = ({ title, value }) => (
  <div className={styles.item__container}>
    <span className={styles.item__title}>{title}</span>
    <span className={styles.item__value}>{value}</span>
  </div>
);

export default BooksViewItem;
