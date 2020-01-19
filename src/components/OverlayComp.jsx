import React from "react";

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
    <div
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  )
});

export default OverlayComp;