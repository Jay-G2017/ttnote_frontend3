import React from "react";
import styled from "styled-components";

const HomeFooterStyled = styled.div`
  background-color: ${window.ttnoteHomeLight.bgColorLight};
  flex: none;
  padding: 3rem 2rem;
  @media (min-width: 576px) {
    padding: 3rem 12vw;
  }
`;

const FooterNav = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NavCard = styled.div`
  flex: 0 0 400px;

`;

const NavName = styled.div`

`;

const NavList = styled.div`

`;

const FooterLink = styled.div`
  border-top: 0.5px solid ${window.ttnoteThemeLight.lineColorLight}

`;

function HomeFooter() {
  return (
    <HomeFooterStyled>
      <FooterNav>
        <NavCard>
          <NavName>说明</NavName>
          <NavList>
            <li><a href={'/support'}>浏览器支持及问题</a></li>
            <li><a href={'/develop_plan'}>功能开发计划</a></li>
          </NavList>
        </NavCard>
        <NavCard>
          <NavName>帮助</NavName>
          <NavList>
            <li><a href={'/feedback'}>用户反馈</a></li>
          </NavList>
        </NavCard>
      </FooterNav>
      <FooterLink>Made by Jay.G</FooterLink>
    </HomeFooterStyled>
  )
}

export default HomeFooter;