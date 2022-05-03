import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/square');
  };

  return (
    <header className={styles.header}>
      <h1>Todo List</h1>
      <button onClick={handleOnClick}>to square</button>
    </header>
  );
};

export default Header;
