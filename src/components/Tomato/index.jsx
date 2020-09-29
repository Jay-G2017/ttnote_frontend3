import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import TextareaDebounced from '../../components/TextareaDebounced';
import {
  FlexBetweenRow,
  FlexRow,
  OverlayItem,
  VLine,
} from '../../common/style';
import { Tooltip } from 'antd';
import { ProjectsContext } from '../../context/ProjectsContext';
import styles from './styles.less';
import classNames from 'classnames';
import { TodoContext } from '@context/index';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const TomatoRowGroup = styled.div`
  margin-bottom: 0.5rem;
  background-color: ${window.ttnoteThemeLight.bgColorWhiteDarker};
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
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
  color: ${(props) =>
    props.todoDone
      ? window.ttnoteThemeLight.textColorDesc
      : window.ttnoteThemeLight.textColorTitle};
  //display: ${(props) => (props.visible ? 'block' : 'none')};
  display: flex;
  align-items: center;
  //margin-left: 1.7rem; //1.4 + 0.3
  //margin-right: 0.5rem;
  @media (min-width: 576px) {
    //margin-right: 1rem;
  }
`;

function Tomato(props) {
  const { tomato, deleteTomato } = props;
  const [tomatoDeleteTooltipVisible, setTomatoDeleteTooltipVisible] = useState(
    false
  );
  const todoDone = useContext(TodoContext);
  const fromNow = dayjs(tomato.createdAt).fromNow();

  const { syncProject } = useContext(ProjectsContext);

  const saveInfo = (value) => {
    const url = window.ttnote.baseUrl + '/tomatoes/' + tomato.id;
    window.ttnote
      .fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ desc: value }),
      })
      .then((res) => {
        console.log(res);
      });
  };

  const TomatoDeleteOverlay = useCallback(
    () => (
      <FlexRow style={{ height: '100%' }}>
        <OverlayItem
          type="danger"
          onClick={() => {
            deleteTomato(tomato.todoId, tomato.id, syncProject);
            setTomatoDeleteTooltipVisible(false);
          }}
        >
          确认删除
        </OverlayItem>
        <VLine />
        <OverlayItem onClick={() => setTomatoDeleteTooltipVisible(false)}>
          取消
        </OverlayItem>
      </FlexRow>
    ),
    [deleteTomato, syncProject, tomato.id, tomato.todoId]
  );

  return (
    <div className={styles.tomatoGroup}>
      <div className={styles.tomatoRow}>
        <div
          className={classNames({
            [styles.descCell]: true,
            [styles.descCellDone]: todoDone,
          })}
        >
          <TextareaDebounced
            defaultValue={tomato.desc}
            placeholder={'添加一些描述'}
            onKeyUp={saveInfo}
          />
        </div>
      </div>
      <TomatoInfoRow>
        <TimeCell>{fromNow}</TimeCell>
        <MinutesCell>{`${tomato.minutes}分钟`}</MinutesCell>
        <Tooltip
          placement={'left'}
          trigger={'click'}
          title={<TomatoDeleteOverlay />}
          visible={tomatoDeleteTooltipVisible}
          onVisibleChange={(visible) => {
            setTomatoDeleteTooltipVisible(visible);
          }}
        >
          <DeleteCell>删除</DeleteCell>
        </Tooltip>
      </TomatoInfoRow>
    </div>
  );
}

export default Tomato;
