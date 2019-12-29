import React from "react";
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${window.ttnoteThemeLight.bgColorDark};
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  padding: 0.2rem 0.7rem;
  color: ${window.ttnoteThemeLight.textColorLight};
  font-size: 0.8rem;
`;

const OverlayComp = React.forwardRef((props, ref) => {
  const {
    scheduleUpdate,
    arrowProps,
    outOfBoundaries,
    show,
    children,
    ...otherProps
  } = props;
  return(
    <div ref={ref} {...otherProps}>
      {children}
    </div>
  )
});

export default OverlayComp;