import React, { useState, useMemo } from 'react';
import { Input, Calendar } from 'antd';
import { Button, ButtonGroup } from 'react-bootstrap';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import {
  IoMdArrowDropleft,
  IoMdArrowDropright,
  IoIosCalendar,
} from 'react-icons/io';
import dayjs from 'dayjs';

const Content = styled.div`
  padding: 2rem 2rem;
  border-radius: 3px;
  height: 95vh;
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
`;

const FlexBetweenRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
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

const IconStyle = { fontSize: '1.1rem' };

function TodayTomato() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '记录下今天的点滴.' }],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs());
  return (
    <Content id="todayTomatoContent" onClick={() => setOpen(false)}>
      <FlexBetweenRow style={{ marginBottom: '1rem' }}>
        <div>{date.format('dddd, M月D日, YYYY')}</div>
        <FlexRow>
          <ButtonGroup>
            <Button
              variant="light"
              size="lg"
              onClick={() => setDate(date.subtract(1, 'd'))}
            >
              <FlexRow style={IconStyle}>
                <IoMdArrowDropleft />
              </FlexRow>
            </Button>
            <Button
              variant="light"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <FlexRow style={IconStyle}>
                <IoIosCalendar />
              </FlexRow>
            </Button>
            <Button variant="light" onClick={() => setDate(date.add(1, 'd'))}>
              <FlexRow style={IconStyle}>
                <IoMdArrowDropright />
              </FlexRow>
            </Button>
          </ButtonGroup>
          <Button
            variant="light"
            style={{ marginLeft: '8px' }}
            onClick={(e) => {
              setDate(dayjs());
            }}
          >
            <FlexRow style={{ fontSize: '0.9rem' }}>今日</FlexRow>
          </Button>
        </FlexRow>
      </FlexBetweenRow>
      <CalContent>
        {open && (
          <CalDiv>
            <Calendar fullscreen={false} value={dayjs()} />
          </CalDiv>
        )}
      </CalContent>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable style={{ backgroundColor: '#fff', minHeight: '7rem' }} />
      </Slate>
    </Content>
  );
}

export default TodayTomato;
