import React, {useState} from "react";
import styled from "styled-components";
import {TInput, TTextArea} from '../common/style';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const TomatoRowGroup = styled.div`
 
`;

const TomatoRow = styled.div`
  font-size: 0.6rem;
  color: ${window.ttnoteThemeLight.textColorDesc};
  &:active {
    background-color: #ECECEC;
  }
  padding: 0.3rem 6vw;
  @media (min-width: 576px) {
    padding: 0.3rem 8vw;
    &:active {
      background-color: transparent;
    }
  }
  
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: 1fr;
  justify-items: end;
`;

const Sequence = styled.div`
  //margin-right: 1em;
  //flex: 1;
  grid-area: 1 / 1 / 2 / 2;
  justify-self: center; 
`;

const MinutesCell = styled.div`
  //margin-right: 1em;
  //flex: 2;
  grid-area: 1 / 5 / 2 / 8;
`;

const TimeCell = styled.div`
  //margin-right: 1em;
  //flex: 2;
  grid-area: 1 / 11 / 2 / 16;
`;

const CollapseCell = styled.div`
 grid-area: 1 / 16 / 2 / 20;
`;

const DescCell = styled.div`
  font-size: 0.8rem;
  color: ${window.ttnoteThemeLight.textColorTitle}; 
  &:active {
    background-color: #ECECEC;
  }
  padding: 0.3rem 8vw;
  @media (min-width: 576px) {
    padding: 0.3rem 10vw;
    &:active {
      background-color: transparent;
    }
  }
`;

function Tomato(props) {
  const {sequence, tomato} = props;
  const [tomatoDescShow, setTomatoDescShow] = useState(tomato.desc);
  const fromNow = dayjs(tomato.created_at).fromNow();
  return (
    <TomatoRowGroup>
      <TomatoRow>
        <Sequence>{`${sequence}.`}</Sequence>
        <MinutesCell>{`${tomato.minutes}分钟`}</MinutesCell>
        <TimeCell>{fromNow}</TimeCell>
        <CollapseCell
          onClick={() => setTomatoDescShow(!tomatoDescShow)}
        >{tomatoDescShow ? '折叠' : '展开'}</CollapseCell>
      </TomatoRow>
      {tomatoDescShow &&
        <DescCell>
          <TTextArea placeholder={'添加描述'}/>
        </DescCell>
      }
    </TomatoRowGroup>
  )
}

export default Tomato;