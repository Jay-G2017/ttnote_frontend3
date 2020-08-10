import React, { useState } from 'react';
import styled from 'styled-components';
import TCheckbox from '../TCheckbox';
import RichEditor from '../richEditor';

const CheckCell = styled.div`
  font-size: 1.4rem;
  flex: none;
  display: flex;
  align-items: center;
  user-select: none;

  margin-right: 0.3rem;
  & label {
    margin-bottom: 0;
  }
`;

function TodayTodo(props) {
  const { todo } = props;
  const [done, setDone] = useState(false);

  return (
    <div style={{ paddingBottom: '0.6rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CheckCell>
          <TCheckbox
            disabled={todo.id < 0}
            checked={done}
            onChange={(value) => {
              setDone(value);
              // handleTodoClose();
              // toggleTodo(todo.id, value);
            }}
          />
        </CheckCell>
        <div>{todo.name}</div>
      </div>
      <RichEditor />
    </div>
  );
}

export default TodayTodo;
