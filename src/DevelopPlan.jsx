import React from "react";
import HomeHeader from "./HomeHeader";
import {HomeContainer, HomePaddingContainer, HomeBody} from "./common/style";
import HomeFooter from "./HomeFooter";

function DevelopPlan() {
  return (
    <HomeContainer>
      <HomeHeader/>
      <HomeBody>
        <HomePaddingContainer>
          <h2 style={{marginBottom: '2rem'}}>功能开发计划</h2>
          <h4>蕃茄时光会持续进行迭代，下面是后续会改进的功能</h4>
          <p>理论上所有的浏览器都是可以正常工作的， 但是由于作者精力有限，还无法对所有主流的浏览器做兼容性测试。目前只推荐chrome</p>
          <h4>手机端</h4>
          <p>对于Ios系统，由于苹果会屏蔽后台的声音播放，所以当你锁屏或者不在浏览器页面的时候，完成蕃茄后会听不到提示音. 这个问题后续可能会通过发送邮件的方式来解决，或者在手机端会开发一个小程序</p>
          <p>对于Android系统，目前还没测试</p>

        </HomePaddingContainer>
      </HomeBody>
      <HomeFooter/>
    </HomeContainer>
  )
}

export default DevelopPlan;