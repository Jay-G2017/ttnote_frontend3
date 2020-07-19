import React from 'react';
import TCollapse from './tCollapse';
import {
  IoIosMedical,
  IoIosNutrition,
  IoIosBowtie,
  IoIosHeart,
  IoMdColorWand,
  IoIosColorWand,
} from 'react-icons/io';

import styled, { keyframes } from 'styled-components';

const spinEffect = keyframes`
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
`;

const Icon1 = styled(IoIosHeart)`
  animation: ${spinEffect} 1.2s linear infinite;
  font-size: 60px;
  color: pink;
`;

const Icon2 = styled(IoIosBowtie)`
  animation: ${spinEffect} 1.2s linear infinite;
  font-size: 60px;
  color: red;
`;

const Icon3 = styled(IoIosNutrition)`
  animation: ${spinEffect} 1.2s linear infinite;
  font-size: 60px;
  color: green;
`;

const Icon4 = styled(IoIosMedical)`
  animation: ${spinEffect} 1.2s linear infinite;
  font-size: 60px;
  color: #3e80d3;
`;

const Icon5 = styled(IoIosColorWand)`
  animation: ${spinEffect} 1.2s linear infinite;
  font-size: 60px;
  color: orange;
`;

function TodayTomatoContent(props) {
  const { data } = props;

  return (
    <div>
      {data.map((project) => (
        <TCollapse>
          <>
            <div>body</div>
            <Icon1 />
            <Icon2 />
            <Icon3 />
            <Icon4 />
            <Icon5 />
          </>
        </TCollapse>
      ))}
    </div>
  );
}

export default TodayTomatoContent;
