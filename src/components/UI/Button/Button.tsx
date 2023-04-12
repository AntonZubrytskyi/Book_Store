import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import styles from './Button.module.scss';

interface IButtonProps {
  styleClass?: string;
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  type?: 'submit' | 'reset' | 'button' ;
  icon?: ReactNode;
}

const Button: FC<IButtonProps> = ({
  styleClass,
  disabled,
  onClick,
  label,
  icon,
  type,
  ...arg
}) => {
  // @ts-ignore
  const className = classNames(styles.btn, styles[styleClass]);
  const isBtnGoBack = styleClass === 'btn__go__back';

  return (
    <button
      type={type || 'button'}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...arg}
    >
      {icon && <span>{icon}</span>}
      {isBtnGoBack && <BsFillArrowLeftSquareFill />}
      {label}
    </button>
  );
};

export default Button;
