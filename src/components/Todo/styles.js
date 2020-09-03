import styled from 'styled-components';

export const TodoGroup = styled.div``;
export const TodoRow = styled.div`
  display: flex;
  align-items: center;
  color: ${window.ttnoteThemeLight.textColorTitle};
  background-color: ${window.light.green};
  border-radius: ${(props) => (props.open ? '3px 3px 0 0 ' : '3px')};
  user-select: none;
  padding-right: 2rem;
  box-shadow: ${(props) => (props.open ? '0 1px 2px #aaa' : 'none')};
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
  background-color: ${window.light.green20};
  min-height: 3rem;
  border-radius: ${(props) => (props.open ? '0 0 3px 3px' : 0)};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
