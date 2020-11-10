import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Calendar } from 'antd';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import 'antd/lib/calendar/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/radio/style/index.css';
import TodayTomatoContent from './todayTomatoContent';
import { debounce, throttle } from 'lodash';
import classNames from 'classnames';
import styles from './styles.less';
import SVG from 'react-inlinesvg'

import {
  IoIosCalendar,
} from 'react-icons/io';
import dayjs from 'dayjs';
import RichEditor from '../richEditor/index';
import StatusBar from '../StatusBar/index';

const Content = styled.div`
  padding: 2rem 3rem;
  border-radius: 3px;
  height: 90vh;
  overflow: auto;
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
  color: #000;
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

function TodayTomato() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs().format());

  const [todayTomatoes, setTodayTomatoes] = useState([]);
  const [defaultValue, setDefaultValue] = useState('');
  const [dailyNoteId, setDailyNoteId] = useState('');

  useEffect(() => {
    document.getElementById('todayTomatoContent').scrollTo(0, 0);
  }, [todayTomatoes.length]);

  // 获取每日蕃茄
  const fetchTodayTomatoes = useCallback((date) => {
    const url =
      window.ttnote.baseUrl +
      '/today_tomatoes?date=' +
      dayjs(date).format('YYYY-MM-DD');
    window.ttnote.fetch(url, null, false).then((res) => {
      setTodayTomatoes(res);
    });
  }, []);

  const throttleFetchTodayTomatoes = useCallback(
    throttle(fetchTodayTomatoes, 500),
    []
  );

  useEffect(() => {
    throttleFetchTodayTomatoes(date);
  }, [date, fetchTodayTomatoes, throttleFetchTodayTomatoes]);

  const fetchDailyNotes = useCallback((date) => {
    const url =
      window.ttnote.baseUrl +
      '/daily_notes?date=' +
      dayjs(date).format('YYYY-MM-DD');
    window.ttnote.fetch(url, null, false).then((res) => {
      const desc = res.desc ? JSON.parse(res.desc) : '';
      setDefaultValue(desc);
      setDailyNoteId(res.id);
    });
  }, []);

  const delayedFetchDailyNote = useCallback(throttle(fetchDailyNotes, 500), []);

  useEffect(() => {
    delayedFetchDailyNote(date);
  }, [date, delayedFetchDailyNote]);

  const postToSaveValue = useCallback(
    (value) => {
      const url = window.ttnote.baseUrl + `/daily_notes/${dailyNoteId}`;
      window.ttnote
        .fetch(url, {
          method: 'PUT',
          body: JSON.stringify({ desc: JSON.stringify(value) }),
        })
        .then((res) => {
          console.log(res);
        });
    },
    [dailyNoteId]
  );

  const delaySaveValue = useCallback(debounce(postToSaveValue, 400), [
    dailyNoteId,
  ]);

  return (
    <Content id="todayTomatoContent" onClick={() => setOpen(false)}>
      <StatusBar />
      <FlexBetweenRow style={{ marginBottom: '1rem' }}>
        <div className="flexRow left">
          <div className='flexRow'>
            <span className={styles.date} >{dayjs(date).format('YYYY MM-DD')}</span>
            <span>{dayjs(date).format('dddd')}</span>
          </div>
          <div className={styles.dateBtnGroup}>
            <div
              className={classNames({ [styles.iconBtn]: true, [styles.up]: true, flexRowCenter: true })}
              onClick={() => setDate(dayjs(date).add(1, 'd').format())}
            >
              <SVG style={{ height: '12px' }} src={require('@/assets/svg/chevron-up.svg')} />
            </div>
            <div
              className={classNames({ [styles.iconBtn]: true, [styles.down]: true, flexRowCenter: true })}
              onClick={() => setDate(dayjs(date).subtract(1, 'd').format())}
            >
              <SVG style={{ height: '12px' }} src={require('@/assets/svg/chevron-down.svg')} />
            </div>
          </div>
          <div
            className={styles.calendar}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <IoIosCalendar />
            {open && (
              <div className={styles.calendarContent} onClick={(e) => e.stopPropagation()}>
                <Calendar
                  fullscreen={false}
                  value={dayjs(date)}
                  onChange={(date) => {
                    setDate(date.format());
                  }}
                  onSelect={(date) => {
                    setDate(date.format());
                    setOpen(false);
                  }}
                />
              </div>
            )}
          </div>

        </div>
        <FlexRow>
          <Button
            variant="light"
            className={classNames({
              [styles.showTodayBtn]: true,
              [styles.showTodayBtnHide]: dayjs().isSame(date, 'day'),
            })}
            onClick={(e) => {
              setDate(dayjs().format());
            }}
          >
            <FlexRow style={{ fontSize: '0.9rem' }}>显示今日</FlexRow>
          </Button>
        </FlexRow>
      </FlexBetweenRow>
      <RichEditor
        key={dailyNoteId}
        defaultValue={defaultValue}
        onChange={delaySaveValue}
        placeholder={''}
      />
      <TodayTomatoContent data={todayTomatoes} />
    </Content>
  );
}

export default TodayTomato;
