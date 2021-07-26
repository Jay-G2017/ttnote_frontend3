import React from 'react'
import styled from 'styled-components'
import { HomePaddingContainer } from './common/style'

const HomeFooterContainer = styled.div`
  flex: none;
`

const FooterNav = styled.div`
  border-top: 0.5px solid ${window.ttnoteThemeLight.lineColorLight};
  display: flex;
  flex-wrap: wrap;
`

const NavCard = styled.div`
  flex: 0 1 300px;
  padding: 1rem;
`

const NavName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`

const NavList = styled.div`
  font-size: 0.9rem;
  // color: ${window.ttnoteThemeLight.textColorTitle};
  color: rgba(0, 0, 0, 0.8);
  & > div {
    padding: 0.3rem 0;
  }
  a {
    color: inherit;
  }
`

const FooterLink = styled.div`
  border-top: 0.5px solid ${window.ttnoteThemeLight.lineColorLight};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 0;
`

const FooterInfo = styled.div`
  font-size: 0.7rem;
  color: ${window.ttnoteThemeLight.textColorTips};
`

function HomeFooter() {
  return (
    <HomeFooterContainer>
      <HomePaddingContainer>
        <FooterNav>
          <NavCard>
            <NavName>蕃茄时光</NavName>
            <NavList>
              <div>
                <a href={'/pomodoro_technique'}>什么是蕃茄工作法</a>
              </div>
              <div>
                <a href={'/support'}>浏览器支持情况</a>
              </div>
              <div>
                <a href={'/develop_plan'}>功能开发计划</a>
              </div>
            </NavList>
          </NavCard>
          <NavCard>
            <NavName>帮助</NavName>
            <NavList>
              <div>
                <a href={'/feedback'}>用户反馈</a>
              </div>
            </NavList>
          </NavCard>
        </FooterNav>
        <FooterLink>
          <FooterInfo>
            网站备案号：
            <a
              target="blank"
              rel="noopener noreferrr"
              href="https://beian.miit.gov.cn/"
            >
              苏ICP备19055204号-1
            </a>
          </FooterInfo>
        </FooterLink>
      </HomePaddingContainer>
    </HomeFooterContainer>
  )
}

export default HomeFooter
