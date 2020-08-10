import React from 'react';
import TCollapse from './tCollapse';
import TodayTodo from './todayTodo';
import TodayTitle from './todayTitle';
import { Tabs } from 'antd';
import styles from './style.module.scss';

function TodayTomatoContent(props) {
  const { data } = props;

  return (
    <div style={{ paddingTop: '2rem' }}>
      <Tabs animated={false}>
        {data.map((project) => (
          <Tabs.TabPane tab={project.name} key={project.id}>
            <div className={styles.cardContent}>
              {(project.todos || []).map((todo) => (
                <TodayTodo todo={todo} />
              ))}
              {(project.titles || []).map((title) => (
                <TodayTitle title={title}>
                  {(title.todos || []).map((todo) => (
                    <TodayTodo todo={todo} />
                  ))}
                </TodayTitle>
              ))}
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default TodayTomatoContent;
