import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SquarePage.module.css';

const SquarePage = () => {
  const squareRef = useRef(null);
  const [counter, setCounter] = useState(0);

  const changeSize = () => {
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
  const handleChangeSize = useCallback(changeSize, []);

  const handleIncreaseCounter = () => {
    setCounter((prev) => prev + 1);
  };
  const handleReduceCounter = () => {
    setCounter((prev) => prev - 1);
  };

  useEffect(() => {
    const square = squareRef.current as HTMLElement | null;
    handleChangeSize();

    if (square && counter > 5) {
      window.addEventListener('resize', handleChangeSize);
    } else {
      window.removeEventListener('resize', handleChangeSize);
    }
    return () => {
      window.removeEventListener('resize', handleChangeSize);
    };
  }, [counter, handleChangeSize]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.caption}>Mysterious square</h1>
      <div>
        <button onClick={handleReduceCounter}>Reduce</button>
        <button onClick={handleIncreaseCounter}>Increase</button>
      </div>
      <span>Counter value = {counter}</span>
      <div ref={squareRef} className={styles.square} />
    </div>
  );
};

export default SquarePage;
