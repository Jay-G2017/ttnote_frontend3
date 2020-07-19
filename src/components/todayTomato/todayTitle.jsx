import React from 'react';

function TodayTitle(props) {
  const { title } = props;

  return (
    <div
      style={{
        paddingBottom: '1rem',
      }}
    >
      <div
        style={{
          color: window.ttnoteThemeLight.colorSecondary,
          fontWeight: 'bold',
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
