import React from 'react';
import TodayTitle from './todayTitle';
import { Tabs } from 'antd';
import styles from './styles.less';
import Todo from '../Todo/index';
import Tomato from '../Tomato/index';
import { getTomatoCountInProject } from '@/utils';

function TodayTomatoContent(props) {
  const { data } = props;

  return (
    <div className={styles.todayTomatoContent}>
      <Tabs animated={false}>
        {data.map((project) => (
          <Tabs.TabPane tab={`${project.name}(${getTomatoCountInProject(project)})`} key={project.id}>
            <div className={styles.cardContent}>
              {(project.todos || []).map((todo) => (
                // <TodayTodo todo={todo} />
                <Todo
                  key={todo.id}
                  todo={todo}
                  enableAction={false}
                  style={{ marginBottom: '1rem' }}
                >
                  {todo.tomatoes.map((tomato) => (
                    <Tomato key={tomato.id} tomato={tomato} />
                  ))}
                </Todo>
              ))}
              {(project.titles || []).map((title) => (
                <TodayTitle key={title.id} title={title}>
                  {(title.todos || []).map((todo) => (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      enableAction={false}
                      defaultOpen={true}
                      style={{ marginBottom: '1rem' }}
                    >
                      {todo.tomatoes.map((tomato) => (
                        <Tomato key={tomato.id} tomato={tomato} />
                      ))}
                    </Todo>
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
