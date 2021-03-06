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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TButton = styled.div`
  color: #fff;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
`;

export const HomeContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`;

export const HomeBody = styled.div`
  flex: 1 1 85%;
  padding: 5rem 0 2rem 0;
`;

export const HomePaddingContainer = styled.div`
  height: 100%;
  padding: 0 1rem;
  @media (min-width: 576px) {
    max-width: 720px;
    margin: auto;
    padding: 0 2rem;
  }
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
    font-weight: inherit;
    color: inherit;
    height: 1.5em;
    line-height: 1.5;
    caret-color: ${window.ttnoteThemeLight.colorPrimary};
    padding-left: 0;
`;

export const PaddingRow = styled.div`
  padding: 0.2rem 4vw;
  @media (min-width: 576px) {
    padding: 0.2rem 6vw;
  }
  @media (min-width: 992px) {
    padding: 0.2rem 9vw;
  }
`;

export const MarginRow = styled.div`
  margin: 0.7rem 4vw;
  @media (min-width: 576px) {
    margin: 0.7rem 6vw;
  }
  @media (min-width: 992px) {
    margin: 0.7rem 9vw;
  }
`;

export const MarginHRow = styled.div`
  margin-left: 4vw;
  margin-right: 4vw;
  @media (min-width: 576px) {
    margin-left: 6vw;
    margin-right: 6vw;
  }
  @media (min-width: 992px) {
    margin-left: 9vw;
    margin-right: 9vw;
  }
`;

export const TBadge = styled.span`
  display:inline-block;
  box-sizing: content-box;
  padding:.15em .4em;
  min-width: 0.7em;
  border-radius: 1.5em;
  background-color: ${window.ttnoteThemeLight.colorPrimary};
  color: #FFFFFF;
  line-height:1.2;
  font-size: 0.7rem;
  vertical-align:middle;
  text-align:center;
`;

export const VLine = styled.div`
  margin: 0 0.6em;
  width: 1px;
  background-color: ${window.ttnoteThemeLight.lineColorSilver};
  height: 1.1em;
`;

export const TSmallButton = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  color: ${props => (!props.type || props.type === 'default') ? window.ttnoteThemeLight.textColorDesc : '#fff'};
  background-color: ${props => {
    switch (props.type) {
      case 'primary':
        return window.ttnoteThemeLight.colorPrimary;
        case 'danger':
          return window.ttnoteThemeLight.colorDanger;
          default:
            return window.ttnoteThemeLight.btnDefaultBg;
    }
  }};
`;

export const OverlayItem = styled.div`
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${props => props.type === 'danger' ? '600' : ''};
  color: ${props => {
    switch (props.type) {
      case 'primary':
        return window.ttnoteThemeLight.colorPrimary;
        case 'danger':
          return window.ttnoteThemeLight.colorDanger;
          default:
            return '#fff';
    }
  }};
`;
