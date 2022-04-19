import React, { useState } from 'react';
import cn from 'classnames';
import styles from './StatusBox.module.css';
import { StatusBoxProps } from './StatusBox.props';
import { TodoStatus } from '../../enums';

const statuses = Object.values(TodoStatus);

const innerText: Record<string, string> = {
  // keys based on status
  todo: 'Todo',
  in_progress: 'In progress',
  completed: 'Done',
};

const StatusBox = ({ id, status, className, onUpdate }: StatusBoxProps): JSX.Element => {
  const [isActive, setActive] = useState(false);

  const handleOnClose = () => {
    setActive(false);
  };
  const handleOnSwitch = () => {
    setActive((prev) => !prev);
  };
  const handleOnUpdateStatus = (status: string) => () => {
    onUpdate({ id, status });
    handleOnClose();
  };

  const boxStyles = cn(className, styles.container, {
    [styles.planned]: status === TodoStatus.planned,
    [styles.inProgress]: status === TodoStatus.inProgress,
    [styles.completed]: status === TodoStatus.completed,
  });

  const listOfStatus = (
    <>
      <div className={styles.background} onClick={handleOnClose} />
      <div className={styles.list}>
        {statuses.map((status: string) => {
          return (
            <div key={status} className={styles.list__item} onClick={handleOnUpdateStatus(status)}>
              {innerText[status]}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className={boxStyles}>
      <button className={styles.dropdown__button} onClick={handleOnSwitch}>
        {innerText[status]}
      </button>
      {isActive && listOfStatus}
    </div>
  );
};

export default StatusBox;
