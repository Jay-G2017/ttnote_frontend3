import React from 'react';
import styled from 'styled-components';
import {HomeContainer} from './common/style'
import HomeHeader from "./HomeHeader";
import {Container} from "react-bootstrap";
import HomeFooter from "./HomeFooterStyled";

const Body = styled.div`
  //background-color: #fdf8f2;
  //height: 92vh;
  //padding: 0 100px;
  :before {
    content: '';
    display: block;
    height: 3rem;
  }
  flex: 1 0 85%;
  padding: 3rem 0;
`;

const BodyContent = styled.div`
  background-color: ${window.ttnoteHomeLight.bgColorDefault};
  padding: 3rem;
`;

const TitleRow = styled.div`
  font-size: large;
  //padding: 20px 0; 
`;

function Home() {
  return (
      <HomeContainer>
          <HomeHeader/>
          <Body>
              <Container>
                <BodyContent>
                  <TitleRow>蕃茄工作法的本质是想让你进入一个好的节奏中去</TitleRow>
                  <p>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an. Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</p>
                <p>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an. Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</p>
                <p>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an. Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</p>
                <p>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an. Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</p>
                </BodyContent>
              </Container>
          </Body>
          <HomeFooter/>
      </HomeContainer>
  );
}

export default Home;
