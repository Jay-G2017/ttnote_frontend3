import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {FlexCenterRow, FlexRow} from './common/style'

const Container = styled.div`
  
`;

const Header = styled.div`
  display: flex;     
  justify-content: space-between; 
  align-items: center;
  background-color: #e86c2a;
  height: 8vh;
  padding: 0 100px;
`;

const BrandDiv = styled.div`
  color: #fff;
  font-size: medium;
`;

const LinkRow = styled(FlexRow)`
  & a {
    text-decoration: none;
  }
`;

const TButton = styled.div`
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;

const Body = styled.div`
  //background-color: #fdf8f2;
  //height: 92vh;
  padding: 0 100px;
`;

const TitleRow = styled.div`
  font-size: large;
  padding: 20px 0; 
  width: 400px;
`;

const Para = styled.div`
  background-color: #fff;
  padding: 20px;
`;

function HomePage() {
  return (
      <Container>
        <Header>
            <BrandDiv>蕃茄时光</BrandDiv>
            <LinkRow>
                <Link to='/login'>
                    <TButton style={{marginRight: '10px'}}>登录</TButton>
                </Link>
                <Link to='registration'>
                    <TButton>注册</TButton>
                </Link>
            </LinkRow>
        </Header>
          <Body>
              <TitleRow>蕃茄工作法的本质是想让你进入一个好的节奏中去</TitleRow>
              <Para>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an. Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</Para>
              <TitleRow>我们想让这个美好的方法插上云的翅膀</TitleRow>
              <Para>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an. Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</Para>
              <TitleRow>假如工作和生活在慢慢渐入佳境，周边的事物也在变得美好</TitleRow>
              <Para>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an. Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</Para>
              <FlexCenterRow style={{padding: '20px 0'}}>
                  <TButton style={{color: 'black'}}>试用蕃茄时光</TButton>
              </FlexCenterRow>

          </Body>
      </Container>
  );
}

export default HomePage;
