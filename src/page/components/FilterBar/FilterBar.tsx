import React, { useState } from 'react';
import styles from './FilterBar.module.css';
import cn from 'classnames';
import { FilterBarProps } from './FilterBar.props';
import { TodoStatus } from '../../../enums/enums';

const FilterBar = ({ onFilter }: FilterBarProps): JSX.Element => {
  const filters = ['all', ...Object.values(TodoStatus)];
  const innerText = ['All', 'Todo', 'In progress', 'Done'];

  const [activeButton, setActiveButton] = useState(filters[0]);

  const buttonList = filters.map((filter: string, idx: number) => {
    const buttonStyles = cn(styles.button, {
      [styles.active]: activeButton === filter,
    });
    const handlerOnClick = () => {
      onFilter(filter);
      setActiveButton(filter);
    };

    return (
      <button key={filter} className={buttonStyles} onClick={handlerOnClick}>
        {innerText[idx]}
      </button>
    );
  });

  return <div className={styles.container}>{buttonList}</div>;
};

export default FilterBar;
