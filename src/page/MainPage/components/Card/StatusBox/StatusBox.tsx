import React, { useState } from 'react';
import cn from 'classnames';
import styles from './StatusBox.module.css';
import { StatusBoxProps } from './StatusBox.props';
import { TodoStatus } from '../../../../../enums/enums';

const StatusBox = ({ id, status, className, onUpdate }: StatusBoxProps): JSX.Element => {
  const [isActive, setActive] = useState(false);

  const handlerOnCloseDD = () => {
    setActive(false);
  };
  const handlerSwitchDD = () => {
    setActive((prev) => !prev);
  };

  const boxStyles = cn(className, styles.container, {
    [styles.planned]: status === TodoStatus.planned,
    [styles.inProgress]: status === TodoStatus.inProgress,
    [styles.completed]: status === TodoStatus.completed,
  });

  const statuses = ['todo', 'in_progress', 'completed'];
  const innerText: Record<string, string> = {
    // keys based on status
    todo: 'Todo',
    in_progress: 'In progress',
    completed: 'Done',
  };

  const listOfStatus = (
    <>
      <div className={styles.background} onClick={handlerOnCloseDD} />
      <div className={styles.list}>
        {statuses.map((status: string) => {
          const handlerOnUpdateStatus = () => {
            onUpdate({ id, status });
            setActive(false);
          };
          return (
            <div key={status} className={styles.list__item} onClick={handlerOnUpdateStatus}>
              {innerText[status]}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className={boxStyles}>
      <button className={styles.dropdown__button} onClick={handlerSwitchDD}>
        {innerText[status]}
      </button>
      {isActive && listOfStatus}
    </div>
  );
};

export default StatusBox;
