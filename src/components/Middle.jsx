import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {IoIosMenu, IoIosArrowDropleftCircle} from 'react-icons/io';
import {CSSTransition} from "react-transition-group";

const MiddleContainer = styled.div`
  padding: 1em;
  flex: 1;
  border-left: 1px solid #fff;
  //align-items: center;
  //justify-content: center;
  overflow: auto;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

const ListRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  &:hover {
   cursor: pointer;
  }

`;

function Middle(props) {
  const {isMobileView, pcHideMode, setPcHideMode, mobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'middle') || (!isMobileView && !pcHideMode);

  const searchObject = window.ttnote.searchObject();
  const enterFrom = searchObject.enterFrom || 'left';
  const categoryId = parseInt(searchObject.categoryId) || -1;

  const [projects, setProjects] = useState([]);

  const fetchProjects = (categoryId) => {
    let url;
    if (categoryId === -1) {
      url = window.ttnote.baseUrl + `/projects`;
    } else {
      url = window.ttnote.baseUrl + `/categories/${categoryId}/projects`;
    }
    window.ttnote.fetch(url)
      .then(res => {
        setProjects(res)
      })
  };

  useEffect(() => {
    fetchProjects(categoryId);
  }, [categoryId]);

  const renderList = (project) => {
    return(
      <ListRow
        key={project.id}
        onClick={() => {
          const params = window.ttnote.searchObject();
          params.projectId = project.id;
          if (isMobileView) {
            params.mobileShowingArea = 'right';
            delete params.enterFrom;
          }
          window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
        }}
      >
        {project.name}
      </ListRow>
    )
  };

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames={enterFrom === 'left' ? 'enter-from-left' : 'enter-from-right'}
      unmountOnExit
      exit={false}
    >
      <MiddleContainer visible={visible}>
        <HeaderRow>
          {isMobileView &&
            <IoIosMenu
              onClick={() => {
                // setMobileShowingArea('left');
                const params = window.ttnote.searchObject();
                params.mobileShowingArea = 'left';
                delete params.enterFrom;
                window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
              }}
              style={iconStyle}
            />
          }
          {!isMobileView &&
            <IoIosArrowDropleftCircle
              onClick={() => {
                setPcHideMode(true);
              }}
              style={iconStyle}
            />
          }
        </HeaderRow>
        <div>
          {projects.map(row => renderList(row))}
        </div>
      </MiddleContainer>
    </CSSTransition>
  )
}

export default Middle;