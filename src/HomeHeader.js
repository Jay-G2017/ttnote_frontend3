import React from 'react';
import styled from "styled-components";
import {FlexRow, TButton} from "./common/style";

const Header = styled.div`
  display: flex;     
  justify-content: space-between; 
  align-items: center;
  background-color: #e86c2a;
  height: 8vh;
  padding: 0 100px;
`;

const BrandDiv = styled(TButton)`
  color: #fff;
  font-size: medium;
`;


function HomeHeader() {
    return (
    <Header>
        <BrandDiv onClick={() => window.nav.goto('/')}>蕃茄时光</BrandDiv>
        <FlexRow>
                <TButton
                    onClick={() => window.nav.goto('/login')}
                    style={{marginRight: '10px'}}
                >
                    登录
                </TButton>
                <TButton
                    onClick={() => window.nav.goto('/registration')}
                >注册</TButton>
        </FlexRow>
    </Header>
    )
}

export default HomeHeader;