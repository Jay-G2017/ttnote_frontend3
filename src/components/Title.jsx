import React, {useCallback, useContext, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {PaddingRow, TTextArea} from '../common/style';
import {IoIosMore, IoIosAdd, IoIosRemove, IoIosRemoveCircleOutline} from 'react-icons/io';
import Overlay from "react-bootstrap/Overlay";
import OverlayComp from "./OverlayComp";
import {ProjectsContext} from "../context/ProjectsContext";
import {Badge} from "react-bootstrap";

const TitleContainer = styled.div`
  //background-color: #fff;
  margin-bottom: 1rem;
`;

const TitleRow = styled(PaddingRow)`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  //border-left: 0.2rem solid ${window.ttnoteThemeLight.colorPrimary};
`;

const VerticalLine = styled.div`
  height: 1rem;
  width: 0.2rem;
  border-radius: 0.05rem;
  background-color: ${window.ttnoteThemeLight.colorSecondary};
  position: absolute;
  left: 1vw;
  @media (min-width: 576px) {
    //padding: 0.3rem 6vw;
    left: 5vw
  }
  @media (min-width: 992px) {
    //padding: 0.3rem 6vw;
    left: 8vw
  }
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem;
  margin-left: -0.3rem;
  //flex: auto;
  color: ${window.ttnoteThemeLight.colorSecondary};
  font-size: 1rem;
  font-weight: 700;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  margin-right: 1rem;
  // :hover {
  //   background-color: ${window.ttnoteThemeLight.bgColorPrimaryDarker};
  // }
`;

// const CountCell = styled(TBadge)`
//   flex: none;
//   margin-right: 0.3rem;
//   color: ${window.ttnoteThemeLight.textColorTitle};
//   visibility: ${props => props.visible ? 'visible' : 'hidden'};
// `;
//
const TomatoBadge = styled(Badge)`
  margin-left: 3px;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  color: ${window.ttnoteThemeLight.colorSecondary};
`;

const IconCell = styled.div`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: none;
  color: ${window.ttnoteThemeLight.colorSecondary};
  user-select: none;
`;

const MoreCell = styled(IconCell)`
  margin-left: 3px; 
`;

const OpenCell = styled(IconCell)`
`;

const CloseCell = styled(IconCell)`
`;

const TodoStatCell = styled.div`
  color: ${window.ttnoteThemeLight.textColorDesc};
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 3px;
`;

const OverlayContainer = styled(IconCell)`
  background-color: ${window.ttnoteThemeLight.bgColorDark};
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  padding: 0.2rem 0.7rem;
  color: ${window.ttnoteThemeLight.textColorLight};
  font-size: 0.8rem;
`;

function Title(props) {
  const {
    title,
    titleMethods,
    showMore,
    setShowMore,
    handleNewTodo,
  } = props;

  const {handleTitleDeleteWithConfirm} = titleMethods;

  const [titleName, setTitleName] = useState(title.name);
  const syncMiddleZoneProject = useContext(ProjectsContext);

  const [open, setOpen] = useState(false);

  const moreButtonRef = useRef(null);
  const showOverlay = showMore.type === 'title' && showMore.id === title.id;

  const stopOnBlurFlag = useRef(false);

  // let tomatoCount = 0;
  // (title.todoIds || []).forEach(todoId => {
  //  const tSize = todos[todoId].tomatoes ? todos[todoId].tomatoes.length : 0;
  //   tomatoCount += tSize;
  // });

  const todoSize = title.todoIds ? title.todoIds.length : 0;

  const handleTitleDelete = useCallback(() => {
    if (todoSize > 0) {
      if (window.confirm('这会删除当前组下的所有任务，确定要删除吗？')) {
        handleTitleDeleteWithConfirm(title.id, syncMiddleZoneProject)
      } else {
        setTitleName(title.name)
      }
    } else {
      handleTitleDeleteWithConfirm(title.id)
    }
  }, [handleTitleDeleteWithConfirm, syncMiddleZoneProject, title.id, title.name, todoSize]);

  const handleTitleNameOnEnterPress = useCallback((e, options={}) => {
    const value = e.currentTarget.value;
    if (value) {
      if (title.id > 0) {
        if (value !== title.name) {
          titleMethods.updateTitle(title.id, {name: value})
        }
        if (options.createNewTodo)
          handleNewTodo(title.id)
      } else {
        titleMethods.createTitle(title.id, {name: value}, {createNewTodo: options.createNewTodo})
      }
    } else {
      if (title.id > 0) {
        // 删除title
        handleTitleDelete()
      } else {
        titleMethods.localDeleteTitle(title.id)
      }
    }
    stopOnBlurFlag.current = false;
  }, [handleNewTodo, handleTitleDelete, title.id, title.name, titleMethods]);

  const handleTitleNameOnBlur = useCallback((e, options = {newTodo: false}) => {
    if (!stopOnBlurFlag.current) {
      handleTitleNameOnEnterPress(e, options)
    }
  }, [handleTitleNameOnEnterPress]);

  const toggleOpen = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(!open);
  }, [open]);

  return useMemo(() => (
    <TitleContainer>
      <TitleRow>
        <VerticalLine/>
        <NameCell
          // 用js来控制背景而不是用css:hover是因为这里需要控制它的时机，
          // 下文中有用到，当按enter键后，它新建一个todo，这时这个背景色需要让它消失。
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = window.ttnoteThemeLight.bgColorPrimaryDarker;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'inherit';
          }}
        >
          <TTextArea
            value={titleName}
            autoFocus={title.id < 0}
            placeholder={'输入内容'}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setTitleName(value)
            }}
            onBlur={handleTitleNameOnBlur}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                stopOnBlurFlag.current = true;
                e.currentTarget.blur();
                e.currentTarget.parentNode.style.backgroundColor = 'inherit';
                handleTitleNameOnEnterPress(e, {createNewTodo: true})
              }
            }}
          />
        </NameCell>
        <TodoStatCell>3/4</TodoStatCell>
        {/*<CountCell visible={tomatoCount > 0}>{tomatoCount}</CountCell>*/}
        <TomatoBadge
          variant={'light'}
          visible={true}
        >3</TomatoBadge>
        {/*>{tomatoCount}</TomatoBadge>*/}
        {open ?
          <CloseCell onClick={toggleOpen}><IoIosRemove/></CloseCell>
          :
          <OpenCell onClick={toggleOpen}><IoIosAdd/></OpenCell>}
        <MoreCell ref={moreButtonRef} onClick={e => {
          e.stopPropagation();
          if (showOverlay) {
            setShowMore({type: 'title', id: null})
          } else {
            setShowMore({type: 'title', id: title.id})
          }
        }}
        >
          <IoIosMore/>
        </MoreCell>
        <Overlay
          show={showOverlay}
          target={moreButtonRef.current}
          placement='left'
          transition={false}
        >
          {props => (
            <OverlayComp {...props}>
              <OverlayContainer>
              <div
                onClick={handleTitleDelete}
              >删除</div>
              </OverlayContainer>
            </OverlayComp>
          )
          }
        </Overlay>
      </TitleRow>
      {open && props.children}
    </TitleContainer>
  ), [handleTitleDelete, handleTitleNameOnBlur, handleTitleNameOnEnterPress, open, props.children, setShowMore, showOverlay, title.id, titleName, toggleOpen]);
}

export default Title;