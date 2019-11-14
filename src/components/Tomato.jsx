import React from "react";
import styled from "styled-components";
import { TInput } from '../common/style';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const TomatoRow = styled.div`
  display: flex;
`;

const Sequence = styled.div`
  margin-right: 1em;
  flex: 1;
`;

const MinutesCell = styled.div`
  margin-right: 1em;
  flex: 2;
`;

const TimeCell = styled.div`
  margin-right: 1em;
  flex: 2;
  
`;

const DescCell = styled.div`
  flex: 4;
`;

function Tomato(props) {
  const {sequence, tomato} = props;
  const fromNow = dayjs(tomato.created_at).fromNow();
  debugger
  return (
    <TomatoRow>
      <Sequence>{`${sequence}.`}</Sequence>
      <MinutesCell>{`${tomato.minutes}分钟`}</MinutesCell>
      <TimeCell>{fromNow}</TimeCell>
      <DescCell>
        <TInput placeholder={'input something'} />
      </DescCell>
    </TomatoRow>
  )
}

export default Tomato;