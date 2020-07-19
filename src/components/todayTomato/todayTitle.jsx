import React from 'react';

function TodayTitle(props) {
  const { title } = props;

  return (
    <div>
      <div
        style={{
          color: window.ttnoteThemeLight.colorSecondary,
        }}
      >
        {title.name}
      </div>
      <div
        style={{
          paddingLeft: '1rem',
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default TodayTitle;
