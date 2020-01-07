import React from "react";
import HomeHeader from "./HomeHeader";
import {HomeContainer, HomePaddingContainer, HomeBody} from "./common/style";
import HomeFooter from "./HomeFooter";
import styled from "styled-components";

const Content = styled.div`
  font-weight: 400;
  color: rgba(0,0,0,0.8);
  font-size: 1rem;
  line-height: 29px; 
  text-align: justify;
  letter-spacing: normal;
`;

function PomodoroTechnique() {
  return (
    <HomeContainer>
      <HomeHeader/>
      <HomeBody>
        <HomePaddingContainer>
          <Content>
            <h2 style={{marginBottom: '2rem'}}>什么是蕃茄工作法</h2>
            <h4>维基百科</h4>
            <p>
              <a target={'_blank'} href={"https://zh.wikipedia.org/wiki/%E7%95%AA%E8%8C%84%E5%B7%A5%E4%BD%9C%E6%B3%95"}>番茄工作法</a>（英语：Pomodoro Technique）是一种时间管理法，在1980年代由Francesco
              Cirillo创立。该方法使用一个定时器来分割出一个一般为25分钟的工作时间和5分钟的休息时间，而那些时间段被称为pomodoros，为意大利语单词 pomodoro（中文：番茄）之复数。
            </p>
            <p>
              番茄工作法有五个基本步骤：
              <li>决定待完成的任务</li>
              <li>设定番茄工作法定时器至 n 分钟（通常为25分钟）。</li>
              <li>持续工作直至定时器提示,记下一个x。</li>
              <li>短暂休息3-5分钟。</li>
              <li>每四个x，休息15-30分钟。</li>
            </p>
            <p>
              番茄工作法的关键是规划，追踪，记录，处理，以及可视化。在规划阶段，任务被根据优先级排入"To Do Today" list。
              这允许用户预计每个任务的工作量。当每个番茄时结束后，成果会被记录下来以提高参与者的成就感并为未来的自我观察和改进提供原始数据。

              番茄时意指每个工作时段的时长。当任务完成后，所有番茄计时器剩下的时间会被用于过度学习。短休息时间可以辅助达到心理学上的同化作用，3-5分钟的短休息间隔开每个番茄工作时段。四个番茄工作时组成一组。一个15-50分钟的长休息间隔开每组作业。

              <b>这一时间管理技术的本质目的是减小内生和外在的干扰对意识流的影响。</b>一个单位的番茄工作时不可再细分。当在番茄工作时中被打断的情况下，只可能有两种情况：干扰的活动被推迟（告知 - 协商 - 安排日程 -
              回访），或者当前的番茄工作时废弃，必须重新开始。
            </p>
            <h4>谷歌们</h4>
              <p>希望读者更多从实践中去感悟和评价.</p>
          </Content>
        </HomePaddingContainer>
      </HomeBody>
      <HomeFooter/>
    </HomeContainer>
  )
}

export default PomodoroTechnique;