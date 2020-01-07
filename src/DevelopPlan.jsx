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
          <h4 style={{marginBottom: '1rem'}}>蕃茄时光会持续进行迭代，下面是后续会改进的功能</h4>
          <ol>
            <li>开发蕃茄统计的功能，可以查看每日，每周的蕃茄详情</li>
            <li>任务列表支持拖动排序</li>
            <li>开发项目搜索功能，可以搜索项目内容</li>
          </ol>
        </HomePaddingContainer>
      </HomeBody>
      <HomeFooter/>
    </HomeContainer>
  )
}

export default DevelopPlan;