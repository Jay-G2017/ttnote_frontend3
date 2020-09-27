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
import styles from './styles.less';
import classNames from 'classnames/bind';
import Icon from '../icon';
import { Badge } from 'react-bootstrap';

let cx = classNames.bind(styles);

function Todo(props) {
  const { todo, style, enableAction } = props;

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
        <div className={styles.toolbarCell}>
          <div
            className={cx({ toggleIcon: true, toggleIconOpen: open })}
            onClick={toggleOpen}
          >
            <Icon type="list-circle" />
          </div>
          {enableAction && (
            <>
              <div
                className={cx({ playIcon: true, playIconDisabled: open })}
                onClick={toggleOpen}
              >
                <Icon type="play-circle" />
              </div>
              <div
                className={cx({ moreIcon: true, playIconDisabled: open })}
                onClick={toggleOpen}
              >
                <Icon type="ellipsis-horizontal" />
              </div>
            </>
          )}
        </div>
        <Badge variant="light" className={styles.badge}>
          9
        </Badge>
        <Badge variant="light" className={styles.badgePlan}>
          3
        </Badge>
      </div>
      {renderChildren()}
    </TodoGroup>
  );
}

Todo.defaultValue = {
  enableAction: false,
};

export default Todo;
