import React, { useCallback, useState } from 'react';
import {
  TodoGroup,
  TodoRow,
  ChildrenContent,
  TodoInputStyled,
  TodoCheckboxStyled,
} from './styles';
import TodoCheckbox from '../TodoCheckbox';
import TodoInput from '../TodoInput';
import styles from './styles.module.less';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function Todo(props) {
  const { todo, style } = props;

  const [open, setOpen] = useState(false);

  const renderChildren = () => {
    if (open) {
      if (props.children) {
        return <ChildrenContent open={open}>{props.children}</ChildrenContent>;
      } else {
        return <ChildrenContent open={open}>没有蕃茄</ChildrenContent>;
      }
    } else {
      return null;
    }
  };

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <TodoGroup style={{ ...style }} className={props.className}>
      <div className={cx({ todoRow: true, todoRowOpen: open })}>
        <TodoCheckbox defaultValue={todo.done} todoId={todo.id} />
        <TodoInputStyled>
          <TodoInput defaultValue={todo.name} todoId={todo.id} />
        </TodoInputStyled>
        <div className={styles.toolbarCell} onClick={toggleOpen}>
          <div className={styles.toggleIcon}>
            {open ?
              <ion-icon name="arrow-down-circle"></ion-icon> :
              <ion-icon name="arrow-down-circle"></ion-icon>
            }
          </div>
        </div>
      </div>
      {renderChildren()}
    </TodoGroup>
  );
}

export default Todo;
