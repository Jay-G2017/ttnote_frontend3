import React, {useState} from "react";
import styled from "styled-components";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';
import TextareaDebounced from '../components/TextareaDebounced';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const TomatoRowGroup = styled.div`
 padding: 0.3rem 5vw;
 @media (min-width: 576px) {
    padding: 0.3rem 7vw;
  }
  display: flex;
  align-items: baseline;
`;

const Sequence = styled.div`
  font-size: 0.7rem;
  color: ${window.ttnoteThemeLight.textColorDesc};
  //margin-right: 0.6rem;
  flex: 0 0 1.8rem;
  text-align: center;
  //grid-area: 1 / 1 / 2 / 2;
  //justify-self: center; 
`;

const TomatoRow = styled.div`
  flex: auto;
`;

const TomatoInfoRow = styled.div`
  color: ${window.ttnoteThemeLight.textColorDesc};
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.2rem;
`;

const MinutesCell = styled.div`
  //margin-right: 1em;
  //flex: 2;
  //grid-area: 1 / 5 / 2 / 8;
  flex: 0 0 3rem;
  //text-align: end;
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

const DescCell = styled.div`
  //flex: auto;
  padding: 0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  font-size: 0.8rem;
  color: ${window.ttnoteThemeLight.textColorTitle}; 
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
  //display: ${props => props.visible ? 'block' : 'none'};
  display: flex;
  align-items: center;
`;

function Tomato(props) {
  const {sequence, tomato} = props;
  const [tomatoDescShow, setTomatoDescShow] = useState(tomato.desc);
  const fromNow = dayjs(tomato.createdAt).fromNow();

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

  const handleTomatoDelete = (e) => {
    e.stopPropagation();
    props.deleteTomato(tomato.todoId, tomato.id)
  };

  return (
    <TomatoRowGroup>
      <Sequence>{`${sequence}.`}</Sequence>
      <TomatoRow onClick={() => setTomatoDescShow(!tomatoDescShow)}>
        <DescCell visible={tomatoDescShow}>
          <TextareaDebounced
            defaultValue={tomato.desc}
            saveInfo={saveInfo}
          />
        </DescCell>
        <TomatoInfoRow>
          <MinutesCell>{`${tomato.minutes}分钟`}</MinutesCell>
          <TimeCell>{fromNow}</TimeCell>
          <DeleteCell
            onClick={handleTomatoDelete}
          >删除</DeleteCell>
        </TomatoInfoRow>
      </TomatoRow>
    </TomatoRowGroup>
  )
}

export default Tomato;