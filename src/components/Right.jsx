import React from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosArrowDroprightCircle} from 'react-icons/io';
import {CSSTransition} from 'react-transition-group';

const RightContainer = styled.div`
  padding: 1em;
  flex: 4;
  //align-items: center;
  //justify-content: center;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

function Right(props) {
  const {isMobileView, pcHideMode, setPcHideMode, mobileShowingArea, setMobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'right') || !isMobileView;

  return (
    <CSSTransition
      component={null}
      in={visible}
      timeout={900}
      appear={true}
      unmountOnExit
      classNames='mobile-view'
    >
    <RightContainer>
      <HeaderRow>
        {isMobileView &&
        <IoIosArrowBack onClick={() => setMobileShowingArea('middle')} style={iconStyle}/>
        }
        {!isMobileView && pcHideMode &&
        <IoIosArrowDroprightCircle onClick={() => setPcHideMode(false)}/>
        }
      </HeaderRow>
      <div>
        <div>Project Title</div>
        <div>The mocka placeholder is a very simple content placeholder
          that you can use for your website or web application,
          while loading your page's content. It weighs very
          little (about 500 bytes minified and gzipped), is fully customizable
          and you can easily include it in your project's CSS file, by
          using the Sass mixin provided. Alternatively, you can copy its
          code and inline it in your HTML for even faster loading.
        </div>
      </div>
    </RightContainer>
    </CSSTransition>
  )
}

export default Right;