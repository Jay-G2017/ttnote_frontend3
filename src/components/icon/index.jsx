import React from 'react';
function Icon(props) {
  const { type } = props;
  return (
    <svg aria-hidden="true" className="svg-icon">
      <use xlinkHref={`#icon-${type}`}></use>
    </svg>
  );
}

export default Icon;
