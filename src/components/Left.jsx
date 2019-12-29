import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import {IoIosArrowForward, IoIosAddCircle, IoIosSettings, IoIosFiling, IoIosFolder, IoIosMore} from 'react-icons/io';
import {CSSTransition} from 'react-transition-group';
import useCategory from "../hooks/useCategory";
import {VLine} from "../common/style";
import {Modal} from "react-bootstrap";
import Setting from "./Setting";
import OverlayComp from "./OverlayComp";
import Overlay from "react-bootstrap/Overlay";

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

const ListRow = styled.div`
  padding: 0.6rem 1rem;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.active ? '' : window.ttnoteThemeLight.bgColorDarkHover};
  }
  // border-bottom: 1px solid ${window.ttnoteThemeLight.lineColorLight};
  background: ${props => props.active ? window.ttnoteThemeLight.bgColorDarkActive : '' };
  color: ${props => props.active ? window.ttnoteThemeLight.textColorLight : '' };
  //border-radius: ${window.ttnoteThemeLight.primaryBorderRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftListInner = styled.div`
  display: flex;
  align-items: center;
`;

const MoreCell = styled.div`
  //font-size: 1.4rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  //color: ${window.ttnoteThemeLight.colorSecondary};
`;

const OverlayContainer = styled.div`
  background-color: ${window.ttnoteThemeLight.bgColorGrey};
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  padding: 0.2rem 0.7rem;
  color: ${window.ttnoteThemeLight.textColorLight};
  font-size: 0.8rem;
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
  const moreButtonRef = useRef(null);
  const iconStyle = {fontSize: '24px'};
  const visible = !isMobileView || (isMobileView && mobileShowingArea === 'left');

  const searchParams = window.ttnote.searchObject();
  const categoryId = parseInt(searchParams.categoryId) || -1;

  const {categories} = useCategory(categoryId);

  const handleCategoryDelete = useCallback(() => {
    console.log('category delete');
  }, []);

  const renderInbox = useCallback(() => {
    const active = -1 === categoryId;
    return (
      <ListRow
        active={active}
        key={-1}
        onClick={() => {
          if (active && !isMobileView) {
            return;
          }

          const params = window.ttnote.searchObject();
          if (!active) {
            params.categoryId = -1;
            delete params.projectId;
          }

          if (isMobileView) {
            params.mobileShowingArea = 'middle';
            params.enterFrom = 'right';
          }
          window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
        }}
      >
        <LeftListInner>
          <IoIosFiling/>
          <div style={{marginLeft: '0.3rem'}}>收件箱</div>
        </LeftListInner>
      </ListRow>
    )
  }, []);

  const renderList = (list) => {
    const active = list.id === categoryId;
    return (
     <ListRow
       active={active}
       key={list.id}
       onClick={() => {
         if (active && !isMobileView) {
           return;
         }

         const params = window.ttnote.searchObject();
         if (!active) {
           params.categoryId = list.id;
           delete params.projectId;
         }

         if (isMobileView) {
           params.mobileShowingArea = 'middle';
           params.enterFrom = 'right';
         }
         window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
       }}
     >
       <LeftListInner>
       {list.id === -1 ?
         <IoIosFiling/> :
         <IoIosFolder/>
       }
       <div style={{marginLeft: '0.3rem'}}>
         {list.name}
       </div>
       </LeftListInner>
       <MoreCell
         ref={moreButtonRef}
         onClick={(e) => {
           e.stopPropagation();
           if (showOverlayId === list.id) {
             setShowOverlayId(null)
           } else {
             setShowOverlayId(list.id)
           }
         }}
       >
         <IoIosMore/>
       <Overlay
         show={showOverlayId === list.id}
         target={moreButtonRef.current}
         placement='left'
         transition={false}
       >
         {props => (
           <OverlayComp {...props}>
             <OverlayContainer>
             <div
               onClick={handleCategoryDelete}
             >删除</div>
             </OverlayContainer>
           </OverlayComp>
         )
         }
       </Overlay>
       </MoreCell>
     </ListRow>
    )
  };

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
          {renderInbox()}
          {categories.map(list => renderList(list))}
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