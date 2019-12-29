import React, {useRef} from "react";
import Overlay from "react-bootstrap/Overlay";
import OverlayComp from "./OverlayComp";
import styled from "styled-components";
import {IoIosFiling, IoIosFolder, IoIosMore} from 'react-icons/io';
import {VLine} from "../common/style";

const ListRow = styled.div`
  padding: 0.6rem 1rem;
  &:hover {
    cursor: pointer;
    //background-color: ${props => props.active ? '' : window.ttnoteThemeLight.bgColorDarkHover};
    color: #fff;
  }
  // border-bottom: 1px solid ${window.ttnoteThemeLight.lineColorLight};
  background: ${props => props.active ? window.ttnoteThemeLight.bgColorDarkActive : '' };
  color: ${props => props.active ? '#fff' : window.ttnoteThemeLight.textColorLight};
  //border-radius: ${window.ttnoteThemeLight.primaryBorderRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftListInner = styled.div`
  flex: auto;
  display: flex;
  align-items: center;
`;

const MoreCell = styled.div`
  font-size: 1.2rem;
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
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

function LeftList(props) {
  const {list, categoryId, isMobileView, showOverlayId, setShowOverlayId, handleCategoryDelete} = props;
  const moreButtonRef = useRef(null);
  const active = list.id === categoryId;
  return (
    <ListRow
      active={active}
      key={list.id}
    >
      <LeftListInner
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
        {list.id === -1 ?
          <IoIosFiling/> :
          <IoIosFolder/>
        }
        <div style={{marginLeft: '0.3rem'}}>
          {list.name}
        </div>
      </LeftListInner>
      {list.id !== -1 &&
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
                  style={{paddingRight: '0.7rem'}}
                >删除
                </div>
                <VLine  />
                <div
                  style={{paddingLeft: '0.7rem'}}
                >编辑</div>
              </OverlayContainer>
            </OverlayComp>
          )
          }
        </Overlay>
      </MoreCell>
      }
    </ListRow>
  )
}

export default LeftList;