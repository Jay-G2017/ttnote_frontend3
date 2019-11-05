import React from "react";
import styled from "styled-components";

const CategoryListContainer = styled.div`

`;

const CategoryRow = styled.div`
  
`;

function CategoryList(props) {
  const {children} = props;

  const CategoryItem = (props) => {
    const {category} = props;
    return (
      <CategoryRow>
        {category.name}
      </CategoryRow>
    )
  };

  return (
    <CategoryListContainer>
      {children}
    </CategoryListContainer>
  )
}

export default CategoryList;