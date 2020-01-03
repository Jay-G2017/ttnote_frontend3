import React from 'react';
import styled from "styled-components";
import {FlexRow, FlexBetweenRow, TButton, HomePaddingContainer} from "./common/style";
import {Button} from "react-bootstrap";
import {getCookie} from './utils/helper';

const Header = styled.div`
  //display: flex;     
  align-items: center;
  background-color: #e86c2a;
  height: 3rem;
  position: fixed;
  left: 0;
  width: 100%;
  top: 0;
`;

const BrandDiv = styled(TButton)`
  color: #fff;
  font-size: medium;
  font-weight: 600;
`;


function HomeHeader() {
    const isLogin = !!getCookie('token');
    return (
        <Header>
            <HomePaddingContainer>
                <FlexBetweenRow>
                    <BrandDiv onClick={() => window.ttnote.goto('/')}>蕃茄时光</BrandDiv>
                  {isLogin ?
                    <Button
                      variant={'light'}
                      size={'sm'}
                      onClick={() => window.ttnote.goto('/note')}
                    >进入应用</Button> :
                    <FlexRow>
                      <TButton
                        onClick={() => window.ttnote.goto('/login')}
                        style={{marginRight: '10px'}}
                      >
                        登录
                      </TButton>
                      <TButton
                        onClick={() => window.ttnote.goto('/registration')}
                      >注册</TButton>
                    </FlexRow>
                  }
                </FlexBetweenRow>
            </HomePaddingContainer>
        </Header>
    )
}

export default HomeHeader;