import React, {useState} from "react";
import styled from "styled-components";
import {TTextArea, PaddingRow} from '../common/style';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const TomatoRowGroup = styled.div`
 
`;

const TomatoRow = styled(PaddingRow)`
  font-size: 0.7rem;
  color: ${window.ttnoteThemeLight.textColorDesc};
  &:active {
    background-color: #ECECEC;
  }
  @media (min-width: 576px) {
    &:active {
      background-color: transparent;
    }
  }
  
  display: flex;
  //grid-template-columns: repeat(20, 1fr);
  //grid-template-rows: 1fr;
  //justify-items: end;
  align-items: center;
  justify-content: space-between;
`;

const Sequence = styled.div`
  //margin-right: 1em;
  flex: 0 0 1.8rem;
  text-align: center;
  //grid-area: 1 / 1 / 2 / 2;
  //justify-self: center; 
`;

const MinutesCell = styled.div`
  //margin-right: 1em;
  //flex: 2;
  //grid-area: 1 / 5 / 2 / 8;
  flex: 0 0 2rem;
  text-align: end;
`;

const TimeCell = styled.div`
  //margin-right: 1em;
  //flex: 2;
  //grid-area: 1 / 11 / 2 / 16;
  flex: 0 0 4rem;
  text-align: end;
`;

const DeleteCell = styled.div`
  flex: 0 0 2rem;
  text-align: end;
`;

const CollapseCell = styled.div`
 //grid-area: 1 / 16 / 2 / 20;
  flex: 0 0 2rem;
  text-align: end;
`;

const DescCell = styled(PaddingRow)`
  font-size: 0.8rem;
  color: ${window.ttnoteThemeLight.textColorTitle}; 
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
        <DeleteCell>删除</DeleteCell>
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