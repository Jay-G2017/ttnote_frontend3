import React from 'react';
import styled from 'styled-components';
import {HomeContainer, HomePaddingContainer, HomeBody} from './common/style'
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

const BodyContent = styled.div`
  background-color: ${window.ttnoteHomeLight.bgColorDefault};
  padding: 2rem;
`;

const TitleRow = styled.div`
  font-size: large;
  //padding: 20px 0; 
`;

function Home() {
  return (
    <HomeContainer>
      <HomeHeader/>
      <HomeBody>
        <HomePaddingContainer>
          <BodyContent>
            <TitleRow>蕃茄工作法的本质是想让你进入一个好的节奏中去</TitleRow>
            <p>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit
              laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an.
              Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico
              delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</p>
            <p>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit
              laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an.
              Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico
              delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</p>
            <p>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit
              laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an.
              Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico
              delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</p>
            <p>Lorem ipsum dolor sit amet, sed in mutat homero necessitatibus, pro cu volutpat ullamcorper, cibo possit
              laoreet in sit. Ius tacimates pertinax no. Wisi dolorum democritum qui an, quot omnes voluptatibus mei an.
              Commodo numquam philosophia at mel. Vim et porro efficiendi, ad vel omittantur conclusionemque. Iudico
              delicata voluptatibus quo id, eu qui putant verterem mnesarchum.</p>
          </BodyContent>
        </HomePaddingContainer>
      </HomeBody>
      <HomeFooter/>
    </HomeContainer>
  );
}

export default Home;
