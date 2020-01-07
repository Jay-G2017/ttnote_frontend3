import React from 'react';
import styled from 'styled-components';
import {HomeContainer, HomePaddingContainer, HomeBody} from './common/style'
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

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

function Home() {
  return (
    <HomeContainer>
      <HomeHeader/>
      <HomeBody>
        <HomePaddingContainer>
          <BodyContent>
            {/*<p>蕃茄工作法*/}
            {/*  <a target='_blank' href='https://francescocirillo.com/pages/pomodoro-technique'>pomodoro technique</a>*/}
            {/*  的发明到现在已经有将近40年的历史了。两年前无意中了解到了这个方法，从一开始将信将疑的尝试，到中间中断了一断时间，后来又开始试着始用*/}
            {/*  这个方法.*/}
            {/*  我慢慢觉得这是一个值得被推荐的方法，我们每天会花8个多小时来工作，算上通勤可能超过10个，真正陪伴家人的时间越来越少了。如何有效的利用*/}
            {/*  时间越来越重要了。*/}
            {/*</p>*/}
            <p>
              我接触<a target={'_blank'} href={'/pomodoro_technique'} >蕃茄工作法</a>是两年多前的事了。两年多前我从一个机械工程师变成了一个整天写代码的“码农小哥”。常常会感觉工作很忙，但回头想想好像也没有什么很
              重要的事情;
              常常会遇到棘手的问题，想着非得把它搞定不可即便优先级没有那么高，结果花了好多时间，心情搞得很糟还耽误了其它的任务;
              总是感慨时光飞逝，但总说不出飞去了哪里......
            </p>

            <p>
              我开始觉得记录和规划时间是一件很重要事情。就像财务之于公司一样，财务会记录公司的资产和收支，控制成本，追求效益的最大化，为公司成长提供支持。如果把一个个体比作一个公司，那么时间就是我们最重要的隐形资产，要使效率最大化，这本帐得好好做一下。
            </p>

            <p>
              我找了一本记事本，将每天要做的事情写在纸上，开始认真的记录每一个蕃茄......情况开始变的好转了。我又开始寻找一些软件工具来辅助我记录和分析。我试了一些国外知名GTD软件，也用了一些专门针对蕃茄工作法的软件等, 但...跟自己的需求总感觉差了那么一点点，
              我开始有了一个念头，如果这件事情真的是有意义的，那么我自己来写一个吧。
            </p>
            <p>
              快到新年，我把这个应用开放出来了. 每个工具初期都是按照特定的需求制作出来的，这个也不例外, 但是我会定期的进行更新升级，如果大家有使用上的问题或者建议欢迎
              <a target='_blank' href={'/feedback'} rel="noopener noreferrer">反馈</a>给我。最后需要说声抱歉，第一次使用必须要先注册用户，因为信息的保存和同步需要依赖用户的登录.
            </p>
            {/*<p>写这个应用其实一开始只是为了满足自己的需求。蕃茄工作法本身只是一个方法，我们可以通过各种工具来实践这个方法，传统的工具是笔和纸，*/}
            {/*  将需要处理的事情写在纸上，然后设定一个定时器，开始工作... 传统的工具其实是很高效的，因为它很直觉，所以不需要学习就开始使用了。*/}
            {/*  随着记录的东西慢慢变多了，查找和统计开始变得不方便了。于是我很自然的想到可以用一些互联网的软件来记录这些内容，但同时又保持了足够的警惕，*/}
            {/*  因为使用一个软件的成本实在是太高了，你需要去寻找一个合适的软件，了解，学习，然后开始使用它。我找了一段时间，使用了很多相关的软件，*/}
            {/*  但没有一个是比较合适的。我的要求很简单，适用于蕃茄工作法的并且使用是简单的，既然市面上没有，那我试着自己写一个吧。*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*  这是一个基于帐号的应用，在不同的设备上只要登录帐号，所有的信息都会自动同步。*/}
            {/*</p>*/}
            <p>
              我常常会幻想，其中有这样一个场景：几十年后当我白发苍苍退休在家，某一天我无意间打开了一个应用，上面记录了我年轻时所做的各种事情，
              我看着这些文字感慨万千，这时孙女跑了过来, 开始对着屏幕叽叽喳喳, 让我跟她讲讲以前的事情...
            </p>
            {/*<p>诶, 该打断了, 还有好多事情要做啊...</p>*/}
            <p>
              新的一年，祝大家蕃茄快乐! <span role={'img'} aria-label={'tomato'}>🍅</span>
              <span role={'img'} aria-label={'party popper'}>🎉🎉</span>
            </p>
            <p style={{marginBottom: 0, textAlign: 'end'}}>杰</p>
            <p style={{textAlign: 'end'}}>2020.1.4</p>
          </BodyContent>
        </HomePaddingContainer>
      </HomeBody>
      <HomeFooter/>
    </HomeContainer>
  );
}

export default Home;
