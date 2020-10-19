import React, { useCallback, useState } from 'react';
import TodoCheckbox from '../TodoCheckbox';
import TodoInput from '../TodoInput';
import styles from './styles.less';
import classNames from 'classnames';
import Icon from '../icon';
import { get } from 'lodash';

import { TodoContext } from '@context/index';

function Todo(props) {
  const { todo, style, enableAction, defaultOpen } = props;
  const actualTomatoSize = get(todo, 'tomatoes.length', 0);
  const planTomatoSize = todo.planTomatoSize || 2;

  const [open, setOpen] = useState(defaultOpen);
  const [done, setDone] = useState(todo.done);

  const renderChildren = () => {
    if (open) {
      return (
        <div
          className={styles.childrenContent
          }
        >
          {props.children ? (
            <TodoContext.Provider value={done}>
              {props.children}
            </TodoContext.Provider>
          ) : (
              <div className={styles.noContent}>没有蕃茄</div>
            )}
        </div>
      );
    } else {
      return null;
    }
  };

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div style={{ ...style }} className={props.className}>
      <div
        className={classNames({
          [styles.todoRow]: true,
          [styles.todoRowOpen]: open,
        })}
      >
        <TodoCheckbox
          defaultValue={todo.done}
          todoId={todo.id}
          onChange={(done) => setDone(done)}
        />
        <div
          className={classNames({
            [styles.todoInput]: true,
            [styles.todoInputDone]: done,
          })}
        >
          <TodoInput defaultValue={todo.name} todoId={todo.id} />
        </div>
        <div className={styles.toolbarCell}>
          <div
            className={classNames({
              [styles.toggleIcon]: true,
              [styles.toggleIconOpen]: open,
            })}
            onClick={toggleOpen}
          >
            <Icon type="list-circle" />
          </div>
          {enableAction && (
            <>
              <div
                className={classNames({
                  [styles.playIcon]: true,
                  [styles.playIconDisabled]: open,
                })}
                onClick={toggleOpen}
              >
                <Icon type="play-circle" />
              </div>
              <div
                className={classNames({
                  [styles.moreIcon]: true,
                  [styles.playIconDisabled]: open,
                })}
                onClick={toggleOpen}
              >
                <Icon type="ellipsis-horizontal" />
              </div>
            </>
          )}
        </div>
        <div
          className={classNames({
            [styles.actualBadge]: true,
            badgeWarn: enableAction && actualTomatoSize === planTomatoSize,
            badgeDanger: enableAction && actualTomatoSize > planTomatoSize,
          })}
        >
          {actualTomatoSize}
        </div>
        {enableAction && (
          <div className={styles.planBadge}>{planTomatoSize}</div>
        )}
      </div>
      {renderChildren()}
    </div>
  );
}

Todo.defaultValue = {
  enableAction: false,
  defaultOpen: false,
};

export default Todo;
