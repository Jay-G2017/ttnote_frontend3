import React, { useState } from 'react';
import TCheckbox from '../TCheckbox';
import RichEditor from '../richEditor';

import commonStyle from '../../commonStyle.module.scss';
import styles from './style.module.scss';
import classNames from 'classnames/bind';

function TodayTodo(props) {
  const { todo } = props;

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div className={classNames(commonStyle.flexRow, styles.todoRow)}>
        <div className={styles.checkCell}>
          <TCheckbox disabled={true} checked={todo.done} />
        </div>
        <div>{todo.name}</div>
      </div>
      <RichEditor />
    </div>
  );
}

export default TodayTodo;
