import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosArrowDroprightCircle} from 'react-icons/io';
import {CSSTransition} from 'react-transition-group';
import {FormControl} from 'react-bootstrap';
import Title from "./Title";

const RightContainer = styled.div`
  padding: 1em;
  flex: 4;
  border-left: 1px solid #fff;
  //align-items: center;
  //justify-content: center;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

function Right(props) {
  const {isMobileView, pcHideMode, setPcHideMode, mobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'right') || !isMobileView;
  const [project, setProject] = useState({});
  const projectId = window.ttnote.searchObject().projectId;

  const fetchProject = (projectId) => {
   const url = window.ttnote.baseUrl + '/projects/' + projectId;
   window.ttnote.fetch(url)
     .then(res => {
        setProject(res);
     })
  };

  useEffect(()=> {
    fetchProject(projectId);
  }, [projectId]);

  return (
    <CSSTransition
      component={null}
      in={visible}
      timeout={300}
      exit={false}
      unmountOnExit
      classNames='enter-from-right'
    >
    <RightContainer>
      <HeaderRow>
        {isMobileView &&
          <IoIosArrowBack
            onClick={() => {
              // setMobileShowingArea('middle');
              const params = window.ttnote.searchObject();
              params.mobileShowingArea = 'middle';
              params.enterFrom = 'left';
              window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
            }}
            style={iconStyle}
          />
        }
        {!isMobileView && pcHideMode &&
        <IoIosArrowDroprightCircle onClick={() => setPcHideMode(false)}/>
        }
      </HeaderRow>
      <div>
        <div>{project.name}</div>
        <FormControl as="textarea" aria-label="With textarea" value={project.desc} />
        {project.titles && project.titles.map(title => <Title key={title.id} title={title}/>)}
      </div>
    </RightContainer>
    </CSSTransition>
  )
}

export default Right;