import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {IoIosArrowForward, IoIosAddCircle, IoIosSettings} from 'react-icons/io';
import {CSSTransition} from 'react-transition-group';
import useCategory from "../hooks/useCategory";
import {VLine} from "../common/style";
import {Modal} from "react-bootstrap";
import Setting from "./Setting";
import LeftList from "./LeftList";

const LeftContainer = styled.div`
  flex: 1;
  color: ${window.ttnoteThemeLight.textColorLight};
  background-color: ${window.ttnoteThemeLight.bgColorDark};
  //align-items: center;
  //justify-content: center;
  height: 100%;
  position: relative;
`;

const HeaderRow = styled.div`
  //justify-content: center;
  padding: 0 6vw;
  display: flex;
  align-items: center;
  height: 3.3rem;
  border-bottom: 0.5px solid ${window.ttnoteThemeLight.lineColorDark};
  
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${window.ttnoteThemeLight.bgColorDarkRgba};
  backdrop-filter: blur(10px);
  @media (min-width: 768px) {
    position: absolute;
    padding: 0 2vw;
  }
`;

const LeftLogo = styled.div`
 color: ${window.ttnoteThemeLight.textColorDarkTips};
 font-weight: 600;
`;

const LeftBody = styled.div`
 font-weight: 600;
`;

const LeftFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${window.ttnoteThemeLight.bgColorDarkRgba};
  backdrop-filter: blur(10px);
  
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  
  padding: 1rem 4vw;
  @media (min-width: 768px) {
    position: absolute;
    padding: 1rem 1.5vw;
    //z-index: 2;
  }
  border-top: 0.5px solid ${window.ttnoteThemeLight.lineColorDark};
`;

const NewCategoryCell = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.disabled ?
  window.ttnoteThemeLight.btnDefaultDisabledFontColor :
  window.ttnoteThemeLight.textColorLight};
  cursor: pointer;
`;

const IconStyled = styled.div`
  font-size: 1.6rem;
  display: flex;
`;

const IconName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-left: 0.4rem;
  line-height: 1.2;
`;

const SettingCell = styled.div`
  //margin-right: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PlaceholderDiv = styled.div`
  height: 3.3rem;
`;

function Left(props) {
  const {isMobileView, mobileShowingArea} = props;
  const [settingModalShow, setSettingModalShow] = useState(false);
  const [showOverlayId, setShowOverlayId] = useState(null);
  const iconStyle = {fontSize: '24px'};
  const visible = !isMobileView || (isMobileView && mobileShowingArea === 'left');

  const searchParams = window.ttnote.searchObject();
  const categoryId = parseInt(searchParams.categoryId) || -1;

  const {categories} = useCategory(categoryId);

  const handleCategoryDelete = useCallback(() => {
    console.log('category delete');
  }, []);

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames={'enter-from-left'}
      exit={false}
      unmountOnExit
    >
      <LeftContainer
        onClick={() => {
          if (showOverlayId) {
            setShowOverlayId(null);
          }
        }}
      >
        <HeaderRow>
          {isMobileView &&
            <IoIosArrowForward
              onClick={() => {
                if (isMobileView) {
                  const params = window.ttnote.searchObject();
                  params.mobileShowingArea = 'middle';
                  params.enterFrom = 'right';
                  window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
                }
              }}
              style={iconStyle}
            />
          }
          <LeftLogo>蕃茄时光</LeftLogo>
          </HeaderRow>
        <LeftBody>
          <PlaceholderDiv />
          <LeftList
            list={{id: -1, name: '收件箱'}}
            categoryId={categoryId}
            isMobileView={isMobileView}
          />
          {categories.map(list => <LeftList
            list={list}
            categoryId={categoryId}
            isMobileView={isMobileView}
            showOverlayId={showOverlayId}
            setShowOverlayId={setShowOverlayId}
            handleCategoryDelete={handleCategoryDelete}
          />)}
        </LeftBody>
        <LeftFooter>
          <NewCategoryCell
            // onClick={() => handleNewTodo()}
          >
            <IconStyled>
              <IoIosAddCircle/>
            </IconStyled>
            <IconName>新类别</IconName>
          </NewCategoryCell>
          <VLine/>
          <SettingCell
            onClick={() => setSettingModalShow(true)}
          >
            <IconStyled>
              <IoIosSettings/>
            </IconStyled>
          </SettingCell>
        </LeftFooter>
        <Modal
          centered={true}
          animation={true}
          show={settingModalShow}
          onHide={() => setSettingModalShow(false)}
        >
          <Setting/>
        </Modal>
      </LeftContainer>
    </CSSTransition>
  )
}

export default Left;