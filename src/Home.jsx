import React from 'react';
import styled from 'styled-components';
import {HomeContainer, HomePaddingContainer, HomeBody} from './common/style'
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import {Button, Col, Row} from "react-bootstrap";

const BodyContent = styled.div`
  background-color: ${window.ttnoteHomeLight.bgColorDefault};
  padding: 1rem;
  font-weight: 400;
  color: rgba(0,0,0,0.8);
  font-size: 1rem;
  line-height: 29px; 
  text-align: justify;
  letter-spacing: normal;
  @media (min-width: 576px) {
    font-weight: 400;
    padding: 2rem;
  }
`;

const colStyle = {xs: 12, sm: {span: 6, offset: 3}, md: {span: 6, offset: 3}};

function Home() {
  return (
    <HomeContainer>
      <HomeHeader/>
      <HomeBody>
        <HomePaddingContainer>
          <BodyContent>
            <h3>缘由</h3>
            <p>
              我最开始接触<a target={'_blank'} href={'/pomodoro_technique'}>蕃茄工作法</a>是在两年多以前，那个时候我在工作上遇到了两个问题，第一是时常会感觉自己手头很忙，感觉总是会有好几个重要事情赶在一起，心情容易烦躁。第二，遇到问题比较容易被“吸引”，总想要一次性就把它搞好，不容易抽身出来，导致影响全局的任务进度。那时我意识到我需要作一点改变。
            </p>

            <p>
              我的上一家单位的办公室就在财务室的隔壁，办公室是敞开式的，所以我能观察到她们的工作。财务的工作很是让我敬佩，认真，整洁，不容有错。每一笔应收账款的记录，每一项成本的核算，每个季度的统计分析，都井井有条。公司的健康成长离不开这些，而所有的这些都离不开每一天的认真严谨。我在想如果把一个人比做一个公司，那么它最重要的生产资料应该就是时间了，如果这些时间的使用可以被良好的记录和分析，这对自身的提升一定是大有裨益的。
            </p>

            <p>
              我找来了一本记事本，开始将每天要做的事情写在纸上，并且开始认真的记录下每一个蕃茄......情况开始有了好转。我又开始找了一些软件工具来辅助我记录和分析。我试了一些国外的知名GTD软件，也用了一些专门针对蕃茄工作法的软件, 但是总感觉和自己的需求差了那么一点。
            </p>

            <p>
              那时开始我有了这个念头，我想自己来写一个记录软件。
            </p>
            <p>
              时间过得很快，一眨眼又过年了。断断续续，我终于写出了第一个版本。虽然还有好多想法还没来得及写出，但好在我会一直的进行更新迭代的。用户注册还是用了传统的邮箱注册，我也知道这种方式有点过时了，但现阶段就是这样，抱歉了。
            </p>
            <p>
              我常会幻想这样一个场景：几十年后当我白发苍苍退休在家，某一天我无意间打开了一个应用，上面记录了我年轻时所做的各种事情， 我看着这些文字仿佛回到了从前。这时孙女跑了过来, 开始对着屏幕叽叽喳喳, 让我跟她讲讲我以前的故事...
            </p>
            <p>
              新的一年，祝大家蕃茄快乐! <span role={'img'} aria-label={'tomato'}>🍅</span>
              <span role={'img'} aria-label={'party popper'}>🎉🎉</span>
            </p>
            <p style={{marginBottom: 0, textAlign: 'end'}}>杰</p>
            <p style={{textAlign: 'end'}}>2020.1.4</p>
          </BodyContent>
          <Row>
            <Col {...colStyle}>
              <Button
                onClick={() => window.ttnote.goto('/note')}
                style={{marginTop: '2rem'}}
                variant={'success'}
                block
              >
                进入应用
              </Button>
            </Col>
          </Row>
        </HomePaddingContainer>
      </HomeBody>
      <HomeFooter/>
    </HomeContainer>
  );
}

export default Home;
