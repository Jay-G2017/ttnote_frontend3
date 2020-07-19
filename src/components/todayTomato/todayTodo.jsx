import React from 'react';

function TodayTodo(props) {
  const { todo } = props;

  return (
    <div>
      <div>{todo.name}</div>
    </div>
  );
}

export default TodayTodo;
