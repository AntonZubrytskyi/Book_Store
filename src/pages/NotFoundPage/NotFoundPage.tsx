import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import Button from '../../components/UI/Button/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHomePage = () => {
    navigate('/');
  };
  return (
    <div className={styles.container}>
      <span className={styles.container__text}>Sorry, the page you visited does not exist</span>
      <Button styleClass="btn__auth" onClick={goHomePage} label="Home Page" />
    </div>
  );
};

export default NotFoundPage;
