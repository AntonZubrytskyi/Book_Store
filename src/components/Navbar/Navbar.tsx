import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { formatDateHelper, localStorageHelper } from '../../helpers';
import Button from '../UI/Button/Button';
import { RoutePath } from '../../constants';

const Navbar:FC = () => {
  const date = formatDateHelper(new Date());
  const navigate = useNavigate();

  const logOut = () => {
    navigate(RoutePath.LOGIN);
    localStorageHelper.clearLocalStorage();
  };

  const isAuthenticated = localStorageHelper.getFromLocalStorage('accessToken');

  return (
    <div className={styles.navbar__container}>
      <span>Book Store</span>
      <div className={styles.navbar__main}>
        <span>{`Today: ${date}`}</span>
        {isAuthenticated && <Button styleClass="btn__auth" label="Log Out" onClick={logOut} />}
      </div>
    </div>
  );
};

export default Navbar;
