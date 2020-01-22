import React from "react";
import styled from "styled-components";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';
import TextareaDebounced from '../components/TextareaDebounced';
import {FlexBetweenRow} from "../common/style";

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const TomatoRowGroup = styled.div`
  margin-bottom: 0.5rem;
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
`;

const TomatoRow = styled.div`
  display: flex;
  align-items: center;
`;

const TomatoInfoRow = styled(FlexBetweenRow)`
  padding: 0.3rem;
  color: ${window.ttnoteThemeLight.textColorDesc};
  font-size: 0.7rem;
`;

const MinutesCell = styled.div`
  //flex: 0 0 2rem;
  //@media (min-width: 576px) {
  //  flex: 0 0 3rem;
  //}
`;

const TimeCell = styled.div`
  //flex: 0 0 3rem;
  //margin-right: 0.5rem;
  //@media (min-width: 576px) {
  //  flex: 0 0 4rem;
  //  margin-right: 1rem;
  //}
`;

const DeleteCell = styled.div`
  flex: 0 0 2rem;
  text-align: end;
  cursor: pointer;
`;

const DescCell = styled.div`
  flex: auto;
  padding: 0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  font-size: 0.9rem;
  color: ${props => props.todoDone ? window.ttnoteThemeLight.textColorDesc : window.ttnoteThemeLight.textColorTitle};
  //display: ${props => props.visible ? 'block' : 'none'};
  display: flex;
  align-items: center;
  //margin-left: 1.7rem; //1.4 + 0.3
  //margin-right: 0.5rem; 
  @media (min-width: 576px) {
    //margin-right: 1rem; 
  }
`;

function Tomato(props) {
  const {tomato, todoDone} = props;
  // const [tomatoDescShow, setTomatoDescShow] = useState(tomato.desc);
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
    if (window.confirm('确定要删除吗')) {
      props.deleteTomato(tomato.todoId, tomato.id)
    }
  };

  return (
    <TomatoRowGroup>
      <TomatoRow>
        <DescCell todoDone={todoDone}>
          <TextareaDebounced
            defaultValue={tomato.desc}
            saveInfo={saveInfo}
          />
        </DescCell>
      </TomatoRow>
      <TomatoInfoRow>
        <TimeCell>{fromNow}</TimeCell>
        <MinutesCell>{`${tomato.minutes}分钟`}</MinutesCell>
        <DeleteCell
          onClick={handleTomatoDelete}
        >删除</DeleteCell>
      </TomatoInfoRow>
    </TomatoRowGroup>
  )
}

export default Tomato;