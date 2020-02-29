import React from "react";
import styled from 'styled-components';

const CenterDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 500;
  color: ${window.ttnoteThemeLight.textColorTips};
`;

function LoadingComp(props) {
  const {isLoading} = props;
  if (isLoading) {
    return (
      <CenterDiv>
        Loading...
      </CenterDiv>
    )
  } else {
    return props.children
  }
}

export default LoadingComp;