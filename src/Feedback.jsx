import React from "react";
import HomeHeader from "./HomeHeader";
import {HomeContainer, HomePaddingContainer, HomeBody} from "./common/style";
import HomeFooter from "./HomeFooter";

function Feedback() {
  return (
    <HomeContainer>
      <HomeHeader/>
      <HomeBody>
        <HomePaddingContainer>
          <h2 style={{marginBottom: '2rem'}}>用户反馈</h2>
          <h4 style={{marginBottom: '1rem'}}>如果你有任何建议或者有bug需要反馈，欢迎发送给我</h4>
          <a href='mailTo:jay.g@ttnote.cn'>jay.g@ttnote.cn</a>
        </HomePaddingContainer>
      </HomeBody>
      <HomeFooter/>
    </HomeContainer>
  )
}

export default Feedback;