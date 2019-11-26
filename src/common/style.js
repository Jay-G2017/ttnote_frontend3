import styled from "styled-components";
import TextareaAutosize from 'react-autosize-textarea';

export const FlexRow = styled.div`
 display: flex; 
 align-items: center;
`;

export const FlexCenterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexBetweenRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TButton = styled.div`
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;

export const HomeContainer = styled.div`

`;

export const TInput = styled.input`
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    //height: 1.41176471em;
    //line-height: 1.41176471;
    caret-color: ${window.ttnoteThemeLight.colorPrimary};
    padding-left: 0;
`;

export const HeaderInput = styled(TInput)`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0.8rem 0;
`;

export const TTextArea = styled(TextareaAutosize)`
    resize: none;
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    height: 1.41176471em;
    line-height: 1.41176471;
    caret-color: ${window.ttnoteThemeLight.colorPrimary};
    padding-left: 0;
`;
