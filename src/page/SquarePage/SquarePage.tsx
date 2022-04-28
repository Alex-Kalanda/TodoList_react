import React, { useEffect, useRef } from 'react';
import styles from './SquarePage.module.css';

const SquarePage = () => {
  const squareRef = useRef(null);

  const handleChangeSize = () => {
    const square = squareRef.current as HTMLElement | null;

    if (square) {
      if (window.innerWidth >= 600) {
        square.style.width = '90px';
        square.style.height = '90px';
      } else {
        square.style.width = '60px';
        square.style.height = '60px';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleChangeSize);
    handleChangeSize();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.caption}>Mysterious square</h1>
      <div ref={squareRef} className={styles.square} />
    </div>
  );
};

export default SquarePage;
