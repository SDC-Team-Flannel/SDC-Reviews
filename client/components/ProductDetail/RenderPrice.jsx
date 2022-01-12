import React from 'react';
import styled from 'styled-components';

const RenderPrice = (props) => {
  if (props.currentStyle) {
    if (props.currentStyle.sale_price) {
      return (
        <Container>
          <SalePrice>${props.currentStyle.sale_price}</SalePrice>
          <OriginalPrice>${props.currentStyle.original_price}</OriginalPrice>
        </Container>
      );
    } else {
      return (
        <Container>
          <Price>${props.currentStyle.original_price}</Price>
        </Container>
      );
    }
  } else {
    return (
      <Container>
        <Price>${props.default_price}</Price>
      </Container>
    );
  }
};

export default RenderPrice;

const Container = styled.div`
  display: flex;
  margin: 15px 0px 20px 0px;
  font-size: 0.8em;
  color: ${(props) => props.theme.textLight};
`;

const SalePrice = styled.b`
  margin-right: 10px;
`;

const Price = styled.div``;

const OriginalPrice = styled.div`
  color: ${(props) => props.theme.error};
  text-decoration: line-through;
`;
