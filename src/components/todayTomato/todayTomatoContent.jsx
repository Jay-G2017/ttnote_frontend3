import React from 'react';
import TCollapse from './tCollapse';
import TodayTodo from './todayTodo';
import TodayTitle from './todayTitle';

function TodayTomatoContent(props) {
  const { data } = props;

  return (
    <div style={{ paddingTop: '2rem' }}>
      {data.map((project) => (
        <TCollapse title={project.name}>
          <>
            {(project.todos || []).map((todo) => (
              <TodayTodo todo={todo} />
            ))}
            {(project.titles || []).map((title) => (
              <TodayTitle title={title}>
                {(title.todos || []).map((todo) => (
                  <TodayTodo todo={todo} />
                ))}
              </TodayTitle>
            ))}
          </>
        </TCollapse>
      ))}
    </div>
  );
}

export default TodayTomatoContent;
