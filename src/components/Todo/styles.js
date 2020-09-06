import styled from 'styled-components';
const boxShadow =
  '0 2px 3px -1px rgba(0,0,0,0.2),0 5px 10px -10px rgba(0,0,0,0.1)';
const br = window.light.borderRadius;

export const TodoGroup = styled.div``;
export const TodoRow = styled.div`
  display: flex;
  align-items: center;
  color: ${window.ttnoteThemeLight.textColorTitle};
  background-color: ${window.light.green};
  border-radius: ${(props) => (props.open ? `${br} ${br} 0 0 ` : br)};
  user-select: none;
  padding-right: 2rem;
  box-shadow: ${(props) => (props.open ? boxShadow : 'none')};
`;

export const TodoCheckboxStyled = styled.div`
  padding: 0.3rem;
`;

export const TodoInputStyled = styled.div`
  display: flex;
  padding: 0.3rem;
  background-color: #fff;
  flex: auto;
`;

export const ChildrenContent = styled.div`
  background-color: ${window.light.greenR10};
  min-height: 3rem;
  border-radius: ${(props) => (props.open ? `0 0 ${br} ${br}` : 0)};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
