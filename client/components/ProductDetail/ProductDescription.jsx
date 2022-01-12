import React from 'react';
import styled from 'styled-components';

const ProductDescription = (props) => {
  if (props.currentProduct.features) {
    return (
      <Container>
        <Description>
          <p>
            <b>{props.currentProduct.slogan}</b>
          </p>
          {props.currentProduct.description}
        </Description>
        <Features>
          {props.currentProduct.features.map((feature, key) => (
            <p key={key}>
              &#10003;&nbsp;&nbsp;{feature.feature}: {feature.value}
            </p>
          ))}
        </Features>
      </Container>
    );
  } else {
    return (
      <Container>
        <Description>{props.currentProduct.description}</Description>
      </Container>
    );
  }
};

export default ProductDescription;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 1.3em;
`;

const Description = styled.div`
  width: 55%;
  border-right: 1px solid ${(props) => props.theme.bgDark};
`;

const Features = styled.div`
  width: 45%;
  p {
    margin-left: 15px;
    margin-bottom: 15px;
  }
`;
