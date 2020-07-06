import React, { useState } from 'react';
import { Input, Calendar, DatePicker, Button } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const Content = styled.div`
  padding: 0 2vw
  height: 95vh;
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CalContent = styled.div`
  position: relative;
`;

const CalDiv = styled.div`
  position: absolute;
  right: 0;
  width: 300px;
  z-index: 999;
  background-color: #fff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

function TodayTomato() {
  const [open, setOpen] = useState(false);
  return (
    <Content id="todayTomatoContent" onClick={() => setOpen(false)}>
      <FlexRow>
        <div>date</div>
        <FlexRow>
          <Button>prev</Button>
          <Button>today</Button>
          <Button>next</Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            Cal
          </Button>
        </FlexRow>
      </FlexRow>
      <CalContent>
        {open && (
          <CalDiv>
            <Calendar fullscreen={false} />
          </CalDiv>
        )}
      </CalContent>
      <Input.TextArea autoSize={{ minRows: 3 }} />
    </Content>
  );
}

export default TodayTomato;
