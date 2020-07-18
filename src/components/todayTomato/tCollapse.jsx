import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropright } from 'react-icons/io';

const Body = styled.div``;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const RightIcon = styled(IoMdArrowDropright)`
  &.open {
    transform: rotate(90deg);
    transition: transform 200ms;
    font-size: 1.2rem;
    color: ${window.ttnoteThemeLight.textColorTitle};
    opacity: 1;
  }
  &.close {
    transition: transform 200ms;
    font-size: 1.2rem;
    color: ${window.ttnoteThemeLight.textColorTitle};
    opacity: 1;
  }
`;

function TCollapse(props) {
  const [open, setOpen] = useState(true);
  return (
    <Body>
      <TitleRow
        onClick={() => {
          setOpen(!open);
        }}
      >
        <RightIcon className={open ? 'open' : 'close'} />
        <div style={{ flex: 'auto' }}>{props.title || ''}</div>
      </TitleRow>
      {open && <div style={{ paddingLeft: '1rem' }}>{props.children}</div>}
    </Body>
  );
}

export default TCollapse;
