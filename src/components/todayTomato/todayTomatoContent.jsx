import React from 'react';
import TCollapse from './tCollapse';

function TodayTomatoContent(props) {
  const { data } = props;

  return (
    <div>
      {data.map((project) => (
        <TCollapse title={project.name}>
          <>
            <div>body</div>
          </>
        </TCollapse>
      ))}
    </div>
  );
}

export default TodayTomatoContent;
