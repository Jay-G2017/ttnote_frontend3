import React, {useCallback, useRef, useMemo} from "react";
import Overlay from "react-bootstrap/Overlay";
import OverlayComp from "./OverlayComp";
import styled from "styled-components";
import {IoIosFiling, IoIosFolder, IoIosMore, IoIosGrid} from 'react-icons/io';
import {TInput, TSmallButton, VLine, OverlayItem} from "../common/style";
import {CATEGORY_TYPE_INBOX, CATEGORY_TYPE_TAGGED} from "../common/constants";

const ListRow = styled.div`
  padding: 0 1rem;
  &:hover {
    cursor: pointer;
    //background-color: ${props => props.active ? '' : window.ttnoteThemeLight.bgColorDarkHover};
    color: #fff;
  }
  // border-bottom: 1px solid ${window.ttnoteThemeLight.lineColorLight};
  background: ${props => props.active ? window.ttnoteThemeLight.bgColorDarkActive : ''};
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
  padding: 0.6rem 0;
`;

const MoreCell = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  //color: ${window.ttnoteThemeLight.colorSecondary};
`;

const EditRow = styled.div`
  display: flex;
  align-items: center;
`;

const LeftListActions = styled.div`
  display: flex;
  align-items: center;
  flex: none;
`;

const CategoryIconDiv = styled.div`
  margin-right: 0.3rem;
  display: flex;
  align-items: center;
  padding-top: 1px;
`;

const OverlayContainer = styled.div`
  background-color: ${window.ttnoteThemeLight.bgColorGrey};
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  color: ${window.ttnoteThemeLight.textColorLight};
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

function LeftList(props) {
  const {
    list,
    active,
    isMobileView,
    showOverlayId,
    setShowOverlayId,
    leftListEditId,
    setLeftListEditId,
    categoryMethods,
  } = props;
  const moreButtonRef = useRef(null);
  const moreCellShouldShow = ![CATEGORY_TYPE_INBOX, CATEGORY_TYPE_TAGGED].includes(list.id) && leftListEditId !== list.id;
  const atEditMode = leftListEditId === list.id;

  const CategoryIcon = useCallback(() => {
    switch (list.id) {
      case CATEGORY_TYPE_INBOX:
        return <CategoryIconDiv><IoIosFiling/></CategoryIconDiv>;
      case CATEGORY_TYPE_TAGGED:
        return <CategoryIconDiv><IoIosGrid/></CategoryIconDiv>;
      default:
        return <CategoryIconDiv><IoIosFolder/></CategoryIconDiv>;
    }
  }, [list.id]);

  return (
    <ListRow
      active={active}
      key={list.id}
    >
      <LeftListInner
        onClick={() => {
          if ((active && !isMobileView) || atEditMode) {
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
        <CategoryIcon/>
        {atEditMode ?
          <EditRow>
            <TInput
              value={list.name}
              placeholder={'请输入类别名称'}
              style={{fontWeight: '600'}}
              autoFocus={true}
              onChange={(e) => {
                const value = e.target.value;
                categoryMethods.handleCategoryNameOnChange(list.id, value);
              }}
              onBlur={(e) => {
                const value = e.target.value;
                if (value) {
                  categoryMethods.handleCategoryNameOnBlur(list.id);
                } else {
                  // 不能为空；
                  categoryMethods.handleCategoryNameCancel();
                }
                setLeftListEditId(null);
              }}
              onKeyDown={(e) => {
                const value = e.target.value;
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (value) {
                    categoryMethods.handleCategoryNameOnBlur(list.id);
                  } else {
                    categoryMethods.handleCategoryNameCancel();
                  }
                  setLeftListEditId(null);
                }

                if (e.keyCode === 27) {
                  e.preventDefault();
                  setLeftListEditId(null);
                  categoryMethods.handleCategoryNameCancel();
                }
              }}
            />
          </EditRow>
          :
          <div>
            {list.name}
          </div>
        }
      </LeftListInner>
      <LeftListActions>
        {atEditMode &&
        <>
          <TSmallButton
            type='primary'
            style={{marginLeft: '0.5rem'}}
          >确定</TSmallButton>
        </>
        }
        {moreCellShouldShow &&
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
                  <OverlayItem
                    onClick={() => {
                      if (window.confirm('删除类别后，类别下项目会移至收件箱。\n确定要删除吗？')) {
                        categoryMethods.handleCategoryDelete(list.id)
                      }
                    }}
                    style={{paddingRight: '0.7rem'}}
                  >删除
                  </OverlayItem>
                  <VLine/>
                  <OverlayItem
                    onClick={() => setLeftListEditId(list.id)}
                    style={{paddingLeft: '0.7rem'}}
                  >编辑
                  </OverlayItem>
                </OverlayContainer>
              </OverlayComp>
            )
            }
          </Overlay>
        </MoreCell>
        }
      </LeftListActions>
    </ListRow>
  )
}

export default LeftList;