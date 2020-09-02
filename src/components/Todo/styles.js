import styled from 'styled-components';

export const TodoGroup = styled.div``;
export const TodoRow = styled.div`
  display: flex;
  align-items: center;
  color: ${window.ttnoteThemeLight.textColorTitle};
  background-color: ${window.ttnoteThemeLight.colorPrimary};
  border-radius: 4px;
  user-select: none;
  padding-right: 2rem;
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
  background-color: ${window.ttnoteThemeLight.bgColorPrimaryDarker};
  min-height: 2rem;
`;
