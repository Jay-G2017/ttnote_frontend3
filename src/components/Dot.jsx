import React from "react";

function Dot(props) {
  const {visible} = props;

  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.5rem',
        height: '0.5rem',
        borderRadius: '50%',
        backgroundColor: window.ttnoteThemeLight.colorPrimary,
        visibility: visible ? 'visible' : 'hidden',
      }}
    />
  )
}

export default Dot;