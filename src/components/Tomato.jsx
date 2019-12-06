import React, {useState} from "react";
import styled from "styled-components";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';
import TextareaDebounced from '../components/TextareaDebounced';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const TomatoRowGroup = styled.div`
 
`;

const TomatoRow = styled.div`
  cursor: pointer;
  padding: 0.3rem 7vw;
  font-size: 0.7rem;
  color: ${window.ttnoteThemeLight.textColorDesc};
  &:active {
    background-color: #ECECEC;
  }
  @media (min-width: 576px) {
    &:active {
      background-color: transparent;
    }
    padding: 0.3rem 8vw;
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
  cursor: pointer;
`;

const CollapseCell = styled.div`
 //grid-area: 1 / 16 / 2 / 20;
  flex: 0 0 2rem;
  text-align: end;
  cursor: pointer;
`;

const DescCell = styled.div`
  font-size: 0.8rem;
  color: ${window.ttnoteThemeLight.textColorTitle}; 
  padding: 0.2rem 12vw;
  @media (min-width: 576px) {
    padding: 0.2rem 10vw;
  }
  display: ${props => props.visible ? 'block' : 'none'};
`;

function Tomato(props) {
  const {sequence, tomato} = props;
  const [tomatoDescShow, setTomatoDescShow] = useState(tomato.desc);
  const fromNow = dayjs(tomato.created_at).fromNow();

  const saveInfo = (value) => {
    const url = window.ttnote.baseUrl + '/tomatoes/' + tomato.id;
    window.ttnote.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({desc: value}),
    })
    .then(res => {
      console.log(res);
    })
  };

  return (
    <TomatoRowGroup>
      <TomatoRow onClick={() => setTomatoDescShow(!tomatoDescShow)}>
        <Sequence>{`${sequence}.`}</Sequence>
        <MinutesCell>{`${tomato.minutes}分钟`}</MinutesCell>
        <TimeCell>{fromNow}</TimeCell>
        <CollapseCell
        >{tomatoDescShow ? '折叠' : '展开'}</CollapseCell>
        <DeleteCell>删除</DeleteCell>
      </TomatoRow>
      <DescCell visible={tomatoDescShow}>
       <TextareaDebounced
         defaultValue={tomato.desc}
         saveInfo={saveInfo}
       />
      </DescCell>
    </TomatoRowGroup>
  )
}

export default Tomato;