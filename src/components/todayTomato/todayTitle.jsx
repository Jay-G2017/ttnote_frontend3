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
          marginBottom: '0.5rem'
        }}
      >
        {title.name}
      </div>

      {props.children}
    </div>
  );
}

export default TodayTitle;
